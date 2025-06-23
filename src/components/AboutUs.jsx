"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { MessageCircle, Instagram, Facebook, Star } from "lucide-react"

const AboutUs = ({ links }) => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-7xl mx-auto"
    >
      <div className="px-6 py-8 rounded-t-3xl">
        <div className="flex items-center justify-center gap-8">
          {/* WhatsApp */}
          <a 
            href="https://wa.me/yourNumber" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#25D366] p-4 rounded-full shadow-lg"
            >
              <MessageCircle className="text-white" size={24} />
            </motion.div>
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/yourInstagramUsername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#dc2743] p-4 rounded-full shadow-lg"
            >
              <Instagram className="text-white" size={24} />
            </motion.div>
          </a>

          {/* Facebook */}
          <a 
            href="https://www.facebook.com/yourPage" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1877F2] p-4 rounded-full shadow-lg"
            >
              <Facebook className="text-white" size={24} />
            </motion.div>
          </a>

          {/* Google Reviews */}
          <a 
            href="https://www.google.fr/maps/place/%D9%85%D8%B7%D8%B9%D9%85+%D9%86%D9%88%D8%B1%D8%B3%D8%A7%D9%84%E2%80%AD/@35.1653828,-2.928703,17z/data=!4m8!3m7!1s0xd77a7e511c51127:0xf02fc78a593a6192!8m2!3d35.1660116!4d-2.9287003!9m1!1b1!16s%2Fg%2F11ddzmxvnx?entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-tr from-[#EA4335] via-[#FBBC05] to-[#34A853] p-4 rounded-full shadow-lg"
            >
              <Star className="text-white" size={24} />
            </motion.div>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutUs