"use client"

import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all duration-300"
      aria-label="Go back"
    >
      <ChevronLeft size={24} />
    </button>
  )
}

export default BackButton
