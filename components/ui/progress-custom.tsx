import React from 'react'

interface ProgressProps {
  value: number
  max: number
  className?: string
}

export const Progress: React.FC<ProgressProps> = ({ value, max, className }) => {
  const percentage = (value / max) * 100

  return (
    <div className={`bg-gray-700 h-2 rounded-full overflow-hidden ${className}`}>
      <div
        className="bg-purple-500 h-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}