import React from 'react'
import dynamic from 'next/dynamic'

const LarridinApp = dynamic(() => import('@/components/LarridinApp'), { ssr: false })

function Home() {
  return (
    <main>
      <LarridinApp />
    </main>
  )
}

export default Home