"use client"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Trash2, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"

import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice"

const Cart = () => {
  const { t, i18n } = useTranslation()
  const langused = i18n.language

  const dispatch = useDispatch()
  const { items, total } = useSelector((state) => state.cart)
  const navigate = useNavigate()

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return
    dispatch(updateQuantity({ id, quantity }))
  }

 const cityId = localStorage.getItem('selectedCity')
  const handleGenerateQRCode = () => {
    navigate("/cart/qr", {
      state: {
        // cityId : cityId,
        items: items.map((item) => ({
          id : item.id,
          title: item.title[langused],
          quantity: item.quantity,
          price: item.price,
        })),
        total,
        cityId
      },
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20 px-4"
    >
      <div className="pt-16 ">
        <h1 className="text-2xl font-bold mb-6">{t("cart.title")}</h1>

        {items.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300" />
            <p className="mt-4 text-gray-500">{t("cart.empty")}</p>
            <Link to="/" className="btn-primary mt-4 inline-block">
              {t("cart.continueShopping")}
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 ">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 shadow-sm flex items-center"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title[langused]}
                    className="w-20 h-20 object-cover rounded-lg me-8"
                  />

                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.title[langused]}</h3>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <p className="text-gray-500 text-sm mt-1">
                      {item.price.toFixed(2)} MAD
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 text-gray-600"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-gray-600"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-medium">
                        {(item.price * item.quantity).toFixed(2)} MAD
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">{t("cart.total")}</span>
                <span className="font-medium">{total.toFixed(2)} MAD</span>
              </div>

              {/* <button className="btn-primary w-full mt-4">
                {t("cart.checkout")}
              </button> */}

              {/* Generate QR Code Button */}
              <button
                onClick={handleGenerateQRCode}
                className="btn-secondary w-full mt-2"
              >
                {t("cart.checkout") || "Generate QR Code"}
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default Cart
