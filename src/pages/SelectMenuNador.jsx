"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import AboutUs from "../components/AboutUs";
import logo from "../../public/image0.png";
import { loadMenuData } from "../utils/loadMenuData";
import { setInitialMenuData } from "../redux/slices/menuSlice";

const SelectMenuNador = ({ cities = [] }) => {
    const { cityId } = useParams();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    // Local state
    const [city, setCity] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageErrors, setImageErrors] = useState({});

    // Derived values
    const currentLanguage = i18n.language;

    // Menu data configuration for Nador - 3 restaurants
    const menuItems = [
        {
            id: 'golf',
            title: t('menu.golf', 'GOLF RESTAURANT'),
            subtitle: 'Golf Club',
            backgroundImage: `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80`,
            fallbackColor: 'bg-gradient-to-br from-green-900 to-green-700',
            overlayColor: 'bg-green-900/60',
            hoverOverlay: 'hover:bg-green-800/70'
        },
        {
            id: 'norsal',
            title: t('menu.norsal', 'NORSAL RESTAURANT'),
            subtitle: 'Fine Dining',
            backgroundImage: `https://brigade-hocare.com/info/wp-content/uploads/2024/09/decoration-restaurant.png`,
            fallbackColor: 'bg-gradient-to-br from-blue-900 to-blue-700',
            overlayColor: 'bg-blue-900/60',
            hoverOverlay: 'hover:bg-blue-800/70'
        },
        {
            id: 'beachclub',
            title: t('menu.beachclub', 'BEACH CLUB'),
            subtitle: 'Beachfront Dining',
            backgroundImage: `https://poitoux.fr/wp-content/uploads/2022/02/outdoor-chairs-and-lounge-chairs-Fast-e1645544705166.jpg`,
            fallbackColor: 'bg-gradient-to-br from-teal-900 to-teal-700',
            overlayColor: 'bg-teal-800/60',
            hoverOverlay: 'hover:bg-teal-800/70'
        }
    ];

    // Find and set the current city
    useEffect(() => {
        if (cities?.length && cityId) {
            const foundCity = cities.find((city) => city.id === cityId);
            if (foundCity) {
                setCity(foundCity);
            } else {
                setError(t('errors.cityNotFound', 'City not found'));
            }
        }
    }, [cities, cityId, t]);

    // Initialize menu data
    useEffect(() => {
        const initializeMenu = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const menuData = await loadMenuData();
                dispatch(setInitialMenuData(menuData));
            } catch (err) {
                console.error("Failed to load menu data:", err);
                setError(t('errors.menuLoadFailed', 'Failed to load menu data'));
            } finally {
                setIsLoading(false);
            }
        };

        initializeMenu();
    }, [dispatch, t]);

    // Handle image load errors
    const handleImageError = (menuId) => {
        setImageErrors(prev => ({ ...prev, [menuId]: true }));
    };

    // Animation variants
    const containerVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.6 } },
        exit: { opacity: 0 }
    };

    const headerVariants = {
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const menuVariants = {
        initial: { y: 30, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.3 } }
    };

    const menuItemVariants = {
        initial: { scale: 0.95, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        hover: {
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        tap: { scale: 0.98 }
    };

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center min-h-screen bg-gray-50"
            >
                <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {t('errors.title', 'Oops! Something went wrong')}
                    </h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {t('common.goHome', 'Go Home')}
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="pb-6 max-w-7xl mx-auto min-h-screen"
        >
            {/* Header Section */}
            <motion.header
                variants={headerVariants}
                className={`bg-gradient-to-b from-[#114e51] via-[#1a5c5f] ${city.to} w-full pb-6 px-4 rounded-b-3xl shadow-2xl relative overflow-hidden`}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

                {/* Animated Logo */}
                <Link
                    to="/"
                    className="relative z-10 w-full flex items-center justify-center pt-4 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-lg transition-transform hover:scale-105"
                    aria-label={t('common.goHome', 'Go to home page')}
                >
                    <div className="relative">
                        {/* Rotating border ring */}
                        <motion.div
                            className="absolute inset-0 top-10 w-72 h-1 rounded-full border-4 border-transparent bg-gradient-to-r from-yellow-400 via-teal-500 to-yellow-400 opacity-80"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent, #fbbf24, #f59e0b, #d97706, transparent)',
                                padding: '4px',
                                borderRadius: '10%'
                            }}
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 16,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />

                        {/* Inner pulsing ring */}
                        <motion.div
                            className="absolute inset-1 w-[272px] h-[120px] rounded-full border-2 border-white/30"
                            animate={{
                                scale: [1, 1.02, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        <motion.img
                            src={logo}
                            alt={t('common.logoAlt', 'Company Logo')}
                            className="relative w-72 h-32 rounded-full object-cover shadow-2xl border-4 border-white/40 backdrop-blur-sm"
                            loading="lazy"
                            initial={{
                                scale: 0.3,
                                opacity: 0,
                                rotate: -180,
                                y: -50
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                rotate: 0,
                                y: 0
                            }}
                            transition={{
                                duration: 1.2,
                                ease: "easeOut",
                                type: "spring",
                                stiffness: 100,
                                damping: 15
                            }}
                            whileHover={{
                                scale: 1.05,
                                transition: {
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }
                            }}
                            whileTap={{
                                scale: 0.95,
                                transition: {
                                    duration: 0.1
                                }
                            }}
                        />

                        {/* Floating particles */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-60"
                                style={{
                                    top: `${30 + Math.sin(i * 60) * 10}%`,
                                    left: `${20 + Math.cos(i * 60) * 80}%`,
                                }}
                                animate={{
                                    y: [-10, 10, -10],
                                    x: [-5, 5, -5],
                                    scale: [0.8, 1.2, 0.8],
                                    opacity: [0.4, 0.8, 0.4]
                                }}
                                transition={{
                                    duration: 2 + i * 0.3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.2
                                }}
                            />
                        ))}
                    </div>
                </Link>

                {/* Welcome Section */}
                <div className="relative z-10 text-white mt-6">
                    <div className="flex items-center flex-col gap-4">
                        <h1 className="text-2xl font-bold text-center tracking-wide">
                            {t('app.welcometo', 'Welcome to')}
                        </h1>

                        {city?.name && (
                            <motion.span
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className={`text-lg ${city.bg || 'bg-white'} bg-opacity-20 backdrop-blur-sm py-2 px-6 rounded-full min-w-[200px] text-center shadow-lg border border-white/20 font-medium`}
                            >
                                {city.name[currentLanguage] || city.name.en || city.name}
                            </motion.span>
                        )}

                        <p className="text-base text-center max-w-md text-white/90 leading-relaxed">
                            {t('home.chooseRestaurant', 'Choose Your Restaurant Experience')}
                        </p>
                    </div>
                </div>
            </motion.header>

            {/* Menu Section */}
            <motion.section
                variants={menuVariants}
                className="mt-8 px-4"
                aria-label={t('menu.section', 'Restaurant selection')}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {menuItems.map((menu, index) => (
                        <Link
                            key={menu.id}
                            to={`/${cityId}/menus/${menu.id}`}
                            className="block"
                            onClick={() => localStorage.setItem('idMenu', String(index + 1))}
                        >
                            <motion.div
                                variants={menuItemVariants}
                                whileHover="hover"
                                whileTap="tap"
                                initial="initial"
                                animate="animate"
                                transition={{ delay: index * 0.1 }}
                                className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer transform-gpu"
                            >
                                {/* Background Image or Fallback */}
                                <div className={`absolute inset-0 ${menu.fallbackColor}`}>
                                    {!imageErrors[menu.id] && (
                                        <img
                                            src={menu.backgroundImage}
                                            alt={`${menu.title} background`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={() => handleImageError(menu.id)}
                                            loading="lazy"
                                        />
                                    )}
                                </div>

                                {/* Overlay */}
                                <div className={`absolute inset-0 ${menu.overlayColor} ${menu.hoverOverlay} transition-all duration-300`}></div>

                                {/* Content */}
                                <div className="relative z-10 flex items-center justify-center h-48 md:h-64 p-6">
                                    <div className="text-center text-white">
                                        <motion.h3
                                            className="text-xl md:text-2xl font-bold mb-2 tracking-wide"
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                        >
                                            {menu.title}
                                        </motion.h3>
                                        <motion.p
                                            className="text-lg md:text-xl font-medium text-white/90"
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                        >
                                            {menu.subtitle}
                                        </motion.p>
                                        {/* Decorative element */}
                                        <motion.div
                                            className="mt-4 w-16 h-0.5 bg-white/60 mx-auto"
                                            initial={{ width: 0 }}
                                            animate={{ width: 64 }}
                                            transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                                        ></motion.div>
                                    </div>
                                </div>

                                {/* Hover Effect Border */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-300"></div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.section>

            {/* About Us Section */}
            <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 px-4"
                aria-label={t('about.section', 'About us section')}
            >
                <AboutUs />
            </motion.section>

            {/* Loading Overlay */}
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                >
                    <div className="bg-white rounded-2xl p-8 flex items-center space-x-4 shadow-2xl">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200"></div>
                            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
                        </div>
                        <span className="text-gray-700 font-medium">
                            {t('common.loading', 'Loading...')}
                        </span>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default SelectMenuNador; 