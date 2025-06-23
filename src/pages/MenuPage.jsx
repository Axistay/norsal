"use client"

import React from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

const MenuPage = () => {
  const { t, i18n } = useTranslation()
  const langused = i18n.language;
  const navigate = useNavigate()
  const { categories } = useSelector((state) => state.menu)
  const cityId = localStorage.getItem('selectedCity');
  
  const handleCategoryClick = (categoryId) => {
    navigate(`/${cityId}/menu/category/${categoryId}`)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        dir={langused === 'ar' ? 'rtl' : 'ltr'}
        className="min-h-screen  "
      >
        <motion.div
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {/* <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-teal-800 mb-2">
              {t('menu.title', 'Our Menu Categories')}
            </h1>
            <p className="text-gray-600 text-lg">
              {t('menu.subtitle', 'Discover our delicious offerings')}
            </p>
          </div> */}

          {/* Categories Grid */}
          <div 
          
          className={`
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-4 md:gap-6 lg:gap-8
            ${langused === 'ar' ? 'text-right' : 'text-left'}
          `}>
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="group cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="relative h-36 md:h-40 lg:h-48 w-full overflow-hidden rounded-3xl aspect-square shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${category.image})`,
                    }}
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