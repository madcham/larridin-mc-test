import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface AINotification {
  id: number
  content: string
}

interface AINotificationsProps {
  taskId: number
  taskTitle: string
}

const AINotifications: React.FC<AINotificationsProps> = ({ taskId, taskTitle }) => {
  const [isOpen, setIsOpen] = useState(false)

  const getTaskSuggestions = (taskId: number, taskTitle: string): AINotification[] => {
    switch (taskId) {
      case 1:
        return [
          { id: 1, content: "Review and update opportunity stages in Salesforce" },
          { id: 2, content: "Generate a quick sales forecast report" },
          { id: 3, content: "Schedule a team review of the updated pipeline" },
        ]
      case 2:
        return [
          { id: 1, content: "Draft a personalized follow-up email to the lead" },
          { id: 2, content: "Schedule a discovery call with the potential client" },
          { id: 3, content: "Prepare a custom proposal based on lead's needs" },
        ]
      case 3:
        return [
          { id: 1, content: "Compose a clear and concise response to the team query" },
          { id: 2, content: "Schedule a quick team sync to address any follow-up questions" },
          { id: 3, content: "Compile relevant resources to share with the team" },
        ]
      default:
        return [
          { id: 1, content: `Schedule a focused time block for ${taskTitle}` },
          { id: 2, content: "Link this task to your quarterly goals" },
          { id: 3, content: "Consider delegating or seeking help with this task" },
        ]
    }
  }

  const notifications = getTaskSuggestions(taskId, taskTitle)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className="bg-gray-800 rounded-lg p-4 mt-4">
      <Button 
        onClick={toggleOpen}
        className="w-full flex justify-between items-center bg-purple-600 hover:bg-purple-700"
      >
        <span className="flex items-center">
          <Zap className="w-4 h-4 mr-2" />
          AI Suggestions
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>
      {isOpen && (
        <div className="mt-4 space-y-2">
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-gray-700 p-3 rounded">
              {notification.content}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AINotifications