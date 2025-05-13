"use client"

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { addToCart } from "../redux/slices/cartSlice"
import PlateDetail from "../pages/PlateDetail"
import { Expand } from "lucide-react"

const PlateCard = ({ plate }) => {
  const { t, i18n } = useTranslation()
  const langused = i18n.language
  const dispatch = useDispatch()
  const [showDetail, setShowDetail] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const toggle = () => {
    setShowDetail(!showDetail)
  }

  const handleSave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(!isSaved)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart(plate))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card mb-4"
    >
      <div
        onClick={toggle}
        className="block cursor-pointer"
      >
        <div className="relative">
          <img 
            src={plate.image || "/placeholder.svg"} 
            alt={plate.title[langused]} 
            className="w-full h-48 object-cover" 
          />
          <div className="absolute top-2 right-2 shadow-xl">
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg">{plate.title[langused]}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{plate.description[langused]}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold text-lg">{plate.price.toFixed(2)} MAD</span>
            <button 
              className="btn-primary text-sm py-1.5"
            >
              <Expand />
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {showDetail && <PlateDetail dataPlate={plate} onClose={setShowDetail} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default PlateCard