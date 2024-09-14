import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.css' // Adjust this path as needed

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
    return null // or a loading indicator
  }

  return <Component {...pageProps} />
}

export default MyApp