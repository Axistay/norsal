"use client"
import { useState, useEffect, useRef } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Home, Menu, Globe, ShoppingCart, X, ArrowLeft } from "lucide-react"
import { useSelector } from "react-redux"
import Language from "../pages/Language" // Assuming you'll move it to components folder
import { useTranslation } from "react-i18next"

const Footer = () => {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const [city, setCity] = useState("select")
  const location = useLocation()
  const path = location.pathname
  const { items } = useSelector((state) => state.savedItems)
  const totalItem = items?.length || 0
  const prevItemCount = useRef(totalItem)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showLanguageOptions, setShowLanguageOptions] = useState(false)
  const navigate = useNavigate()

  // Check if we're on the home page
  const isHomePage = path === '/'

  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity")
    if (savedCity) {
      setCity(savedCity)
    }
  }, [])

  useEffect(() => {
    // Only animate if the total items changed and is not the initial render
    if (prevItemCount.current !== totalItem && prevItemCount.current !== 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 700) // Animation duration

      return () => clearTimeout(timer)
    }

    // Update the previous count
    prevItemCount.current = totalItem
  }, [totalItem])

  const toggleLanguageOptions = () => {
    setShowLanguageOptions((prev) => !prev)
  }

  const closeLanguageOptions = () => {
    setShowLanguageOptions(false)
  }

  const handleHomeClick = () => {
    if (isHomePage) {
      // Already on home page, do nothing or refresh
      return
    } else {
      // Go back one page
      navigate(-1)
    }
  }

  return (
    <>
      {/* Add custom styles for enhanced animations */}
      <style jsx>{`
        @keyframes backButtonPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes slideBack {
          0% { transform: translateX(0); }
          50% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes ripple {
          0% { 
            transform: scale(0);
            opacity: 1;
          }
          100% { 
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .back-button-hint {
          animation: slideBack 2s ease-in-out infinite;
        }
        
        @media (hover: hover) and (pointer: fine) {
          .back-button-hint:hover {
            animation: none;
          }
        }
        
        .ripple-effect {
          animation: ripple 0.6s ease-out;
        }
      `}</style>

      <footer className="fixed z-40 md:left-0 md:top-0 md:bottom-0 md:w-20 bottom-0 left-0 right-0">
        <div className="flex md:flex-col items-center justify-center h-full">
          <div className="w-full max-w-md md:max-w-none md:w-16 bg-[#114e51] rounded-full md:rounded-xl p-2 md:p-4 md:h-auto md:my-4 flex md:flex-col justify-around items-center gap-2 md:gap-8 shadow-lg">
            
            {/* Home/Back Button - Enhanced with professional animations */}
            {isHomePage ? (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out border-2 flex-1 border-teal-700  ${isActive ? "text-black shadow-lg shadow-yellow-200" : "text-gray-400 md:hover:text-gray-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="absolute inset-0 bg-[#ffd699] rounded-full z-10"></span>}
                    <Home size={20} className="relative z-10" />
                  </>
                )}
              </NavLink>
            ) : (
              <button
                onClick={handleHomeClick}
                className="relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out border-2 flex-1 border-teal-700 text-gray-400 md:hover:text-yellow-300 md:hover:border-yellow-400 md:hover:shadow-lg md:hover:shadow-yellow-400/20 group overflow-hidden back-button-hint"
              >
                {/* Animated background on hover - desktop only */}
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full transform scale-0 md:group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                
                {/* Subtle pulse animation - desktop only */}
                <span className="absolute inset-0 bg-yellow-400/10 rounded-full animate-pulse opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></span>
                
                {/* Glowing border effect - desktop only */}
                <span className="absolute inset-0 rounded-full border-2 border-yellow-400/50 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></span>
                
                {/* Arrow with enhanced animations */}
                <ArrowLeft 
                  size={20} 
                  className={`relative z-10 transform transition-all duration-300 ease-in-out
                    ${lang === 'ar' ? 'rotate-180' : ''} 
                    md:group-hover:scale-110 
                    md:group-hover:${lang === 'ar' ? 'translate-x-1' : '-translate-x-1'} 
                    group-active:scale-95
                    filter md:group-hover:drop-shadow-sm`}
                />
                
                {/* Animated arrow trail effect - desktop only */}
                <ArrowLeft 
                  size={16} 
                  className={`absolute z-5 transform transition-all duration-500 ease-out opacity-0
                    ${lang === 'ar' ? 'rotate-180 translate-x-2' : '-translate-x-2'} 
                    md:group-hover:opacity-30 
                    md:group-hover:${lang === 'ar' ? 'translate-x-4' : '-translate-x-4'}`}
                />
                
                {/* Ripple effect on click - works on both mobile and desktop */}
                <span className="absolute inset-0 rounded-full bg-white/20 transform scale-0 group-active:scale-100 transition-transform duration-150 ease-out"></span>
              </button>
            )}

            <NavLink
              to={`/${city}/menus`}
              className={({ isActive }) =>
                `relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out flex-1 border-2 border-teal-700  ${path.includes('menu') ? "text-black shadow-lg shadow-yellow-200" : "text-gray-400 md:hover:text-gray-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {path.includes('menu') && <span className="absolute inset-0 bg-[#ffd699] rounded-full z-10"></span>}
                  <Menu size={20} className="relative z-10" />
                </>
              )}
            </NavLink>

            {/* Changed from NavLink to button for language */}
            <button
              onClick={toggleLanguageOptions}
              className={`relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out flex-1 border-2 border-teal-700 ${showLanguageOptions ? "text-black shadow-lg shadow-yellow-200" : "text-gray-400 md:hover:text-gray-200"}`}
            >
              <>
                {showLanguageOptions && <span className="absolute inset-0 bg-[#ffd699] rounded-full z-10"></span>}
                <Globe size={20} className="relative z-10" />
              </>
            </button>

            <NavLink
              to="/saved-items"
              className={({ isActive }) =>
                `relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out flex-1 border-2 border-teal-700 ${isActive ? "text-black shadow-lg shadow-yellow-200" : "text-gray-400 md:hover:text-gray-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center z-20 ${isAnimating ? "animate-ping" : ""
                      }`}
                  >
                    {totalItem}
                  </span>
                  <span
                    className={`absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center z-20 ${isAnimating ? "scale-125 transition-transform duration-700" : "transition-transform duration-300"
                      }`}
                  >
                    {totalItem}
                  </span>
                  {isActive && <span className="absolute inset-0 bg-[#ffd699] rounded-full z-10"></span>}
                  <ShoppingCart
                    size={20}
                    className={`relative z-10 ${isAnimating ? "scale-125 transition-transform duration-300" : ""}`}
                  />
                </>
              )}
            </NavLink>
          </div>
        </div>

        {/* Language popup panel - Improved responsive layout */}
        {showLanguageOptions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-teal-900 rounded-lg p-4 pt-10 w-full mx-4 relative md:mx-auto 
                      max-h-[70vh] md:max-h-[50vh] overflow-y-auto 
                      sm:max-w-md md:max-w-lg lg:max-w-xl">
              {/* Close button - positioned at top right */}
              <button
                onClick={closeLanguageOptions}
                className="absolute top-2 right-2 p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white z-10"
              >
                <X size={20} />
              </button>

              {/* Language component with improved container */}
              <div className="pt-8 pb-4">
                <Language onClose={closeLanguageOptions} />
              </div>
            </div>
          </div>
        )}
      </footer>
    </>
  )
}

export default Footer




