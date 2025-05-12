"use client"
import { useLocation, useNavigate } from "react-router-dom"
import { QRCodeCanvas } from "qrcode.react"

const encodeDataToBase64 = (obj) =>
  btoa(unescape(encodeURIComponent(JSON.stringify(obj))))

const CartQRCode = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const cartData = location.state

  if (!cartData) {
    return (
      <div className="p-10 text-center">
        <p>No cart data provided.</p>
        <button onClick={() => navigate("/cart")} className="btn-primary mt-4">
          Back to Cart
        </button>
      </div>
    )
  }

  const encodedData = encodeDataToBase64(cartData)
  const qrUrl = `https://norsal.vercel.app/summary?data=${encodedData}`

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray p-4">
      <h1 className="text-2xl font-bold mb-4">Scan QR to View Cart Summary</h1>
      <QRCodeCanvas value={qrUrl} size={256} />
      {/* <p className="mt-4 text-sm break-all text-gray-500 text-center">{qrUrl}</p> */}
      <button onClick={() => navigate("/cart")} className="btn-primary mt-6">
        Back to Cart
      </button>
    </div>
  )
}

export default CartQRCode
