"use client"

import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { ShoppingCart, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useMemo, useEffect } from "react"
import { addToCart, removeFromCart } from "../redux/slices/cartSlice"

const PlateDetail = ({ dataPlate, onClose }) => {
  const id = dataPlate?.id
  const { t, i18n } = useTranslation()
  const langused = i18n.language
  const dispatch = useDispatch()

  const { plates } = useSelector((state) => state.menu)
  const plate = plates.find((p) => p?.id === Number.parseInt(id)) || dataPlate
  const cartItems = useSelector((state) => state.cart.items)
  const isInCart = useMemo(() => cartItems.some((item) => item?.id === plate?.id), [cartItems, plate?.id])

  // Add effect to prevent scrolling when modal is open
  useEffect(() => {
    // Save original overflow value
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  if (!plate) return <div>Loading...</div>

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(plate.id))
    } else {
      dispatch(addToCart(plate))
    }
  }

  // Animation variants for main container
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.1,
        when: "beforeChildren"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.1
      }
    }
  }

  // Animation variants for modal content
  const modalVariants = {
    hidden: { 
      y: 100, 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        mass: 0.6,
        damping: 12,
        stiffness: 100,
        delay: 0.1
      }
    },
    exit: { 
      x: 100, // moves the element to the right
      opacity: 0,
      scale: 0.1,
     
    }
    
  }

  // Animation variants for content elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: delay => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  }

  // Button hover animation
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  }

  // Image animation
  const imageVariants = {
    hover: { 
      scale: 1.05,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0  h-full  z-50 bg-teal-500 bg-opacity-90 overflow-y-auto flex items-center justify-center backdrop-blur-sm"
    >
      <div className="w-full  md:px-4 rounded-xl flex items-center justify-center">
        <motion.div 
          variants={modalVariants}
          className=" pb-20 max-w-7xl w-full relative bg-gradient-to-tr from-[#ffd699] via-[#008080] to-[#004d4d] p-2 md:p-10 md:px-20 rounded-lg shadow-2xl"
        >
          {/* Close button */}
          <motion.button 
            onClick={() => onClose()}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`absolute top-[45%] md:top-[50%]  bg-red-500   p-3 z-10 shadow-lg ${langused === 'ar' ? 'md:ps-20  left-0 ps-4 rounded-r-full': "md:pr-20  right-0 pr-4 rounded-l-full"}`}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <X className="w-6 h-6 text-teal-100" />
          </motion.button>

          <motion.div 
            className="relative overflow-hidden rounded-lg shadow-xl"
            variants={imageVariants}
            whileHover="hover"
          >
            <motion.img
              src={plate.image || "/placeholder.svg"}
              alt={plate.title[langused]}
              className="w-full h-48 md:h-64 object-cover"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
          </motion.div>

          <div className="mt-4">
            <motion.div 
              custom={0.2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="relative ps-2 shadow-2xl shadow-yellow-200 bg-teal-300 rounded-md overflow-hidden"
            >
              <h1 className="text-2xl font-bold text-teal-900 p-2">{plate.title[langused]}</h1>
              <motion.div 
                className="absolute h-1 w-20 bg-teal-100 top-9 left-2"
                initial={{ width: 0 }}
                animate={{ width: "5rem" }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
            </motion.div>

            <motion.p 
              custom={0.4}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 text-gray-100"
            >
              {plate.description[langused]}
            </motion.p>

            <motion.div 
              custom={0.6}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-6"
            >
              <h3 className="font-semibold text-lg text-gray-300">{t("menu.variation")}</h3>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <motion.div 
                  className="bg-white rounded-xl p-4 shadow-sm border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">{t("menu.calories")}</span>
                    <div className="relative w-12 h-12">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                        <motion.circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="4"
                          strokeDasharray="0 125"
                          initial={{ strokeDasharray: "0 125" }}
                          animate={{ strokeDasharray: `${(plate.nutrition?.calories / 10) * 1.25 || 0} 125` }}
                          transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                        >
                          {plate.nutrition?.calories || 0}
                        </motion.span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-sm text-gray-500">kcal</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white rounded-xl p-4 shadow-sm border"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">{t("menu.protein")}</span>
                    <div className="relative w-12 h-12">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                        <motion.circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="4"
                          strokeDasharray="0 125"
                          initial={{ strokeDasharray: "0 125" }}
                          animate={{ strokeDasharray: `${(plate.nutrition?.protein || 0) * 2.5} 125` }}
                          transition={{ delay: 1.4, duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.7 }}
                        >
                          {plate.nutrition?.protein || 0}
                        </motion.span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-sm text-gray-500">g</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              custom={0.8}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-8"
            >
              <h3 className="font-semibold text-lg text-white">{t("menu.price")}</h3>
              <div className="flex justify-between items-center mt-2">
                <motion.span 
                  className="text-2xl font-bold text-white"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.6, type: "spring" }}
                >
                  {plate.price.toFixed(2)} MAD
                </motion.span>
                <motion.button
                  onClick={handleAddToCart}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className={`p-4 text-sm rounded-full flex items-center transition-colors duration-300 ${
                    isInCart ? "bg-green-600 text-white" : "bg-teal-950 text-teal-100"
                  }`}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isInCart ? 0 : [0, -10, 10, -10, 10, 0] }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                  </motion.div>
                  {isInCart ? t("menu.inToCart") : t("menu.addToCart")}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PlateDetail