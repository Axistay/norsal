"use client"
import { useState, useEffect, useRef } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { Home, Menu, Globe, ShoppingCart } from "lucide-react"
import { useSelector } from "react-redux"

const Footer = () => {
  const [city, setCity] = useState("select")
  const location = useLocation()
  const path = location.pathname
  const { items } = useSelector((state) => state.cart)
  const totalItem = items?.length || 0
  const prevItemCount = useRef(totalItem)
  const [isAnimating, setIsAnimating] = useState(false)
  
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

  return (
    <footer className="fixed z-50 md:left-0 md:top-0 md:bottom-0 md:w-20 bottom-0 left-0 right-0">
      <div className="flex md:flex-col items-center justify-center h-full">
        <div className="w-full max-w-md md:max-w-none md:w-16 bg-[#114e51] rounded-full md:rounded-xl p-2 md:p-4 md:h-auto md:my-4 flex md:flex-col justify-around items-center gap-2 md:gap-8 shadow-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out border-2 flex-1 border-teal-700  ${isActive ? "text-black shadow-lg shadow-yellow-200" : "text-gray-400 hover:text-gray-200"
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

          <NavLink
            to={`/${city}/menu`}
            className={({ isActive }) =>
              `relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out flex-1 border-2 border-teal-700  ${path.includes('menu') ? "text-black shadow-lg shadow-yellow-200" : "text-gray-400 hover:text-gray-200"
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

          <NavLink
            to="/language"
            className={({ isActive }) =>
              `relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out flex-1 border-2 border-teal-700 ${isActive ? "text-black shadow-lg shadow-yellow-200" : "text-gray-400 hover:text-gray-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute inset-0 bg-[#ffd699] rounded-full z-10"></span>}
                <Globe size={20} className="relative z-10" />
              </>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out flex-1 border-2 border-teal-700 ${isActive ? "text-black shadow-lg shadow-yellow-200" : "text-gray-400 hover:text-gray-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span 
                  className={`absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center z-20 ${
                    isAnimating ? "animate-ping" : ""
                  }`}
                >
                  {totalItem}
                </span>
                <span 
                  className={`absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center z-20 ${
                    isAnimating ? "scale-125 transition-transform duration-700" : "transition-transform duration-300"
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
    </footer>
  )
}

export default Footer