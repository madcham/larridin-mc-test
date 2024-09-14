import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [isStylesLoaded, setIsStylesLoaded] = useState(false)

  useEffect(() => {
    // Check if styles are loaded
    const styleSheets = document.styleSheets
    if (styleSheets.length > 0) {
      setIsStylesLoaded(true)
    }
  }, [])

  if (!isStylesLoaded) {
    return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Loading styles...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">Larridin App</h1>
      </header>
      <main className="p-4">
        <Component {...pageProps} />
      </main>
      <footer className="bg-gray-800 p-4 text-center">
        <p>&copy; 2023 Larridin. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default MyApp