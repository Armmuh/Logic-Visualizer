"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Key } from "lucide-react"

interface ApiKeyInputProps {
  onSubmit: (apiKey: string) => void
}

export default function ApiKeyInput({ onSubmit }: ApiKeyInputProps) {
  // ===================================================================
  // INSERT YOUR GEMINI API KEY HERE
  // Replace the empty string with your actual Gemini API key
  // Example: const GEMINI_API_KEY = "AIza...your-key-here"
  // ===================================================================
  const GEMINI_API_KEY = ""
  // ===================================================================

  useEffect(() => {
    // Automatically submit the API key when the component mounts
    if (GEMINI_API_KEY) {
      onSubmit(GEMINI_API_KEY)
    }
  }, [onSubmit])

  // If no API key is provided, show a button that alerts the user
  const handleClick = () => {
    alert("Please add your Gemini API key in the api-key-input.tsx file")
  }

  // Only show the button if no API key is provided
  if (!GEMINI_API_KEY) {
    return (
      <Button variant="outline" className="gap-2" onClick={handleClick}>
        <Key className="h-4 w-4" />
        Add Gemini API Key
      </Button>
    )
  }

  // If API key is provided, don't render anything
  return null
}
