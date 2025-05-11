"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { MapPin, Phone, Clock, Mail, MessageCircle, Instagram, Facebook, Map } from "lucide-react"

const AboutUs = () => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-7xl mx-auto"
    >
      
      <div className=" px-6 rounded-t-3xl ">

        <div className="mt-8 flex items-center justify-between gap-6 ">
          <div className="bg-[#25D366] p-3 rounded-full mb-3">
            <MessageCircle className="text-white" size={24} />
          </div>

          <div className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#dc2743] p-3 rounded-full mb-3">
            <Instagram className="text-white" size={24} />
          </div>
          <div className="bg-[#1877F2] p-3 rounded-full mb-3">
            <Facebook className="text-white" size={24} />
          </div>

          <div className="bg-[#DB4437] p-3 rounded-full mb-3">
            <Map className="text-white" size={24} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutUs
