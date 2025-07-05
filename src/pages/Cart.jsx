"use client"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Trash2, ShoppingBag, ArrowLeft, Store, Users, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

import { removeSavedItem, updateSavedItemQuantity, loadSavedItemsForRestaurant, getCurrentRestaurantName, getRestaurantNameById, clearCurrentRestaurantSavedItems, clearAllSavedItemsAction } from "../redux/slices/cartSlice"
import PlateDetail from "./PlateDetail"

const SavedItems = () => {
  const { t, i18n } = useTranslation()
  const langused = i18n.language

  const dispatch = useDispatch()
  const { items, total } = useSelector((state) => state.savedItems)
  console.log("Saved items:", items)
  const navigate = useNavigate()
  const [showDetail, setShowDetail] = useState(false);
  const [dataPlate, setDataPlate] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Load saved items for current restaurant when component mounts
  useEffect(() => {
    dispatch(loadSavedItemsForRestaurant());
  }, [dispatch]);

  // Group items by restaurant
  const groupedItems = items.reduce((groups, item) => {
    const restaurantId = item.restaurantId;
    if (!groups[restaurantId]) {
      groups[restaurantId] = [];
    }
    groups[restaurantId].push(item);
    return groups;
  }, {});

  // Calculate totals per restaurant
  const restaurantTotals = Object.entries(groupedItems).reduce((totals, [restaurantId, restaurantItems]) => {
    totals[restaurantId] = restaurantItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return totals;
  }, {});

  // Get restaurant name from the first item in each group
  const getRestaurantName = (restaurantId) => {
    const items = groupedItems[restaurantId];
    if (items && items.length > 0) {
      return items[0].restaurantName || getRestaurantNameById(restaurantId);
    }
    return getRestaurantNameById(restaurantId);
  };

  const handleRemoveItem = (id) => {
    dispatch(removeSavedItem(id))
  }

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return
    dispatch(updateSavedItemQuantity({ id, quantity }))
  }

  const handleClearRestaurantSavedItems = (restaurantId) => {
    // Navigate to the restaurant first, then clear its saved items
    const [cityId, restaurantName] = restaurantId.split('_');
    localStorage.setItem('selectedCity', cityId);
    
    // Map restaurant name to menu ID for backward compatibility
    if (cityId === "nador") {
      if (restaurantName === "golf") localStorage.setItem('idMenu', "1");
      else if (restaurantName === "norsal") localStorage.setItem('idMenu', "2");
      else if (restaurantName === "beachclub") localStorage.setItem('idMenu', "3");
    } else if (cityId === "al_hoceima") {
      if (restaurantName === "norsal") localStorage.setItem('idMenu', "1");
      else if (restaurantName === "beachclub") localStorage.setItem('idMenu', "2");
    }
    
    dispatch(clearCurrentRestaurantSavedItems());
  }

  const handlePlaceOrder = (restaurantId) => {
    const [cityId, restaurantName] = restaurantId.split('_');
    navigate("/cart/qr", {
      state: {
        items: groupedItems[restaurantId].map((item) => ({
          id: item.id,
          title: item.title[langused],
          quantity: item.quantity,
          price: item.price,
          restaurantName: item.restaurantName || getRestaurantNameById(item.restaurantId)
        })),
        total: restaurantTotals[restaurantId],
        cityId
      },
    });
  }

  // If a restaurant is selected, show its items
  if (selectedRestaurant) {
    const restaurantItems = groupedItems[selectedRestaurant];
    const restaurantTotal = restaurantTotals[selectedRestaurant];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pb-20 px-4"
      >
        <div className="pt-16">
          {/* Header with back button */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold">{getRestaurantName(selectedRestaurant)}</h1>
              <p className="text-gray-600 text-sm">{restaurantItems.length} saved items</p>
            </div>
          </div>

          {/* Restaurant Items */}
          <div className="space-y-4 mb-8">
            {restaurantItems.map((item) => (
              <div
                key={`${item.id}-${item.restaurantId}`}
                className="bg-white rounded-xl p-4 shadow-sm flex items-center"
                onClick={() => { setDataPlate(item); setShowDetail(true); }}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title[langused]}
                  className="w-16 h-16 object-cover rounded-lg me-4"
                />

                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item.title[langused]}</h3>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemoveItem(item.id); }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove from saved items"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="text-gray-500 text-sm mt-1">
                    {item.price.toFixed(2)} MAD
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.id, item.quantity - 1); }}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.id, item.quantity + 1); }}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
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

          {/* Place Order Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Restaurant Total</span>
              <span className="text-xl font-bold text-teal-600">{restaurantTotal.toFixed(2)} MAD</span>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handlePlaceOrder(selectedRestaurant)}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Place Order for {getRestaurantName(selectedRestaurant)}
              </button>
              
              <button
                onClick={() => handleClearRestaurantSavedItems(selectedRestaurant)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Clear Restaurant Saved Items
              </button>
            </div>
          </div>
        </div>
        
        {showDetail && dataPlate && (
          <PlateDetail dataPlate={dataPlate} onClose={() => { setShowDetail(false); setDataPlate(null); }} />
        )}
      </motion.div>
    );
  }

  // Main saved items view - show restaurant summary
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20 px-4"
    >
      <div className="pt-16">
        <h1 className="text-2xl font-bold mb-2">Saved Items</h1>
        <p className="text-gray-600 mb-6">All Restaurants</p>

        {items.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300" />
            <p className="mt-4 text-gray-500">No saved items yet</p>
            <Link to="/" className="btn-primary mt-4 inline-block">
              Continue Browsing
            </Link>
          </div>
        ) : (
          <>
            {/* Restaurant Summary Cards */}
            <div className="space-y-4 mb-8">
              {Object.entries(groupedItems).map(([restaurantId, restaurantItems]) => (
                <motion.div
                  key={restaurantId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedRestaurant(restaurantId)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-teal-100 p-3 rounded-full">
                        <Store className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {getRestaurantName(restaurantId)}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {restaurantItems.length} saved items
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {restaurantItems.reduce((sum, item) => sum + item.quantity, 0)} total
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-teal-600">
                        {restaurantTotals[restaurantId].toFixed(2)} MAD
                      </div>
                      <div className="text-sm text-gray-500">Total</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Clear All Saved Items Button */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all saved items?')) {
                    dispatch(clearAllSavedItemsAction());
                  }
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Clear All Saved Items
              </button>
            </div>
          </>
        )}
      </div>
      
      {showDetail && dataPlate && (
        <PlateDetail dataPlate={dataPlate} onClose={() => { setShowDetail(false); setDataPlate(null); }} />
      )}
    </motion.div>
  )
}

export default SavedItems
