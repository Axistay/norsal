import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronRight, Globe } from 'lucide-react';

import imagetop from '../../public/image0.png';

 
export default function CityGrid({ cities }) {
  const { t, i18n } = useTranslation();
  const langused = i18n.language;
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve selected city from local storage on component mount
  useEffect(() => {
    // Simulate loading for smoother transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    const storedCityId = localStorage.getItem('selectedCity');
    if (storedCityId) {
      setSelectedCity(storedCityId);
    } else {
      localStorage.setItem('selectedCity', 'select');
    }

    return () => clearTimeout(timer);
  }, []);

  const handleCitySelect = (cityId) => {
    if (!cityId) return; // Prevent selection of "Coming Soon"
    
    // Create a visual feedback before navigation
    setSelectedCity(cityId);
    localStorage.setItem('selectedCity', cityId);
    
    // Slight delay for animation to be visible
    setTimeout(() => {
      const city = cities.find(c => c.id === cityId);
      const path = `/${city.id}/menus`;
      navigate(path);
    }, 300);
  };

  // City card animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Skeleton loading component
  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div 
          key={item} 
          className="rounded-2xl h-48 bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen ">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20 shadow-xl"
        >
          {/* Hero Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pb-6 relative"
          >
            <div className="w-full overflow-hidden rounded-3xl   shadow-xl shadow-teal-300">
              <motion.div
                className="w-full bg-[#114e51] relative"
                style={{
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  aspectRatio: '19/7',
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                role="banner"
                aria-label="City selection header"
              >
                <motion.img 
                  src={imagetop} 
                  alt="City selection banner"
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />
              </motion.div>
            </div>
          </motion.header>

          {/* Welcome Message */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* bg-[#ffd699] */}
            <div className=" rounded pt-6"> 
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-[#ffd699]    rounded-b bg-gradient-to-r from-[#ffd699] to-teal-300">
              {t('app.welcome')}
            </h1>
            </div>
           
          </motion.div>

          {/* City Grid */}
          <main className="flex-grow">
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                role="grid"
                aria-label="City selection grid"
              >
                {cities.map((city, index) => (
                  <motion.button
                    key={city.id || `coming-soon-${index}`}
                    className={`group relative overflow-hidden rounded-2xl shadow-lg 
                      transition-all duration-300
                      ${!city.id ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
                      ${selectedCity === city.id ? `ring-4 ring-offset-2 ${city?.border || 'ring-blue-500'}` : ''}
                      ${index === cities.length - 1 ? 'col-span-full' : ''}
                    `}
                    onClick={() => handleCitySelect(city.id)}
                    disabled={!city.id}
                    aria-label={`Select ${city.name?.[langused] || 'Coming Soon'}`}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="relative h-52 md:h-64">
                      <motion.img
                        src={city.image}
                        alt={`${city.name?.[langused] || 'Coming Soon'} city view`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* City Details Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-2xl font-bold mb-2">
                          {city.name?.[langused] || t('app.comingSoon')}
                        </h3>
                        <motion.div 
                          className={`h-1 w-16 ${city.bg || 'bg-gray-300'} rounded-full`}
                          initial={{ width: "20px" }}
                          whileHover={{ width: "60px" }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {city.id && (
                          <motion.div 
                            className="mt-3 flex items-center text-white/80 text-sm"
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                          >
                            <Globe className="w-4 h-4 mr-1" />
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Selected Indicator */}
                      {selectedCity === city.id && (
                        <motion.div 
                          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <div className={`w-4 h-4 rounded-full ${city.bg || 'bg-blue-500'}`} />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </main>
          
          {/* Footer */}
          <motion.footer 
            className="mt-16 text-center text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
          </motion.footer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}