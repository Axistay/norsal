"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { addToCart } from "../redux/slices/cartSlice"

const PlateCard = ({ plate }) => {
  const { t, i18n } = useTranslation()
  const langused = i18n.language;
  const dispatch = useDispatch()
  const [isSaved, setIsSaved] = React.useState(false)

  const {cityId} = useParams()

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
      <Link to={`/${cityId}/menu/category/plate/${plate.id}`} className="block">
        <div className="relative">
          <img src={plate.image || "/placeholder.svg"} alt={plate.title[langused]} className="w-full h-48 object-cover" />
          <button onClick={handleAddToCart} className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
            <Heart size={20} className={isSaved ? "fill-red-500 text-red-500" : "text-gray-400"} />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg">{plate.title[langused]}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{plate.description[langused]}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold text-lg">{plate.price.toFixed(2)} MAD</span>
            {/* <button onClick={handleAddToCart} className="btn-primary text-sm py-1.5">
              {t("menu.save")}
            </button> */}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default PlateCard
