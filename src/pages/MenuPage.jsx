"use client"

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

// Lazy Image Component with loading states
const LazyImage = React.memo(({ src, alt, className, style }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoaded(true)
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-3xl" />
      )}
      
      {/* Actual image */}
      <div 
        className={`${className} transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          ...style,
          backgroundImage: imageError ? 'none' : `url(${src})`,
          backgroundColor: imageError ? '#e5e7eb' : 'transparent'
        }}
      />
      
      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-3xl">
          <span className="text-4xl">🍽️</span>
        </div>
      )}
      
      {/* Hidden img element for lazy loading */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className="hidden"
      />
    </div>
  )
})

LazyImage.displayName = 'LazyImage'

// Memoized Category Card Component
const CategoryCard = React.memo(({ category, index, langused, onCategoryClick }) => {
  const handleClick = useCallback(() => {
    onCategoryClick(category.id)
  }, [category.id, onCategoryClick])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-36 md:h-40 lg:h-48 w-full overflow-hidden rounded-3xl aspect-square shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        {/* Background Image with Lazy Loading */}
        <LazyImage
          src={category.image}
          alt={category.name[langused]}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        />
        
        {/* Overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent
          group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300
        `} />
        
        {/* Border Effect */}
        <div className={`
          absolute inset-0 rounded-3xl border-4 border-double transition-all duration-300
          ${category.border || 'border-teal-400'} 
          group-hover:border-opacity-80
        `} />
        
        {/* Category Name */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-center">
          <div className="bg-teal-300 rounded-full px-4 py-2 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
            <p className="text-teal-900 font-bold text-sm sm:text-base md:text-lg whitespace-nowrap overflow-hidden text-ellipsis">
              {category.name[langused]}
            </p>
          </div>
        </div>
        
        {/* Hover Effect Shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      </div>
    </motion.div>
  )
})

CategoryCard.displayName = 'CategoryCard'

const MenuPage = () => {
  const { t, i18n } = useTranslation()
  const langused = i18n.language
  const navigate = useNavigate()
  const { categories } = useSelector((state) => state.menu)
  const scrollContainerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)
  
  // Use useMemo to avoid re-reading localStorage on every render
  const cityId = useMemo(() => localStorage.getItem('selectedCity'), [])
  
  // Scroll position management
  const SCROLL_STORAGE_KEY = `menuPage_scroll_${cityId}`
  
  // Save scroll position with debounce
  const saveScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop
      sessionStorage.setItem(SCROLL_STORAGE_KEY, scrollTop.toString())
    }
  }, [SCROLL_STORAGE_KEY])
  
  // Handle scroll with debounce
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      saveScrollPosition()
    }, 150) // 150ms debounce
  }, [saveScrollPosition])
  
  // Restore scroll position on mount
  useEffect(() => {
    const restoreScrollPosition = () => {
      if (scrollContainerRef.current) {
        const savedScrollTop = sessionStorage.getItem(SCROLL_STORAGE_KEY)
        if (savedScrollTop) {
          scrollContainerRef.current.scrollTop = parseInt(savedScrollTop, 10)
        }
      }
    }
    
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(restoreScrollPosition, 100)
    
    return () => {
      clearTimeout(timeoutId)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [SCROLL_STORAGE_KEY])
  
  // Handle category click - save current scroll position before navigation
  const handleCategoryClick = useCallback((categoryId) => {
    // Save current scroll position immediately before navigation
    saveScrollPosition()
    navigate(`/${cityId}/menu/category/${categoryId}`)
  }, [navigate, cityId, saveScrollPosition])

  // Memoize grid className to avoid recalculation
  const gridClassName = useMemo(() => `
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
    gap-4 md:gap-6 lg:gap-8
    ${langused === 'ar' ? 'text-right' : 'text-left'}
  `, [langused])

  // Save window scroll position
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(SCROLL_STORAGE_KEY, window.scrollY.toString());
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [SCROLL_STORAGE_KEY]);

  // Restore window scroll position after categories are loaded
  useEffect(() => {
    if (categories.length > 0 && scrollContainerRef.current) {
      const savedScrollTop = sessionStorage.getItem(SCROLL_STORAGE_KEY);
      if (savedScrollTop) {
        scrollContainerRef.current.scrollTop = parseInt(savedScrollTop, 10);
      }
    }
  }, [categories, SCROLL_STORAGE_KEY]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        dir={langused === 'ar' ? 'rtl' : 'ltr'}
        className="min-h-screen overflow-auto"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <motion.div
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Categories Grid */}
          <div className={gridClassName}>
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                langused={langused}
                onCategoryClick={handleCategoryClick}
              />
            ))}
          </div>
          
          {/* Empty State */}
          {categories.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {t('menu.empty.title', 'No categories available')}
              </h3>
              <p className="text-gray-500">
                {t('menu.empty.description', 'Please check back later for our menu categories.')}
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MenuPage