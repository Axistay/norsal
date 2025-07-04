"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { ShoppingCart, X, ZoomIn, Heart, Star, Clock, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { saveItem, removeSavedItem } from "../redux/slices/cartSlice"

 

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
    className="absolute top-4 right-4 sm:top-4 sm:right-4 z-20   bg-teal-500 hover:bg-teal-500/70 backdrop-blur-sm p-3 sm:p-2 rounded-lg  transition-all duration-200 hover:rotate-90 active:scale-95"
  >
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <X className="w-6 h-6 text-red-50" />
    </motion.span>
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
        src={plate?.image}
        alt={plate?.title?.[langused] || t('menu.dishImage')}
        className="max-w-full max-h-[80vh] sm:max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
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
  const dispatch = useDispatch();
  const savedItems = useSelector(state => state.savedItems.items);
  
  // Get current restaurant ID
  const getCurrentRestaurantId = () => {
    const cityId = localStorage.getItem("selectedCity");
    const menuId = localStorage.getItem("idMenu");
    
    // Map menu ID to restaurant name
    if (cityId === "nador") {
      if (menuId === "1") return `${cityId}_golf`;
      else if (menuId === "2") return `${cityId}_norsal`;
      else if (menuId === "3") return `${cityId}_beachclub`;
    } else if (cityId === "al_hoceima") {
      if (menuId === "1") return `${cityId}_norsal`;
      else if (menuId === "2") return `${cityId}_beachclub`;
    }
    
    return `${cityId}_unknown`;
  };
  
  const currentRestaurantId = getCurrentRestaurantId();
  const isSaved = savedItems.some(item => item.id === dataPlate?.id && item.restaurantId === currentRestaurantId);
  
  
  // Mock data for demonstration
  const plate = dataPlate  
  
  useBodyScrollLock()

  const handleSaveButton = useCallback(() => {
    if (isSaved) {
      dispatch(removeSavedItem(plate.id));
    } else {
      dispatch(saveItem(plate));
    }
  }, [dispatch, plate, isSaved]);

  const handleZoomOpen = useCallback(() => {
    setIsImageZoomed(true)
  }, [])

  const handleZoomClose = useCallback(() => {
    setIsImageZoomed(false)
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        dir={langused === 'ar' ? 'rtl' : 'ltr'}
        onClick={onClose}
      >
        <div 
          className="relative w-full max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[96vh] md:h-[80vh] bg-white rounded shadow-2xl overflow-hidden overflow-y-auto animate-in slide-in-from-bottom-4 zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClose={onClose} />
          
          {/* Image Section - Full width at top */}
          <div className="relative">
            <AnimatedDiv delay={0.1} className="relative  h-[550px] overflow-hidden cursor-pointer group" onClick={handleZoomOpen}>
              <img
                src={plate?.image}
                alt={plate?.title?.[langused] || 'Dish image'}
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
          <div className="p-4 sm:p-6 space-y-4">
            {/* Title and Price */}
            <AnimatedDiv delay={0.2} className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-gray-900 leading-tight">
                    {plate?.title?.[langused] || t('menu.untitledDish')}
                  </h1>
                </div>
                <div className="text-lg font-bold text-gray-900 ml-4">
                  {plate?.price?.toFixed(0)} {t('menu.mad')}
                </div>
              </div>
            </AnimatedDiv>
            
            {/* Description */}
            <AnimatedDiv delay={0.3}>
              <p className="text-gray-600 text-sm leading-relaxed">
                {plate?.description?.[langused] || t('menu.noDescription')}
              </p>
            </AnimatedDiv>
            
            {/* Add to Cart Button */}
            <AnimatedDiv delay={0.4} className=" absolute bottom-4  right-4 left-0 flex justify-center">
              <button
                onClick={handleSaveButton}
                className={`w-3/4 sm:w-1/2 py-3 px-4 rounded-full font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg
                    ${isSaved
                    ? "bg-green-600  hover:scale-105 active:scale-95"
                    : "bg-teal-600 hover:bg-teal-700 hover:scale-105 active:scale-95"
                  } `}
              >
                 
                <div className="transition-transform duration-200">
                  <Heart className={`${isSaved
                    ? "text-red-600  hover:scale-105 active:scale-95"
                    : "text-teal-00 hover:bg-teal-700 hover:scale-105 active:scale-95"
                  }`} />
                </div>
                <span className="ml-2 text-xs font-semibold text-white">
                  {isSaved ? t('menu.inToCart', 'Remove from Cart') : t('menu.addToCart', 'Add to Cart')}
                </span>
              </button>
            </AnimatedDiv>
          </div>
        </div>
      </motion.div>

      <ZoomedImageModal 
        isOpen={isImageZoomed}
        onClose={handleZoomClose}
        plate={plate}
      />
    </>
  )
}

export default PlateDetail