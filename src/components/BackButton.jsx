"use client"

import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"

const BackButton = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const langused = i18n.language;

  return (
    <button
      onClick={() => navigate(-1)}
      className={`fixed top-4  ${langused === 'ar' ? 'right-4 md:right-24' : ' left-4 md:left-24'} z-50 bg-[#ffd699]  rounded-full p-2 shadow-md shodow-xl shadow-black hover:bg-[#ddb16e]  transition-all duration-300`}
      aria-label="Go back"
    >
      {
        langused === 'ar' ?  <ChevronRight size={24} className="text-black" /> :  <ChevronLeft size={24} className="text-black" />
      }
     
    </button>
  )
}

export default BackButton
