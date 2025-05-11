import { useTranslation } from "react-i18next"
import { NavLink, useLocation } from "react-router-dom"
import { Home, Menu, Globe, ShoppingCart } from "lucide-react"
const Footer = () => {
  
  let city = localStorage.getItem('selectedCity');

  if(!city){
    city = 'select'
  }

  return (
    <footer className="fixed md:left-0 md:top-0 md:bottom-0 md:w-20 bottom-0 left-0 right-0 p-1 bg-[#eec085] md:border-t-0 shadow-2xl shadow-teal-900 z-50">
      <div className="flex md:flex-col justify-around items-center h-16 md:h-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-xs rounded-[10%] h-12 ${isActive ? "bg-teal-700 w-24 md:w-16 md:h-24" : "text-gray-50 bg-gray-500 w-16"}`
          }
        >
          <Home size={20} />
        </NavLink>

        <NavLink
          to={`${city}/menu`}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-xs rounded-[10%] h-12 ${isActive ? "bg-teal-700 w-24 md:w-16 md:h-24" : "text-gray-50 bg-gray-500 w-16"}`
          }
        >
          <Menu size={20} />
        </NavLink>

        <NavLink
          to="/language"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-xs rounded-[10%] h-12 ${isActive ? "bg-teal-700 w-24 md:w-16 md:h-24" : "text-gray-50 bg-gray-500 w-16"}`
          }
        >
          <Globe size={20} className="font-bold" />
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-xs rounded-[10%] h-12 ${isActive ? "bg-teal-700 w-24 md:w-16 md:h-24" : "text-gray-50 bg-gray-500 w-16"}`
          }
        >
          <ShoppingCart size={20} />
        </NavLink>
      </div>
    </footer>
  )
}

export default Footer
