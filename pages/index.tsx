import dynamic from 'next/dynamic'

const DynamicLarridinApp = dynamic(() => import('../components/LarridinApp'), { ssr: false })

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <DynamicLarridinApp />
    </div>
  )
}

export default Home