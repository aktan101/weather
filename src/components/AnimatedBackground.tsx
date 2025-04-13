"use client"

import { useEffect, useState } from "react"

interface AnimatedBackgroundProps {
    condition: string
}

export default function AnimatedBackground({ condition }: AnimatedBackgroundProps) {
    const [backgroundImage, setBackgroundImage] = useState("/public/default-weather.jpg")
    const [particles, setParticles] = useState<JSX.Element[]>([])

    // Check if screen is small
    const isSmallScreen = window.matchMedia("(max-width: 640px)").matches
    const isMediumScreen = window.matchMedia("(max-width: 1024px)").matches

    const getParticleCount = () => {
        if (isSmallScreen) return 15
        if (isMediumScreen) return 30
        return 50
    }

    useEffect(() => {
        // Map weather conditions to background images
        const getBackgroundImage = () => {
            if (!condition) return "/public/default-weather.jpg"

            if (condition.includes("clear")) {
                return "/public/clear-sky.jpg"
            } else if (condition.includes("cloud")) {
                return "/public/cloudy.jpg"
            } else if (condition.includes("rain") || condition.includes("drizzle")) {
                return "/public/rainy.jpg"
            } else if (condition.includes("snow")) {
                return "/public/snowy.jpg"
            } else if (condition.includes("thunderstorm")) {
                return "/public/thunderstorm.jpg"
            } else if (condition.includes("fog") || condition.includes("mist")) {
                return "/public/foggy.jpg"
            } else {
                return "/public/default-weather.jpg"
            }
        }

        setBackgroundImage(getBackgroundImage())

        // Generate animated particles based on weather condition
        const generateParticles = () => {
            const newParticles: JSX.Element[] = []
            const particleCount = getParticleCount()

            if (condition.includes("rain") || condition.includes("drizzle")) {
                // Rain drops
                for (let i = 0; i < particleCount; i++) {
                    const randomX = Math.random() * 100
                    const randomDelay = Math.random() * 2
                    const randomDuration = 0.7 + Math.random() * 0.5

                    newParticles.push(
                        <div
                            key={`rain-${i}`}
                            className="absolute w-[1px] h-[10px] bg-white/70 rounded-full animate-rain-drop"
                            style={{
                                left: `${randomX}%`,
                                top: "-20px",
                                animationDuration: `${randomDuration}s`,
                                animationDelay: `${randomDelay}s`,
                            }}
                        />,
                    )
                }
            } else if (condition.includes("snow")) {
                // Snowflakes
                for (let i = 0; i < particleCount / 2; i++) {
                    const randomX = Math.random() * 100
                    const randomDelay = Math.random() * 5
                    const randomDuration = 5 + Math.random() * 10
                    const size = 3 + Math.random() * 5

                    newParticles.push(
                        <div
                            key={`snow-${i}`}
                            className="absolute bg-white rounded-full animate-snow-fall"
                            style={{
                                left: `${randomX}%`,
                                top: "-20px",
                                width: `${size}px`,
                                height: `${size}px`,
                                animationDuration: `${randomDuration}s`,
                                animationDelay: `${randomDelay}s`,
                            }}
                        />,
                    )
                }
            } else if (condition.includes("thunderstorm")) {
                // Lightning flashes - fewer on small screens
                const flashCount = isSmallScreen ? 1 : isMediumScreen ? 2 : 3
                for (let i = 0; i < flashCount; i++) {
                    const randomDelay = 2 + Math.random() * 5
                    const randomDuration = 0.2 + Math.random() * 0.3
                    const randomX = 20 + Math.random() * 60
                    const randomY = 10 + Math.random() * 40

                    newParticles.push(
                        <div
                            key={`lightning-${i}`}
                            className="absolute bg-white/30 animate-lightning-flash"
                            style={{
                                left: `${randomX}%`,
                                top: `${randomY}%`,
                                width: isSmallScreen ? "50px" : isMediumScreen ? "75px" : "100px",
                                height: isSmallScreen ? "150px" : isMediumScreen ? "225px" : "300px",
                                filter: "blur(20px)",
                                animationDuration: `${randomDuration}s`,
                                animationDelay: `${randomDelay}s`,
                                animationIterationCount: "infinite",
                            }}
                        />,
                    )
                }
            }

            setParticles(newParticles)
        }

        generateParticles()
    }, [condition, isSmallScreen, isMediumScreen])

    return (
        <div className="fixed inset-0 z-[-1]">
            <div
                className="absolute inset-0 animate-fade-in"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

            {/* Animated particles container */}
            <div className="absolute inset-0 overflow-hidden">{particles}</div>
        </div>
    )
}
