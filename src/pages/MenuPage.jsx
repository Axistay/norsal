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
      >
        <motion.div
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 overflow-y-auto rounded-b-xl shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 lg:gap-8 mt-12 sm:mt-16 pt-2 ${langused === 'ar' ? 'text-right' : 'text-left'}`}>
          

            {categories.map((category) => (
              <div
                key={category.id}
                className={`
      flex relative flex-col items-center cursor-pointer
      transform hover:scale-105 transition-transform duration-200
      rounded-lg overflow-hidden border-8 border-double ${category.border}
      rounded-[42%]
      w-40 h-40 
      sm:w-40 sm:h-40
      md:w-56 md:h-56
      lg:w-64 lg:h-64
      shadow-lg mb-3 sm:mb-4
      ${langused === 'ar' ? 'flex-row-reverse' : 'flex-row'}
    `}
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <p className={`
      text-center absolute top-2 w-full
      font-semibold py-1.5 sm:py-2 text-white ${category.color}
      text-xs sm:text-sm md:text-base lg:text-lg
    `}>
                  {category.name[langused]}
                </p>
                {/* This empty div ensures the card maintains its height */}
                <div className="w-full h-full" />
              </div>
            ))}

            {categories.map((category) => (
              <div
                key={category.id}
                className={`
      flex relative flex-col items-center cursor-pointer
      transform hover:scale-105 transition-transform duration-200
      rounded-lg overflow-hidden border-8 border-double ${category.border}
      rounded-[42%]
      w-40 h-40 
      sm:w-40 sm:h-40
      md:w-56 md:h-56
      lg:w-64 lg:h-64
      shadow-lg mb-3 sm:mb-4
      ${langused === 'ar' ? 'flex-row-reverse' : 'flex-row'}
    `}
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <p className={`
      text-center absolute top-2 w-full
      font-semibold py-1.5 sm:py-2 text-white ${category.color}
      text-xs sm:text-sm md:text-base lg:text-lg
    `}>
                  {category.name[langused]}
                </p>
                {/* This empty div ensures the card maintains its height */}
                <div className="w-full h-full" />
              </div>
            ))}

            {categories.map((category) => (
              <div
                key={category.id}
                className={`
      flex relative flex-col items-center cursor-pointer
      transform hover:scale-105 transition-transform duration-200
      rounded-lg overflow-hidden border-8 border-double ${category.border}
      rounded-[42%]
      w-40 h-40 
      sm:w-40 sm:h-40
      md:w-56 md:h-56
      lg:w-64 lg:h-64
      shadow-lg mb-3 sm:mb-4
      ${langused === 'ar' ? 'flex-row-reverse' : 'flex-row'}
    `}
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <p className={`
      text-center absolute top-2 w-full
      font-semibold py-1.5 sm:py-2 text-white ${category.color}
      text-xs sm:text-sm md:text-base lg:text-lg
    `}>
                  {category.name[langused]}
                </p>
                {/* This empty div ensures the card maintains its height */}
                <div className="w-full h-full" />
              </div>
            ))}

            {categories.map((category) => (
              <div
                key={category.id}
                className={`
      flex relative flex-col items-center cursor-pointer
      transform hover:scale-105 transition-transform duration-200
      rounded-lg overflow-hidden border-8 border-double ${category.border}
      rounded-[42%]
      w-40 h-40 
      sm:w-40 sm:h-40
      md:w-56 md:h-56
      lg:w-64 lg:h-64
      shadow-lg mb-3 sm:mb-4
      ${langused === 'ar' ? 'flex-row-reverse' : 'flex-row'}
    `}
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <p className={`
      text-center absolute top-2 w-full
      font-semibold py-1.5 sm:py-2 text-white ${category.color}
      text-xs sm:text-sm md:text-base lg:text-lg
    `}>
                  {category.name[langused]}
                </p>
                {/* This empty div ensures the card maintains its height */}
                <div className="w-full h-full" />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MenuPage
