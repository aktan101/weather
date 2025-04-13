import type { WeatherData } from "../types/weather"
import { ThermometerSun, ThermometerSnowflake, Droplets, Cloud, Wind, Globe } from "lucide-react"

interface WeatherDetailsProps {
    data: WeatherData
}

export default function WeatherDetails({ data }: WeatherDetailsProps) {
    const { weather, main, wind } = data

    const weatherDescription = weather[0]?.description || "Unknown"
    const weatherMain = weather[0]?.main || "Unknown"

    return (
        <div className="text-white">
            <div className="flex items-center mb-4 sm:mb-6 animate-slide-down">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-400" />
                <div className="flex items-center">
                    <img
                        src={`https://flagcdn.com/w40/${data.sys.country.toLowerCase()}.png`}
                        alt={`${data.sys.country} flag`}
                        className="h-4 sm:h-5 mr-2"
                    />
                    <span className="text-white font-medium text-sm sm:text-base">
            {data.name}, {data.sys.country}
          </span>
                </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 uppercase tracking-wider animate-slide-down animation-delay-100">
                {weatherMain} {weather[0]?.icon?.includes("d") ? "DAY" : "NIGHT"}
            </h2>

            <div className="mb-6 sm:mb-8 animate-slide-down animation-delay-200">
                <h3 className="text-white/70 uppercase text-xs sm:text-sm tracking-wider mb-1 sm:mb-2">Weather Details</h3>
                <p className="text-base sm:text-xl capitalize">{weatherDescription}</p>
            </div>

            <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between items-center border-b border-white/20 pb-3 sm:pb-4 animate-slide-down animation-delay-300">
                    <div className="flex items-center">
                        <ThermometerSun className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-red-400" />
                        <span className="text-white/70 text-sm sm:text-base">Temp max</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm sm:text-base">{Math.round(main.temp_max)}°</span>
                    </div>
                </div>

                <div className="flex justify-between items-center border-b border-white/20 pb-3 sm:pb-4 animate-slide-down animation-delay-400">
                    <div className="flex items-center">
                        <ThermometerSnowflake className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-400" />
                        <span className="text-white/70 text-sm sm:text-base">Temp min</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm sm:text-base">{Math.round(main.temp_min)}°</span>
                    </div>
                </div>

                <div className="flex justify-between items-center border-b border-white/20 pb-3 sm:pb-4 animate-slide-down animation-delay-500">
                    <div className="flex items-center">
                        <Droplets className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-400" />
                        <span className="text-white/70 text-sm sm:text-base">Humidity</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm sm:text-base">{main.humidity}%</span>
                    </div>
                </div>

                <div className="flex justify-between items-center border-b border-white/20 pb-3 sm:pb-4 animate-slide-down animation-delay-600">
                    <div className="flex items-center">
                        <Cloud className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400" />
                        <span className="text-white/70 text-sm sm:text-base">Cloudy</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm sm:text-base">{data.clouds?.all || 0}%</span>
                    </div>
                </div>

                <div className="flex justify-between items-center animate-slide-down animation-delay-700">
                    <div className="flex items-center">
                        <Wind className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400" />
                        <span className="text-white/70 text-sm sm:text-base">Wind</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm sm:text-base">{Math.round(wind.speed)}km/h</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
