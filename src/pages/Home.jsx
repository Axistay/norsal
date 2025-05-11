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
      <div className="bg-[#114e51] w-full  pb-8 px-4 rounded-b-3xl shadow-xl shadow-yellow-100  relative  ">
        <Link to={'/'} className="w-full flex items-center justify-center">
          <img src={logo} alt="" className="w-80  rounded-full" />
        </Link>

        <div className="text-white my-6">
          <div className="flex items-center flex-col">
            <h2 className="text-xl font-bold">{t('app.welcome')}   </h2>
            <span className={`text-sm ${city?.bg} py-1 px-2 rounded-xl`} >{city?.name && city?.name[langused]}</span> 
            <p>{t('home.welcity') }</p>
          </div>
        </div>
        <SearchBar  border={city?.border} onSearch={handleSearch} />

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
