import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import LLMContextChart from "./llms-context-chart"

export default function Home() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check system preference on mount
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
        <LLMContextChart />
      </div>
    </main>
  )
}