import { useEffect } from 'react'
import LarridinApp from '../components/LarridinApp'

export default function Home() {
  useEffect(() => {
    console.log('Home component mounted')
  }, [])

  console.log('Rendering Home component')
  return <LarridinApp />
}