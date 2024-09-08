import React, { useState } from 'react'
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Clock, MessageSquare, Zap } from "lucide-react"

export default function LarridinApp() {
  const [taskFilter, setTaskFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')

  const tasks = [
    { id: 1, title: 'Update sales pipeline 📊', priority: 'Low', deadline: '2023-07-18', suggestedTime: '15min', source: 'salesforce', waitedOn: false, linkedToGoals: true },
    { id: 2, title: 'Follow up with lead 🤝', priority: 'Medium', deadline: '2023-07-19', suggestedTime: '10min', source: 'salesforce', waitedOn: false, linkedToGoals: false },
    { id: 3, title: 'Respond to team query 💬', priority: 'High', deadline: '2023-07-15', suggestedTime: '10min', source: 'slack', waitedOn: true, linkedToGoals: false },
    { id: 4, title: 'Share project update 📢', priority: 'Medium', deadline: '2023-07-16', suggestedTime: '15min', source: 'slack', waitedOn: true, linkedToGoals: false },
    { id: 5, title: 'Review Q2 report 📑', priority: 'High', deadline: '2023-07-15', suggestedTime: '30min', source: 'gmail', waitedOn: false, linkedToGoals: true },
  ]

  const getSourceColor = (source: string): string => {
    switch (source) {
      case 'salesforce': return 'bg-blue-500 text-white'
      case 'slack': return 'bg-purple-500 text-white'
      case 'gmail': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const renderTaskList = () => (
    <div className="space-y-4 overflow-y-auto h-[calc(100vh-280px)] pr-4">
      {tasks.filter(task => {
        if (taskFilter === 'quick') return parseInt(task.suggestedTime) <= 15
        if (taskFilter === 'waited_on') return task.waitedOn
        if (taskFilter === 'goals') return task.linkedToGoals
        return true
      }).filter(task => {
        if (platformFilter === 'all') return true
        return task.source === platformFilter
      }).map(task => (
        <Card key={task.id} className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-purple-700 dark:text-purple-300">{task.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">Priority: {task.priority}</Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Deadline: {task.deadline}</Badge>
            </div>
            <div className="flex flex-wrap space-x-2 mb-2">
              <Badge className={`${getSourceColor(task.source)} text-xs font-semibold`}>{task.source}</Badge>
              {task.waitedOn && <Badge variant="destructive" className="bg-red-500 text-white">Blocking</Badge>}
              {task.linkedToGoals && <Badge variant="default" className="bg-blue-500 text-white">Goal</Badge>}
            </div>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                <Clock className="w-3 h-3" />
                {task.suggestedTime}
              </Badge>
              <Button variant="outline" size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-none hover:from-purple-600 hover:to-blue-600">
                <Zap className="w-4 h-4 mr-2" />
                AI Suggestions
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300">Welcome back, Alex! 👋</h2>
      <Card className="bg-gradient-to-br from-purple-400 to-blue-500 text-white border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <MessageSquare className="w-6 h-6" />
            AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">I've analyzed your workload across all platforms. Here's your optimized task list for today:</p>
        </CardContent>
      </Card>
      {renderTaskList()}
    </div>
  )

  return renderDashboard()
}