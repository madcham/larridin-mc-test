import { useEffect } from 'react'
import LarridinApp from '../components/LarridinApp'
import ErrorBoundary from '../components/ErrorBoundary'

export default function Home() {
  useEffect(() => {
    console.log('Home component mounted')
  }, [])

  console.log('Rendering Home component')
  
  return (
    <ErrorBoundary>
      <LarridinApp />
    </ErrorBoundary>
  )
}

