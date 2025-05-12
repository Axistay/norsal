"use client"

import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { Home, Menu, Globe, ShoppingCart } from "lucide-react"

const Footer = () => {
  const [city, setCity] = useState("select")
  const location = useLocation()
  const path = location.pathname

  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity")
    if (savedCity) {
      setCity(savedCity)
    }
  }, [])

  return (
    <footer className="fixed z-50 md:left-0 md:top-0 md:bottom-0 md:w-20 bottom-0 left-0 right-0">
      <div className="flex md:flex-col items-center justify-center h-full">
        <div className="w-full max-w-md md:max-w-none md:w-16 bg-[#114e51] rounded-full md:rounded-xl p-2 md:p-4 md:h-auto md:my-4 flex md:flex-col justify-around items-center gap-2 md:gap-8 shadow-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out flex-1  ${
                isActive ? "text-black" : "text-gray-400 hover:text-gray-200"
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
              `relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out flex-1  ${
                path.includes('menu') ? "text-black" : "text-gray-400 hover:text-gray-200"
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
              `relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out flex-1  ${
                isActive ? "text-black" : "text-gray-400 hover:text-gray-200"
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
              `relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out flex-1   ${
                isActive ? "text-black" : "text-gray-400 hover:text-gray-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute inset-0  bg-[#ffd699] rounded-full z-10"></span>}
                <ShoppingCart size={20} className="relative z-10" />
              </>
            )}
          </NavLink>
        </div>
      </div>
    </footer>
  )
}


export default Footer