"use client"

import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { Star, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"
import { useMemo } from "react"; // Add this import
import { addToCart } from "../redux/slices/cartSlice"

const PlateDetail = () => {

  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const langused = i18n.language;
  const dispatch = useDispatch()

  const { plates } = useSelector((state) => state.menu)
  const plate = plates.find((p) => p?.id === Number.parseInt(id))
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = useMemo(() => cartItems.some((item) => item?.id === plate?.id), [cartItems, plate?.id]);


  if (!plate) return <div>Loading...</div>

  const handleAddToCart = () => {
    dispatch(addToCart(plate))
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-20 px-4">
      <div className="pt-16">
        <div className="relative">
          <img
            src={plate.image || "/placeholder.svg"}
            alt={plate.title[langused]}
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>

        <div className="mt-4">
          <div className="relative ps-2 shadow-2xl shadow-yellow-200 bg-teal-300 rounded-md ">
          <h1 className="text-2xl font-bold text-teal-900">{plate.title[langused]}</h1>
          <div className="absolute h-1 w-20 bg-teal-100  top-8 left-2"></div>
          </div>


          <p className="mt-4 text-gray-100">{plate.description[langused]}</p>

          <div className="mt-6">
            <h3 className="font-semibold text-lg text-gray-300">{t("menu.variation")}</h3>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">{t("menu.calories")}</span>
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="4"
                        strokeDasharray={`${(plate.nutrition.calories / 10) * 1.25} 125`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                      {plate.nutrition.calories}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-sm text-gray-500">kcal</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">{t("menu.protein")}</span>
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="4"
                        strokeDasharray={`${plate.nutrition.protein * 2.5} 125`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                      {plate.nutrition.protein}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-sm text-gray-500">g</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg">{t("menu.price")}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-2xl font-bold">{plate.price.toFixed(2)} MAD</span>
              <button
                onClick={handleAddToCart}
                className={`p-4 text-sm rounded-full flex items-center transition-colors duration-300 ${isInCart ? "bg-green-600 text-white" : "bg-teal-950 text-teal-100"
                  }`}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isInCart ? t("menu.inToCart") : t("menu.addToCart")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PlateDetail
