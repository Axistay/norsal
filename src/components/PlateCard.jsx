"use client"
import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { addToCart } from "../redux/slices/cartSlice"
import PlateDetail from "../pages/PlateDetail"
import { Expand, Loader2, Heart } from "lucide-react"

const PlateCard = ({ plate }) => {
  const { t, i18n } = useTranslation()
  const langused = i18n.language
  const [showDetail, setShowDetail] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const toggle = () => {
    setShowDetail(!showDetail)
  }



  const handleImageLoad = () => {
    setImageLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative   bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-b-4 border-blue-600 mb-6"
    >
      <div
        onClick={toggle}
        className="block cursor-pointer"
      >
        {/* Image Container with Gradient Background */}
        <div className="relative h-[450px]   overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          {/* {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          )} */}
          <img
            src={plate.image || "/placeholder.svg"}
            alt={plate.title[langused]}
            className="h-[450px]  w-[400px]    group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onLoad={handleImageLoad}
            style={{ opacity: imageLoading ? 0 : 1 }}
          />


        </div>

        {/* Content Section */}
        <div className="p-6 h-32">
          {/* Title and ID */}
          <div className="flex items-start justify-between mb-3">
            <div className="">
              <h3 className="font-bold text-md text-gray-800 mb-1 leading-tight">
                {plate.title[langused]}
              </h3>
            </div>
            <div className="bg-teal-800  rounded-full w-1 h-6"></div>

            <div className="flex items-center space-x-2">
              <span className="text-md font-bold text-gray-800">
                {plate.price.toFixed(0)}
              </span>
              <span className="text-sm text-gray-500">{t('menu.mad')}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed  line-clamp-2">
            {plate.description[langused]}
          </p>

        </div>
      </div>

      {/* <AnimatePresence>
        {showDetail && <PlateDetail dataPlate={plate} onClose={toggle} />}
      </AnimatePresence> */}
    </motion.div>
  )
}

export default PlateCard