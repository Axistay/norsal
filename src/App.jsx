"use client"

import { useEffect, useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion"

// Pages
import Home from "./pages/Home"
import CategoryMenu from "./pages/CategoryMenu"
import PlateDetail from "./pages/PlateDetail"
import Language from "./pages/Language"

// Components
import Footer from "./components/Footer"
import BackButton from "./components/BackButton"
import MenuModal from "./pages/MenuPage"
import CitySelection from "./pages"
import { loadMenuData } from "./utils/loadMenuData"
import { setInitialMenuData } from "./redux/slices/menuSlice"
import SimplifiedCitySelector from "./components/ModuleSelectCity"
import CartSummary from "./pages/cart-summary"
import Cart from "./pages/Cart"
import CartQRCode from "./components/qrcode-generate"

   // Restaurant data for our 3 cities
   const cities = [
    {
        id: "nador",
        name: {
            en: "Nador",
            es: "Nador",
            fr: "Nador",
            ar: "الناظور"
        },
        image: "https://agencemarchica.gov.ma/wp-content/uploads/2016/10/IMG3-6.jpg",
        border: "border-teal-500",
        bg: "bg-teal-300"
    },
    {
        id: "al_hoceima",
        name: {
            en: "Al Hoceima",
            es: "Alhucemas",
            fr: "Al Hoceïma",
            ar: "الحسيمة"
        },
        image: "https://ugc.zenchef.com/3/6/6/6/0/0/1/5/1/9/7/7/2/1723539197_152/ce1cd9e61c971553a82684889b7e3b0f.website.jpg",
        border: "border-orange-500",
        bg: "bg-orange-500"
    },
    {
        id: "tanger",
        name: {
            en: "Tangier",
            es: "Tánger",
            fr: "Tanger",
            ar: "طنجة"
        },
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS76Wf0kqllUWqsEtP-UvVgyDT_BcjM4StMeQ&s",
        border: "border-blue-500",
        bg: "bg-blue-500"
    },
    {
        id: "",
        name: {
            en: "Coming Soon",
            es: "Próximamente",
            fr: "Prochainement",
            ar: "قريباً"
        },
        image: "https://agencemarchica.gov.ma/wp-content/uploads/2016/10/IMG3-6.jpg",
        border: "border-blue-500",
        bg: "bg-black"
    }
];


const App = () => {

// det data


const dispatch = useDispatch();

useEffect(() => {
  async function initMenu() {
    const menuData = await loadMenuData();
    dispatch(setInitialMenuData(menuData));
  }
  initMenu();
}, []);

  const location = useLocation()
 
  const storedCityId = localStorage.getItem('selectedCity');

  if ((!storedCityId || storedCityId === 'select') && location.pathname !== "/")  {
    return (
      <>
        <SimplifiedCitySelector cities={cities} />
      </>
    )
  }
  const showBackButton = location.pathname !== "/" && location.pathname !== `/${storedCityId}/menu`

  return (
    <div className="flex flex-col  min-h-screen h-full md:items-center md:justify-center bg-gradient-to-tr from-[#ffd699] via-[#008080] to-[#004d4d] ">
      <div className="flex-grow md:ps-20 lg:ps-0 pb-16 md:pb-0 md:max-w-5xl w-full">
        {showBackButton && <BackButton />}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<CitySelection cities={cities} />} />
            <Route path="/:cityId/menu" element={<Home cities={cities}/>} />
            <Route path="/:cityId/menu/category/:id" element={<CategoryMenu />} />
            <Route path="/:cityId/menu/category/plate/:id" element={<PlateDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/language" element={<Language />} />
            <Route path="/summary" element={<CartSummary />} />
            <Route path="/cart-qr" element={<CartQRCode />} />

          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  )
}

export default App
