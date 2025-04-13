"use client"

import { useState, useEffect } from "react"
import { AlertCircle, X } from "lucide-react"

interface ErrorAlertProps {
    message: string
    onClose: () => void
}

export default function ErrorAlert({ message, onClose }: ErrorAlertProps) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(onClose, 300) // Wait for exit animation to complete
        }, 5000)

        return () => clearTimeout(timer)
    }, [onClose])

    if (!isVisible) return null

    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md ${
                isVisible ? "animate-slide-down" : "animate-slide-up opacity-0"
            }`}
        >
            <div className="bg-red-900/80 backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-lg border border-red-700 flex items-center">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                <p className="flex-1 text-sm sm:text-base">{message}</p>
                <button
                    onClick={() => setIsVisible(false)}
                    className="ml-2 p-1 rounded-full hover:bg-red-800 transition-colors"
                >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
            </div>
        </div>
    )
}
