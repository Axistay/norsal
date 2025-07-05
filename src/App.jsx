"use client"

import { useEffect, useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion"
import { useContext } from "react"
import { TransContext } from "./context/TransContext"

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
import SavedItems from "./pages/Cart"
import CartQRCode from "./components/qrcode-generate"
import SelectMenuAlhoceima from "./pages/SelectMenuAlhoceima"
import SelectMenuNador from "./pages/SelectMenuNador"
import Testtttt from "./pages/testtttt"

// Restaurant data for our cities
const cities = [
  {
    id: "al_hoceima",
    name: {
      en: "Al Hoceima",
      es: "Alhucemas",
      fr: "Al Hoceïma",
      ar: "الحسيمة"
    },
    image: "https://ugc.zenchef.com/3/6/6/6/0/0/1/5/1/9/7/7/2/1723539197_152/ce1cd9e61c971553a82684889b7e3b0f.website.jpg",
    to: "to-blue-700",
    bg: "bg-blue-800"
  },
  {
    id: "nador",
    name: {
      en: "Nador",
      es: "Nador",
      fr: "Nador",
      ar: "الناظور"
    },
    image: "https://agencemarchica.gov.ma/wp-content/uploads/2016/10/IMG3-6.jpg",
    to: "to-teal-500",
    bg: "bg-teal-400"
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
    to: "to-sky-500",
    bg: "bg-blue-500",
    comingSoon: true
  }
];

// Conditional Menu Selection Component
const MenuSelection = ({ cities }) => {
  const location = useLocation();
  const cityId = location.pathname.split('/')[1]; // Extract cityId from URL
  
  if (cityId === 'nador') {
    return <SelectMenuNador cities={cities} />;
  } else {
    return <SelectMenuAlhoceima cities={cities} />;
  }
};

const App = () => {
  const { state } = useContext(TransContext);
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function initMenu() {
      const menuData = await loadMenuData();
      dispatch(setInitialMenuData(menuData));
    }
    initMenu();
  }, []);

  // Check if language selection should be shown on first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    const savedLanguage = localStorage.getItem("language");
    
    if (!hasVisitedBefore || !savedLanguage) {
      setShowLanguageSelection(true);
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, []);

  const location = useLocation()

  const storedCityId = localStorage.getItem('selectedCity');

  if ((!storedCityId || storedCityId === 'select') && location.pathname !== "/") {
    return (
      <>
        <SimplifiedCitySelector cities={cities} />
      </>
    )
  }
  const showBackButton = location.pathname !== "/" && location.pathname !== `/${storedCityId}/menus`

  return (
   <>
    <div className="flex flex-col  min-h-screen h-full md:items-center md:justify-center bg-gradient-to-tr from-[#ffd699] via-[#008080] to-[#004d4d]   ">
      <div className="flex-grow md:ps-20 lg:ps-0 pb-16 md:pb-0 md:max-w-7xl w-full shadow-teal-200 shadow-xl">
        {/* {showBackButton && <BackButton />} */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<CitySelection cities={cities} />} />
            <Route path="/:cityId/menu" element={<Home cities={cities} />} />
            <Route path="/:cityId/menus" element={<MenuSelection cities={cities} />} />
            <Route path="/:cityId/menus/:restaurantName" element={<Home cities={cities} />} />
            <Route path="/:cityId/menu/category/:id" element={<CategoryMenu />} />
            <Route path="/:cityId/menu/category/plate/:id" element={<PlateDetail  />} />
            <Route path="/saved-items" element={<SavedItems />} />
            <Route path="/language" element={<Language />} />
            <Route path="/summary" element={<CartSummary />} />
            <Route path="/testtttt" element={<Testtttt />} />
            <Route path="/cart/qr" element={<CartQRCode />} />

          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>

    {/* Language Selection Modal for First Visit */}
    {showLanguageSelection && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-teal-900 rounded-lg p-4 pt-10 w-full mx-4 relative md:mx-auto 
                      max-h-[70vh] md:max-h-[50vh] overflow-y-auto 
                      sm:max-w-md md:max-w-lg lg:max-w-xl">
          {/* Close button - positioned at top right */}
          <button
            onClick={() => setShowLanguageSelection(false)}
            className="absolute top-2 right-2 p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Language component with improved container */}
          <div className="pt-8 pb-4">
            <Language onClose={() => setShowLanguageSelection(false)} />
          </div>
        </div>
      </div>
    )}
   </>
  )
}

export default App
