import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface CollapsibleProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

const Collapsible: React.FC<CollapsibleProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="p-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
        {isOpen ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
      </Button>
      {isOpen && (
        <div className="mt-2 p-2 bg-gray-700 rounded-md text-sm">
          {children}
        </div>
      )}
    </div>
  )
}

export default Collapsible