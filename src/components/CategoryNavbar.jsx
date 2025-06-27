"use client"

import { useRef, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

const CategoryNavbar = ({ types, activeType, setActiveType }) => {
  const { t, i18n } = useTranslation()
  const langused = i18n.language;
  const navbarRef = useRef(null)
  const [isManualScrolling, setIsManualScrolling] = useState(false)

  useEffect(() => {
    if (navbarRef.current && activeType) {
      const activeElement = navbarRef.current.querySelector(`[data-type="${activeType}"]`)
      if (activeElement) {
        const scrollLeft = activeElement.offsetLeft - (navbarRef.current.offsetWidth - activeElement.offsetWidth) / 2
        navbarRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" })
      }
    }
  }, [activeType])

  const handleTypeClick = (typeId) => {
    setIsManualScrolling(true)
    setActiveType(typeId)
    
    const element = document.getElementById(`type-${typeId}`)
    if (element) {
      const yOffset = -70 // Adjust based on your header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }

    // Reset manual scrolling flag after a delay
    setTimeout(() => {
      setIsManualScrolling(false)
    }, 1000)
  }

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 ps-2 left-0 right-0 h-[60px] pt-2 rounded-b-md z-20 bg-teal-900 shadow-xl shadow-teal-100"
    >
      <div ref={navbarRef} className="flex overflow-x-auto py-2 px-4 gap-4 hide-scrollbar md:items-center md:justify-center">
        {types.map((type) => (
          <button
            key={type.id}
            data-type={type.id}
            onClick={() => handleTypeClick(type.id)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeType === type.id ? "bg-teal-500 text-black" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type.name[langused]}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default CategoryNavbar