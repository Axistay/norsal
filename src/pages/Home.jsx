"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { ChevronDown, ShoppingCart, MenuIcon } from "lucide-react"
import { motion } from "framer-motion"

import SearchBar from "../components/SearchBar"
import CategoryCard from "../components/CategoryCard"
import Carousel from "../components/Carousel"
import AboutUs from "../components/AboutUs"
import MenuPage from "./MenuPage"
import SearchModal from "../components/SearchModal"
import logo from '../../public/image0.png'
import { loadMenuData } from "../utils/loadMenuData"
import { setInitialMenuData } from "../redux/slices/menuSlice"
import SimplifiedCitySelector from "../components/ModuleSelectCity"

const Home = ({ cities }) => {
  const { cityId } = useParams();

  const [city, setCity] = useState({});
  useEffect(() => {
    if (cities) {
      cities.map((city) => {
        if (city.id === cityId) {
          setCity(city);
        }
      })
    }
  }, [])

  const dispatch = useDispatch();

  useEffect(() => {
    async function initMenu() {
      const menuData = await loadMenuData();
      dispatch(setInitialMenuData(menuData));
    }
    initMenu();
  }, []);

  const { t, i18n } = useTranslation()
  const langused = i18n.language;
  const { categories } = useSelector((state) => state.menu)

  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      setIsSearchModalOpen(true)
    } else {
      setIsSearchModalOpen(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-6 w-7xl">
      {/* Header with Search and Cart */}
      <div className="bg-gradient-to-b from-[#114e51] via-[#114e51] to-blue-600 w-full  pb-8 px-4 rounded-b-3xl shadow-xl shadow-yellow-100  relative  ">
        {/* Animated Logo */}
        <Link
          to="/"
          className="relative z-10 w-full flex items-center justify-center pt-4 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-lg transition-transform hover:scale-105"
          aria-label={t('common.goHome', 'Go to home page')}
        >
       <div className="relative">
                        {/* Rotating border ring */}
                        <motion.div
                            className="absolute inset-0 top-10 w-72 h-1 rounded-full border-4 border-transparent bg-gradient-to-r from-yellow-400 via-teal-500 to-yellow-400 opacity-80"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent, #fbbf24, #f59e0b, #d97706, transparent)',
                                padding: '4px',
                                borderRadius: '10%'
                            }}
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 16,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />

                        {/* Inner pulsing ring */}
                        <motion.div
                            className="absolute inset-1 w-[272px] h-[120px] rounded-full border-2 border-white/30"
                            animate={{
                                scale: [1, 1.02, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        <motion.img
                            src={logo}
                            alt={t('common.logoAlt', 'Company Logo')}
                            className="relative w-72 h-32 rounded-full object-cover shadow-2xl border-4 border-white/40 backdrop-blur-sm"
                            loading="lazy"
                            initial={{
                                scale: 0.3,
                                opacity: 0,
                                rotate: -180,
                                y: -50
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                rotate: 0,
                                y: 0
                            }}
                            transition={{
                                duration: 1.2,
                                ease: "easeOut",
                                type: "spring",
                                stiffness: 100,
                                damping: 15
                            }}
                            whileHover={{
                                scale: 1.05,
                                transition: {
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }
                            }}
                            whileTap={{
                                scale: 0.95,
                                transition: {
                                    duration: 0.1
                                }
                            }}
                        />

                        {/* Floating particles */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-60"
                                style={{
                                    top: `${30 + Math.sin(i * 60) * 10}%`,
                                    left: `${20 + Math.cos(i * 60) * 80}%`,
                                }}
                                animate={{
                                    y: [-10, 10, -10],
                                    x: [-5, 5, -5],
                                    scale: [0.8, 1.2, 0.8],
                                    opacity: [0.4, 0.8, 0.4]
                                }}
                                transition={{
                                    duration: 2 + i * 0.3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.2
                                }}
                            />
                        ))}
                    </div>
        </Link>

        {/* Welcome Section */}
        <div className="relative z-10 text-white mt-6">
          <div className="flex items-center flex-col gap-4">
            <h1 className="text-2xl font-bold text-center tracking-wide">
              {t('app.welcometo', 'Welcome to')}
            </h1>

            {city?.name && (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`text-lg ${city.bg || 'bg-white'} bg-opacity-20 backdrop-blur-sm py-2 px-6 rounded-full min-w-[200px] text-center shadow-lg border border-white/20 font-medium`}
              >
                {city.name[langused] || city.name.en || city.name}
              </motion.span>
            )}

            <p className="text-base text-center max-w-md text-white/90 leading-relaxed">
              {t('home.welcity', 'Discover our delicious menu items and enjoy an unforgettable dining experience')}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <SearchBar border={city?.border} onSearch={handleSearch} />
        </div>
      </div>

      <MenuPage />

      {/* About Us Section */}
      <div className="mt-8 px-4">
        <AboutUs />
      </div>

      {/* Search Modal */}
      {
        isSearchModalOpen && <div className={`absolute top-[340px] z-50 border-4 rounded-2xl  mx-4 ${city?.border}`}>
          <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} searchTerm={searchQuery} />
        </div>
      }
    </motion.div>
  )
}

export default Home