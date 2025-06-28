

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"

import { setCurrentCategory } from "../redux/slices/menuSlice"
import SearchBar from "../components/SearchBar"
import PlateCard from "../components/PlateCard"
import CategoryNavbar from "../components/CategoryNavbar"
import PlateDetail from "./PlateDetail"

const CategoryMenu = () => {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const langused = i18n.language;
  const dispatch = useDispatch()
  const categoryId = Number(id)

  const { categories, types, plates } = useSelector((state) => state.menu)
  const currentCategory = categories.find((cat) => cat.id === categoryId)

  const [activeType, setActiveType] = useState(null)
  const [categoryTypes, setCategoryTypes] = useState([])
  const [typedPlates, setTypedPlates] = useState({})
  const [dataPlate, setDataPlate] = useState(null);

  const [showDetail, setShowDetail] = useState(false)
  const toggle = () => {
    setShowDetail(!showDetail)
  }

  useEffect(() => {
    if (currentCategory) {
      const filteredTypes = types.filter((type) => type.categoryId === categoryId)
      setCategoryTypes(filteredTypes)

      if (filteredTypes?.length > 0 && !activeType) {
        setActiveType(filteredTypes[0].id)
      }

      // Group plates by type
      const platesMap = {}
      plates
        .filter((plate) => plate.categoryId === categoryId)
        .forEach((plate) => {
          if (!platesMap[plate.typeId]) {
            platesMap[plate.typeId] = []
          }
          platesMap[plate.typeId].push(plate)
        })

      setTypedPlates(platesMap)
      dispatch(setCurrentCategory(categoryId))
    }
  }, [categoryId, currentCategory, types, plates, dispatch, activeType])

  // Scroll detection for automatic active type update
  useEffect(() => {
    const handleScroll = () => {
      const sections = categoryTypes.map(type => {
        const element = document.getElementById(`type-${type.id}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          return {
            id: type.id,
            top: rect.top,
            bottom: rect.bottom,
            element
          }
        }
        return null
      }).filter(Boolean)

      // Find the section that's most visible in the viewport
      const viewportHeight = window.innerHeight
      const navbarHeight = 60 // Height of your fixed navbar
      const threshold = viewportHeight * 0.3 // 30% of viewport height

      let bestMatch = null
      let bestScore = -1

      sections.forEach(section => {
        // Calculate how much of the section is visible
        const visibleTop = Math.max(navbarHeight, section.top)
        const visibleBottom = Math.min(viewportHeight, section.bottom)

        if (visibleBottom > visibleTop) {
          const visibleHeight = visibleBottom - visibleTop
          const totalHeight = section.bottom - section.top
          const visibilityRatio = visibleHeight / totalHeight

          // Prefer sections that are closer to the top of the viewport
          const distanceFromTop = Math.abs(section.top - navbarHeight)
          const score = visibilityRatio - (distanceFromTop / viewportHeight) * 0.5

          if (score > bestScore && visibilityRatio > 0.1) { // At least 10% visible
            bestScore = score
            bestMatch = section
          }
        }
      })

      if (bestMatch && bestMatch.id !== activeType) {
        setActiveType(bestMatch.id)
      }
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll)

    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [categoryTypes, activeType])

  if (!currentCategory) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Loading...</p>
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-teal-300 via-white to-emerald-300 pb-20"
    >
      <div className="pt-8 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-8 mt-16 overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={currentCategory.image || "/placeholder.svg"}
            alt={currentCategory.name[langused]}
            className="w-full h-48 sm:h-72 lg:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center px-4"
            >
              {currentCategory.name[langused]}
            </motion.h1>
          </div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
        </motion.div>

        {/* Type Navigation */}
        {categoryTypes?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <CategoryNavbar types={categoryTypes} activeType={activeType} setActiveType={setActiveType} />
          </motion.div>
        )}

        {/* Content Sections */}
        <div className="space-y-16">
          {categoryTypes?.map((type, index) => (
            <motion.div
              key={type.id}
              id={`type-${type.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="scroll-mt-24"
            >
              {/* Section Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
                    {type.name[langused]}
                  </h2>
                </div>
                <div className="h-px bg-gradient-to-r from-emerald-200 via-emerald-300 to-transparent"></div>
              </div>

              {/* Plates Grid */}
              {typedPlates[type.id] && typedPlates[type.id].length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {typedPlates[type.id].map((plate, plateIndex) => (
                    <motion.div
                      key={plate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 + plateIndex * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="transform transition-all duration-300"
                      onClick={() => {
                        setDataPlate(plate)
                        toggle()
                      }
                      }
                    >
                      <PlateCard plate={plate} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-600 mb-2">No Items Available</h3>
                  <p className="text-slate-500">We're working on adding delicious items to this category.</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>


      <AnimatePresence>
        {showDetail && <PlateDetail dataPlate={dataPlate} onClose={toggle} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default CategoryMenu
