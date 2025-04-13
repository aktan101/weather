export interface WeatherData {
    name: string
    sys: {
        country: string
    }
    weather: {
        id: number
        main: string
        description: string
        icon: string
    }[]
    main: {
        temp: number
        humidity: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
    }
    wind: {
        speed: number
        deg: number
    }
    clouds?: {
        all: number
    }
    dt: number
    cod: number
}

export interface WeatherError {
    message: string
    cod: string
}
