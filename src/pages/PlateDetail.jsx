"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { ShoppingCart, X, ZoomIn, Heart, Star, Clock, Users } from "lucide-react"
import { useTranslation } from "react-i18next"

// Simplified animation configurations with smooth transitions
const ANIMATION_CONFIG = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
  },
  modal: {
    hidden: { 
      y: 30, 
      opacity: 0,
      scale: 0.98
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      y: 20,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  },
  slideIn: {
    hidden: { opacity: 0, x: -15 },
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  },
  scaleIn: {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.1
      }
    }
  },
  button: {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  },
  imageReveal: {
    hidden: { scale: 1.05, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  },
  imageHover: {
    scale: 1.03,
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

// Animation component wrapper
const AnimatedDiv = ({ children, variant = "slideUp", delay = 0, className = "", ...props }) => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div 
      className={`transition-all duration-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

// Custom hooks
const useBodyScrollLock = () => {
  useEffect(() => {
    const originalStyle = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])
}

// Sub-components
const CloseButton = React.memo(({ onClose }) => (
  <button 
    onClick={onClose}
    className="absolute top-4 right-4 z-20 bg-red-500 hover:bg-red-600/30 backdrop-blur-sm p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
  >
    <X className="w-5 h-5 text-gray-700" />
  </button>
))

const ImageSection = React.memo(({ plate, onZoomClick, langused }) => (
  <AnimatedDiv delay={0.1} className="relative h-96 overflow-hidden rounded-2xl cursor-pointer group" onClick={onZoomClick}>
    <img
      src={plate.image}
      alt={plate.title?.[langused] || plate.title?.en || 'Dish image'}
      className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-105"
    />
    
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    
    {/* Hover overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-orange-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* Floating action button */}
    <div className="absolute top-4 right-4">
      <AnimatedDiv delay={0.3}>
        <button
          className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-90"
          onClick={e => { e.stopPropagation(); onZoomClick(); }}
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </AnimatedDiv>
    </div>
  </AnimatedDiv>
))

const TitleSection = React.memo(({ plate }) => (
  <AnimatedDiv delay={0.2} className="space-y-2">
    <h1 className="text-3xl font-bold text-gray-900 hover:text-orange-600 transition-colors duration-200">
      {plate.title?.en || 'Untitled Dish'}
    </h1>
  </AnimatedDiv>
))

const DescriptionSection = React.memo(({ plate }) => (
  <AnimatedDiv delay={0.3}>
    <p className="text-gray-700 leading-relaxed text-base">
      {plate.description?.en || 'No description available'}
    </p>
  </AnimatedDiv>
))

const PriceSection = React.memo(({ plate, isInCart, onAddToCart }) => (
  <AnimatedDiv delay={0.4} className="bg-white border border-gray-200 rounded-xl p-6 sticky bottom-0">
    <div className="flex items-center justify-between">
      <div className="text-3xl font-bold text-gray-900">
        {plate.price?.toFixed(2)} MAD
      </div>
      
      <button
        onClick={onAddToCart}
        className={`px-4 py-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 ${
          isInCart 
            ? "bg-green-600 hover:bg-green-700" 
            : "bg-gradient-to-r from-teal-500 to-teal-900  "
        }`}
      >
        <div className={`transition-transform duration-200 ${isInCart ? 'rotate-12' : ''}`}>
          <ShoppingCart className="w-5 h-5" />
        </div>
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  </AnimatedDiv>
))

const ZoomedImageModal = React.memo(({ isOpen, onClose, plate }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:rotate-90"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <img
        src={plate.image}
        alt={plate.title?.en || 'Dish image'}
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
})

// Main component
const PlateDetail = ({ dataPlate, onClose }) => {
  const { t, i18n } = useTranslation()
  const langused = i18n.language
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  
  const plate = dataPlate 
  
  useBodyScrollLock()

  const handleAddToCart = useCallback(() => {
    setIsInCart(!isInCart)
  }, [isInCart])

  const handleZoomOpen = useCallback(() => {
    setIsImageZoomed(true)
  }, [])

  const handleZoomClose = useCallback(() => {
    setIsImageZoomed(false)
  }, [])

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div className="min-h-screen flex items-center justify-center p-4">
          <div 
            className="relative bg-teal-400 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClose={onClose} />
            
            <div className="overflow-y-auto max-h-[90vh] pt-10">
              <div className="p-8 space-y-6">
                <ImageSection plate={plate} onZoomClick={handleZoomOpen} langused={langused} />
                
                <div className="space-y-6">
                  <AnimatedDiv delay={0.2} className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 hover:text-orange-600 transition-colors duration-200">
                      {plate.title?.[langused] || 'Untitled Dish'}
                    </h1>
                  </AnimatedDiv>
                  <AnimatedDiv delay={0.3}>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {plate.description?.[langused] || t('menu.noDescription', 'No description available')}
                    </p>
                  </AnimatedDiv>
                </div>
              </div>
              
              <AnimatedDiv delay={0.4} className="bg-white border border-gray-200 rounded-xl p-6 sticky bottom-0">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-900">
                    {plate.price?.toFixed(2)} {t('menu.mad')}
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    className={`px-4 py-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 ${
                      isInCart 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "bg-gradient-to-r from-teal-500 to-teal-900  "
                    }`}
                  >
                    <div className={`transition-transform duration-200 ${isInCart ? 'rotate-12' : ''}`}>
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    {isInCart ? t('menu.inToCart') : t('menu.addToCart')}
                  </button>
                </div>
              </AnimatedDiv>
            </div>
          </div>
        </div>
      </div>

      <ZoomedImageModal 
        isOpen={isImageZoomed}
        onClose={handleZoomClose}
        plate={plate}
      />
    </>
  )
}

export default React.memo(PlateDetail)