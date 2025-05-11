"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { X, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const SearchModal = ({ isOpen, onClose, searchTerm }) => {
  const { t, i18n } = useTranslation()
  const langused = i18n.language;
  const navigate = useNavigate()
  const { plates } = useSelector((state) => state.menu)
  const [results, setResults] = useState([])
  const [categoryCounts, setCategoryCounts] = useState({})
  const { categories } = useSelector((state) => state.menu)

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([])
      setCategoryCounts({})
      return
    }

    const filteredResults = plates.filter(
      (plate) =>
        plate.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plate.description.en.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Get counts by category
    const counts = {}
    filteredResults.forEach((plate) => {
      if (counts[plate.categoryId]) {
        counts[plate.categoryId]++
      } else {
        counts[plate.categoryId] = 1
      }
    })

    setCategoryCounts(counts)
    setResults(filteredResults.slice(0, 5)) // Show only 5 results
  }, [searchTerm, plates])

  const {cityId}= useParams()
  const handlePlateClick = (id) => {
    navigate(`/${cityId}/menu/category/plate/${id}`)
    onClose()
  }
  const handleCategoryClick = (categoryId) => {
    navigate(`/${cityId}/menu/category/${categoryId}`)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`bg-teal-100 rounded-xl w-full  p-5 max-h-[80vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t("search.results")}</h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X size={24} />
              </button>
            </div>

            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Search size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 text-center">{t("search.no_results")}</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {results.map((plate) => (
                    <div
                      key={plate.id}
                      onClick={() => handlePlateClick(plate.id)}
                      className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                      <img
                        src={plate.image || "/placeholder.svg"}
                        alt={plate.title[langused]}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{plate.title[langused]}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{plate.description[langused]}</p>
                        <p className="text-blue-600 text-sm">{plate.price.toFixed(2)} MAD</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Categories with counts */}
                {Object.keys(categoryCounts).length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">{t("search.categories")}</h3>
                    <div className="space-y-2">
                      {Object.entries(categoryCounts).map(([categoryId, count]) => {
                        const category = categories.find((c) => c.id === Number.parseInt(categoryId))
                        return (
                          <div
                            key={categoryId}
                            onClick={() => handleCategoryClick(Number.parseInt(categoryId))}
                            className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                          >
                            <div className="flex items-center">
                              <div
                                className={`${category.color} w-8 h-8 rounded-full flex items-center justify-center mr-2`}
                              >
                                <img
                                  src={category.image || "/placeholder.svg"}
                                  alt={category.name[langused]}
                                  className="w-5 h-5 object-contain"
                                />
                              </div>
                              <span>{category.name[langused]}</span>
                            </div>
                            <span className="bg-gray-200 rounded-full px-2 py-1 text-xs">{count}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchModal
