"use client"

import { useTranslation } from "react-i18next"
import { useContext, useEffect } from "react"
import { Check, Globe } from "lucide-react"
import { motion } from "framer-motion"

import { TransContext } from "../context/TransContext"
import { changeLanguage } from "../i18n"

const Language = () => {
  const { t, i18n } = useTranslation()
  const language = i18n?.language
  const { state, dispatch } = useContext(TransContext)

  useEffect(() => {
    // Ensure i18n and document language settings are synced
    changeLanguage(state.language)
  }, [state.language])

  const languages = [
    {
      code: "ar",
      name: t("language.arabic"),
      nativeName: "العربية",
      flag: "AR",
      // Use placeholder image for missing images
      img: "/api/placeholder/400/320"
    },
    {
      code: "en",
      name: t("language.english"),
      nativeName: "English",
      flag: "EN",
      // Use placeholder image instead of external URL
      img: "/api/placeholder/400/320"
    },
    {
      code: "fr",
      name: t("language.french"),
      nativeName: "Français",
      flag: "FR",
      // Use placeholder image instead of data URL
      img: "/api/placeholder/400/320"
    },
    {
      code: "es",
      name: t("language.spanish"),
      nativeName: "Español",
      flag: "ES",
      img: "/api/placeholder/400/320"
    },
  ]

  const handleLanguageChange = (code) => {
    dispatch({ type: "CHANGE_LANGUAGE", payload: code })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center px-4"
    >
      <div className="w-full max-w-4xl">
        <div className="text-center">
          <div className="flex items-center justify-center mb-10 pt-14">
            <Globe className="text-orange-600 mr-2" size={28} />
            <h1 className="text-2xl font-bold text-teal-50">{t("language.title")}</h1>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              variants={itemVariants}
              onClick={() => handleLanguageChange(lang.code)}
              className={`relative p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md h-32 
                ${language === lang.code
                  ? "bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 shadow-md"
                  : "bg-white border border-gray-100 hover:border-gray-200"}`}
            >
              <div className="absolute right-0 top-0 bottom-0 left-24 rounded-r-xl bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${lang.img})` }}
              />
              <div className="absolute inset-0 bg-teal-950 bg-opacity-10" />
              <div className="bg-teal-900 absolute top-0 left-0 bottom-0 w-24 p-1 flex flex-col items-center justify-center rounded-l-xl">
                <span className="text-4xl mb-3 text-orange-500">{lang.flag}</span>
                <span className="text-sm text-teal-50 mt-1">{lang.nativeName}</span>
              </div>

              {language === lang.code && (
                <div className="absolute top-3 right-3 bg-blue-500 w-10 h-10 text-teal-50 p-1 rounded-full flex items-center justify-center">
                  <Check size={20} />
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Language