import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [isStylesLoaded, setIsStylesLoaded] = useState(false)

  useEffect(() => {
    // Set a timeout to ensure the app renders even if styles don't load
    const timeoutId = setTimeout(() => {
      setIsStylesLoaded(true)
    }, 2000)

    // Check if styles are loaded
    const styleSheets = document.styleSheets
    if (styleSheets.length > 0) {
      setIsStylesLoaded(true)
      clearTimeout(timeoutId)
    }

    // Cleanup function
    return () => clearTimeout(timeoutId)
  }, [])

  if (!isStylesLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-purple-300">Loading Larridin...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold text-purple-300">Larridin App</h1>
      </header>
      <main className="p-4">
        <Component {...pageProps} />
      </main>
      <footer className="bg-gray-800 p-4 text-center text-gray-400">
        <p>&copy; 2023 Larridin. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default MyApp