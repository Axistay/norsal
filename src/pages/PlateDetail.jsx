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
    className="absolute top-4 right-4 z-20 bg-teal-500 hover:bg-teal-500/70 backdrop-blur-sm p-2 rounded-lg shadow-lg transition-all duration-200 hover:rotate-90 active:scale-95"
  >
    <X className="w-5 h-5 text-white" />
  </button>
))

const ZoomedImageModal = React.memo(({ isOpen, onClose, plate }) => {
  const { t, i18n } = useTranslation()
  const langused = i18n.language
  
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 bg-teal-500 hover:bg-teal-600/70 p-3 rounded-md backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:rotate-90"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <img
        src={plate.image}
        alt={plate.title?.[langused] || t('menu.dishImage')}
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
  
  // Mock data for demonstration
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
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center "
        onClick={onClose}
      >
        <div 
          className="relative w-screen h-[96vh] md:h-[80vh] bg-white rounded shadow-2xl max-w-sm  overflow-hidden animate-in slide-in-from-bottom-4 zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClose={onClose} />
          
          {/* Image Section - Full width at top */}
          <div className="relative">
            <AnimatedDiv delay={0.1} className="relative h-[550px] overflow-hidden cursor-pointer group" onClick={handleZoomOpen}>
              <img
                src={plate.image}
                alt={plate.title?.[langused] || 'Dish image'}
                className="w-full h-[550px] object-cover transition-all duration-300 ease-out group-hover:scale-105"
              />
              
              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              
              {/* Floating zoom button */}
              <div className="absolute top-4 left-4">
                <AnimatedDiv delay={0.3}>
                  <button
                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-90"
                    onClick={e => { e.stopPropagation(); handleZoomOpen(); }}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </AnimatedDiv>
              </div>
            </AnimatedDiv>
          </div>
          
          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Title and Price */}
            <AnimatedDiv delay={0.2} className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-gray-900 leading-tight">
                    {plate.title?.[langused] || t('menu.untitledDish')}
                  </h1>
                </div>
                <div className="text-lg font-bold text-gray-900 ml-4">
                  {plate.price?.toFixed(0)} {t('menu.mad')}
                </div>
              </div>
            </AnimatedDiv>
            
            {/* Description */}
            <AnimatedDiv delay={0.3}>
              <p className="text-gray-600 text-sm leading-relaxed">
                {plate.description?.[langused] || t('menu.noDescription')}
              </p>
            </AnimatedDiv>
            
            {/* Add to Cart Button */}
            <AnimatedDiv delay={0.4} className=" absolute bottom-4  right-4 left-0 flex justify-center">
              <button
                onClick={handleAddToCart}
                className={`w-1/2 py-3 px-4 rounded-full font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 ${
                  isInCart 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                <div className="text-lg font-bold">
                  {plate.price?.toFixed(0)} {t('menu.mad')}
                </div>
                <div className={`transition-transform duration-200 ${isInCart ? 'rotate-12' : ''}`}>
                  <ShoppingCart className="w-5 h-5" />
                </div>
              </button>
            </AnimatedDiv>
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

export default PlateDetail