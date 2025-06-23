import React from 'react'
import logo from '../../public/image0.png'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'

const Testtttt = () => {
    return (
        <div className="bg-[#114e51] w-full h-screen pb-8 px-4 relative flex items-center justify-center">
            {/* Animated Logo */}
            <Link
                to="/"
                className="relative z-10 w-full flex items-center justify-center pt-4 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-lg transition-transform hover:scale-105"
            >
                <div className="relative flex items-center justify-center">
                    {/* Rotating border ring - Fixed positioning and size */}
                    <motion.div
                        className="absolute inset-0 w-[80%] h-36 rounded-full border-4 border-transparent opacity-80"
                        style={{
                            background: 'conic-gradient(from 0deg, transparent, #fbbf24, #f59e0b, #d97706, transparent)',
                            padding: '4px',
                            borderRadius: '10%',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 16,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Inner pulsing ring - Fixed positioning and size */}
                    <motion.div
                        className="absolute w-76 h-32 rounded-full border-2 border-white/30"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
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

                    {/* Main Logo - Consistent 288px (w-72) width */}
                    <motion.img
                        src={logo}
                        className="relative  rounded-full object-cover shadow-2xl border-4 border-white/40 backdrop-blur-sm"
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
                    {[...Array(30)].map((_, i) => (
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
        </div>
    )
}

export default Testtttt