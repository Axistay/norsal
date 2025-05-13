"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"

import { setCurrentCategory } from "../redux/slices/menuSlice"
import SearchBar from "../components/SearchBar"
import PlateCard from "../components/PlateCard"
import CategoryNavbar from "../components/CategoryNavbar"
import SearchModal from "../components/SearchModal"

const CategoryMenu = () => {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const langused = i18n.language;
  const dispatch = useDispatch()
  const categoryId =  Number(id)


  const { categories, types, plates } = useSelector((state) => state.menu)
  const currentCategory = categories.find((cat) => cat.id === categoryId)

  const [activeType, setActiveType] = useState(null)
  const [categoryTypes, setCategoryTypes] = useState([])
  const [typedPlates, setTypedPlates] = useState({})
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      setIsSearchModalOpen(true)
    } else {
      setIsSearchModalOpen(false)
    }
  }

  if (!currentCategory) return <div>Loading...</div>

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-20 px-4">
      <div className="mt-32 pb-4">
        <div className="relative mb-6">
          <img
            src={currentCategory.image || "/placeholder.svg"}
            alt={currentCategory.name[langused]}
            className="w-full h-40 object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
            <h1 className="text-white text-3xl font-bold">{currentCategory.name[langused]}</h1>
          </div>
        </div>

        {/* Type Navigation */}
        {categoryTypes?.length > 0 && (
          <CategoryNavbar types={categoryTypes} activeType={activeType} setActiveType={setActiveType} />
        )}

        {/* Render plates by type */}
        <div className="pt-16">
          {categoryTypes?.map((type) => (
            <div key={type.id} id={`type-${type.id}`} className="mb-10">
              <h2 className="font-bold text-xl mb-4 bg-[#ffd699] text-center rounded">{type.name[langused]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {typedPlates[type.id]?.map((plate) => (
                  <PlateCard key={plate.id} plate={plate} />
                ))}
              </div>
              {!typedPlates[type.id] ||
                (typedPlates[type.id].length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No items available in this category.</p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  )
}

export default CategoryMenu
