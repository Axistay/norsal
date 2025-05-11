"use client"

import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const CategoryCard = ({ category }) => {
  const { t } = useTranslation()

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
      <Link to={`/category/${category.id}`} className="block">
        <div
          className={`rounded-full ${category.color} w-16 h-16 flex items-center justify-center mx-auto mb-2 shadow-md`}
        >
          <img
            src={category.image || "/placeholder.svg"}
            alt={t(`categories.${category.name.en}`)}
            className="w-10 h-10 object-contain"
          />
        </div>
        <p className="text-center text-xs font-medium">{t(`categories.${category.name.en}`)}</p>
      </Link>
    </motion.div>
  )
}

export default CategoryCard
