import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';

import imagetop from '../../public/image0.png'
import { useTranslation } from 'react-i18next';
import SimplifiedCitySelector from '../components/ModuleSelectCity';

/**
 * @typedef {Object} City
 * @property {string} id - Unique identifier for the city
 * @property {string} name - Name of the city
 * @property {string} image - URL of the city image
 * @property {string} color - Tailwind color class
 * @property {string} bg - Tailwind background class
 */

/**
 * CityGrid component displays a grid of selectable cities
 * @returns {JSX.Element}
 */
export default function CityGrid({ cities }) {

    const { t, i18n } = useTranslation()
    const langused = i18n.language;
    const navigate = useNavigate();

    const [selectedCity, setSelectedCity] = useState(null);

    // Retrieve selected city from local storage on component mount
    useEffect(() => {
        const storedCityId = localStorage.getItem('selectedCity');
        if (storedCityId) {
            setSelectedCity(storedCityId);
        } else {
            localStorage.setItem('selectedCity', 'select');
        }
    }, []);

    const handleCitySelect = (cityId) => {
        if (!cityId) return; // Prevent selection of "Coming Soon"
        setSelectedCity(cityId);
        localStorage.setItem('selectedCity', cityId); // Save selected city to local storage
        const city = cities.find(c => c.id === cityId);
        navigate(`/${city.id}/menu`);
    };

    return (
        <div className="min-h flex flex-col">
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
            <h1 className='text-4xl font-bold text-center'>{t('app.welcome')}</h1>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                    <div
                        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        role="grid"
                        aria-label="City selection grid"
                    >
                        {cities.map((city) => (
                            <button
                                key={city.id}
                                className={`
                                    group relative overflow-hidden rounded-2xl shadow-lg 
                                    hover:shadow-xl transition-all duration-300 transform
                                    hover:-translate-y-1
                                    ${selectedCity === city.id ? `border-4 ${city?.border}` : ''}
                                    ${!city.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                `}
                                onClick={() => handleCitySelect(city.id)}
                                disabled={!city.id}
                                aria-label={`Select ${city.name[langused]}`}
                            >
                                <div className="relative h-48 md:60">
                                    <img
                                        src={city.image}
                                        alt={`${city.name[langused]} city view`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-white text-2xl font-bold mb-2">{city.name[langused]}</h3>
                                        <div className={`h-1 w-20 ${city.bg} rounded-full`} />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}