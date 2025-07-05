import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import imagetop from '../../public/image0.png'

/**
 * SimplifiedCitySelector - A standalone city selector module
 * @returns {JSX.Element}
 */
export default function SimplifiedCitySelector({ cities }) {
    const [selectedCity, setSelectedCity] = useState(null);

    // Check if user has previously selected a city
    useEffect(() => {
        const storedCityId = localStorage.getItem('selectedCity');
        if (storedCityId) {
            setSelectedCity(storedCityId);
        }
    }, []);

    const navigate = useNavigate();



    // Handle city selection
    const handleCitySelect = (cityId) => {
        if (!cityId) return;

        setSelectedCity(cityId);
        localStorage.setItem('selectedCity', cityId);
        navigate(`/${cityId}/menu`)


    };

    // Current language (fallback to English if i18n not available)
    const currentLang = 'en';

    // If not open and onClose is provided (modal mode), don't render

    return (
        <div className={"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"}>
            <div className={" rounded-xl shadow-2xl max-w-4xl w-full max-h-[100vh] overflow-y-auto mb-20"}>
                <motion.header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pb-6"
                >
                    <div className="w-full">
                        <div
                            className="w-full rounded-b-2xl shadow-xl shadow-yellow-100 bg-[#114e51]"
                            style={{
                                backgroundImage: `url(${imagetop})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                aspectRatio: '19/7',
                            }}
                            role="banner"
                            aria-label="City selection header"
                        />
                    </div>
                </motion.header>
                {/* Main content */}
                <div className="p-6">


                    {/* City grid - always displayed */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {cities?.map((city) => (
                            <motion.button
                                key={city.id}
                                className={`
                  group relative overflow-hidden rounded-2xl shadow-lg 
                  transition-all duration-300 transform
                  ${city.comingSoon ? 'cursor-not-allowed opacity-60' : 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'}
                  ${selectedCity === city.id && !city.comingSoon ? 'ring-4 ring-blue-500' : ''}
                `}
                                onClick={() => !city.comingSoon && handleCitySelect(city.id)}
                                aria-label={`Select ${city.name[currentLang]}`}
                                initial={{ opacity: 0, y: 20 }} // Start from below
                                animate={{ opacity: 1, y: 0 }} // Move to original position
                                transition={{ duration: 0.5 }} // Animation duration
                            >
                                <div className="relative h-44">
                                    <img
                                        src={city.image}
                                        alt={`${city.name[currentLang]} city view`}
                                        className={`w-full h-full object-cover transition-transform duration-300 ${!city.comingSoon ? 'group-hover:scale-110' : ''}`}
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    
                                    {/* Coming Soon Overlay */}
                                    {city.comingSoon && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-white text-lg font-bold mb-2">Coming Soon</div>
                                                <div className="text-white/80 text-sm">قريباً</div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-white text-2xl font-bold mb-2">{city.name[currentLang]}</h3>
                                        <div className={`h-1 w-20 ${city.bg} rounded-full`} />
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}