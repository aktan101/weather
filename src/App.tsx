"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { fetchWeatherData } from "./utils/api"
import type { WeatherData } from "./types/weather"
import AnimatedBackground from "./components/AnimatedBackground"
import WeatherDetails from "./components/WeatherDetails"
import ErrorAlert from "./components/ErrorAlert"
import { Search, Cloud, CloudRain } from "lucide-react"

function App() {
    const [city, setCity] = useState("")
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [currentTime, setCurrentTime] = useState(new Date())

    // Check if screen is small
    const isSmallScreen = window.matchMedia("(max-width: 640px)").matches

    useEffect(() => {
        // Update time every minute
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 60000)

        return () => clearInterval(timer)
    }, [])

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!city.trim()) return

        setLoading(true)
        setError(null)

        try {
            const data = await fetchWeatherData(city)
            setWeatherData(data)
            setCity("") // Clear the input field after search
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch weather data")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (date: Date) => {
        return `${date.getHours().toString().padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")} - ${date.toLocaleDateString("en-US", {
            weekday: isSmallScreen ? "short" : "long",
            day: "numeric",
            month: "short",
            year: "2-digit",
        })}`
    }

    const weatherCondition = weatherData?.weather[0]?.main.toLowerCase() || ""

    return (
        <main className="relative min-h-screen w-full overflow-hidden">
            <AnimatedBackground condition={weatherCondition} />

            {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

            <div className="absolute inset-0 flex flex-col lg:flex-row">
                {/* Left side - Main temperature display */}
                <div className="flex-1 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 animate-fade-in">
                    {weatherData ? (
                        <>
                            <div className="flex items-end animate-slide-up">
                                <h1 className="text-[5rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[15rem] font-bold leading-none text-white drop-shadow-lg">
                                    {Math.round(weatherData.main.temp)}°
                                </h1>
                                <div className="mb-4 sm:mb-6 md:mb-8 ml-2 sm:ml-3 md:ml-4">
                                    {weatherData.weather[0].main === "Clear" ? (
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" />
                                    ) : (
                                        <Cloud className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-white drop-shadow-lg" />
                                    )}
                                </div>
                            </div>

                            <div className="mb-4 sm:mb-6 md:mb-8 animate-slide-up animation-delay-500">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white drop-shadow-lg">
                                        {weatherData.name}
                                    </h2>
                                    <div className="flex items-center bg-black/30 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                                        <img
                                            src={`https://flagcdn.com/w40/${weatherData.sys.country.toLowerCase()}.png`}
                                            alt={`${weatherData.sys.country} flag`}
                                            className="h-4 sm:h-5 md:h-6 mr-2"
                                        />
                                        <span className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl uppercase">
                      {weatherData.sys.country}
                    </span>
                                    </div>
                                </div>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 drop-shadow-md mt-1">
                                    {formatDate(currentTime)}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full animate-fade-in animation-delay-300">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white/80 text-center drop-shadow-lg mb-4">
                                Weather Forecast
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-white/60 text-center max-w-md px-4">
                                Enter a location to get detailed weather information
                            </p>
                        </div>
                    )}
                </div>

                {/* Right side - Weather details */}
                <div className="w-full lg:w-[350px] xl:w-[450px] bg-black/30 backdrop-blur-md p-4 sm:p-6 md:p-8 flex flex-col animate-fade-in">
                    <form onSubmit={handleSearch} className="relative mb-6 sm:mb-8">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Search Location..."
                            className="w-full bg-white/10 border-b-2 border-white/30 px-3 sm:px-4 py-2 pr-10 sm:pr-12 text-white placeholder-white/50 focus:outline-none focus:border-white/80 transition-all text-sm sm:text-base"
                        />
                        <button
                            type="submit"
                            disabled={loading || !city.trim()}
                            className="absolute right-0 top-0 h-full px-2 sm:px-3 text-white/70 hover:text-white transition-colors disabled:opacity-50"
                        >
                            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </form>

                    {loading ? (
                        <div className="flex-1 flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-white"></div>
                        </div>
                    ) : weatherData ? (
                        <WeatherDetails data={weatherData} />
                    ) : (
                        <div className="flex-1 flex flex-col justify-center items-center text-white/60">
                            <CloudRain className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 mb-4" />
                            <p className="text-center text-sm sm:text-base">Search for a location to see weather details</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default App
