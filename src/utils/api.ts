import type { WeatherData, WeatherError } from "../types/weather"

const API_KEY = "2a44318a88c074e4bdbd09721e9f08b6"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
    try {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`)

        if (!response.ok) {
            const errorData = (await response.json()) as WeatherError
            throw new Error(errorData.message || "Failed to fetch weather data")
        }

        const data = (await response.json()) as WeatherData
        return data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error("An unknown error occurred")
    }
}

export const getWeatherIconUrl = (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })
}
