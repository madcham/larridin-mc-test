'use client'

import React, { useState } from 'react'
import { CheckCircle, Clock, FileText, LayoutDashboard, Menu, MessageSquare, PieChart, Settings, Users, Info, BarChart, Lightbulb, ChevronDown, ChevronUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

interface Task {
  id: string
  title: string
  priority: string
  deadline: string
  suggestedTime: string
  source: string
  waitedOn: boolean
  linkedToGoals: boolean
  assignedTo: string | null
  completed: boolean
  aiSuggestions: string[]
}

interface TeamMember {
  id: string
  name: string
  capacity: number
  skills: string[]
}

interface AIRecommendation {
  id: string
  title: string
  description: string
  preview: string
}

const LarridinApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [delegationMessage, setDelegationMessage] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)
  const [isAIRecommendationsOpen, setIsAIRecommendationsOpen] = useState(true)

  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: '1', 
      title: 'Update sales pipeline 📊', 
      priority: 'Low', 
      deadline: '2023-07-18', 
      suggestedTime: '15min', 
      source: 'salesforce', 
      waitedOn: false, 
      linkedToGoals: true, 
      assignedTo: null, 
      completed: false,
      aiSuggestions: [
        'Review and update opportunity stages in Salesforce',
        'Generate a quick sales forecast report',
        'Schedule a team review of the updated pipeline'
      ]
    },
    { 
      id: '2', 
      title: 'Follow up with lead 🤝', 
      priority: 'Medium', 
      deadline: '2023-07-19', 
      suggestedTime: '10min', 
      source: 'salesforce', 
      waitedOn: false, 
      linkedToGoals: false, 
      assignedTo: null, 
      completed: false,
      aiSuggestions: [
        'Prepare a personalized follow-up email',
        'Review lead's recent interactions with our website',
        'Schedule a discovery call if appropriate'
      ]
    },
    { 
      id: '3', 
      title: 'Respond to team query 💬', 
      priority: 'High', 
      deadline: '2023-07-15', 
      suggestedTime: '10min', 
      source: 'slack', 
      waitedOn: true, 
      linkedToGoals: false, 
      assignedTo: null, 
      completed: true,
      aiSuggestions: []
    },
    { 
      id: '4', 
      title: 'Prepare quarterly report 📈', 
      priority: 'High', 
      deadline: '2023-07-20', 
      suggestedTime: '2h', 
      source: 'email', 
      waitedOn: false, 
      linkedToGoals: true, 
      assignedTo: '2', 
      completed: false,
      aiSuggestions: [
        'Gather data from all departments',
        'Analyze key performance indicators',
        'Create visually appealing charts and graphs'
      ]
    },
    { 
      id: '5', 
      title: 'Review marketing strategy 🎯', 
      priority: 'Medium', 
      deadline: '2023-07-22', 
      suggestedTime: '1h', 
      source: 'asana', 
      waitedOn: false, 
      linkedToGoals: true, 
      assignedTo: '4', 
      completed: true,
      aiSuggestions: []
    },
  ])

  const teamMembers: TeamMember[] = [
    { id: '1', name: 'Alice Johnson', capacity: 75, skills: ['sales', 'communication'] },
    { id: '2', name: 'Bob Smith', capacity: 90, skills: ['technical', 'project management'] },
    { id: '3', name: 'Charlie Brown', capacity: 60, skills: ['design', 'customer service'] },
    { id: '4', name: 'Diana Prince', capacity: 85, skills: ['marketing', 'analytics'] },
  ]

  const aiRecommendations: AIRecommendation[] = [
    { 
      id: '1', 
      title: 'Optimize Task Delegation', 
      description: 'Improve your delegation strategy for better team productivity.',
      preview: 'Based on your team's current workload and skills, I recommend delegating the "Update sales pipeline" task to Alice Johnson. Her expertise in sales and communication makes her an ideal fit for this task.'
    },
    { 
      id: '2', 
      title: 'Streamline Communication', 
      description: 'Enhance team collaboration through improved communication channels.',
      preview: 'To reduce the time spent on responding to team queries, consider setting up a dedicated Slack channel for quick questions. This can help address common issues more efficiently.'
    },
    { 
      id: '3', 
      title: 'Prioritize High-Impact Tasks', 
      description: 'Focus on tasks that align with your key goals and objectives.',
      preview: 'The "Prepare quarterly report" task is crucial for your goals. I suggest blocking out 2 hours tomorrow morning to work on this without interruptions.'
    },
  ]

  const delegationEffectiveness = 78

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    setSelectedTask(null)
  }

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleDelegateClick = (taskId: string) => {
    setSelectedTask(taskId)
  }

  const handleAssignTask = (taskId: string, teamMemberId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, assignedTo: teamMemberId } : task
    ))
    setDelegationMessage(`Task delegated to ${teamMembers.find(m => m.id === teamMemberId)?.name}!`)
    setTimeout(() => setDelegationMessage(null), 3000)
  }

  const handleRecommendationClick = (recommendationId: string) => {
    setSelectedRecommendation(prevId => prevId === recommendationId ? null : recommendationId)
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'salesforce': return 'bg-blue-500 text-white'
      case 'slack': return 'bg-purple-500 text-white'
      case 'email': return 'bg-red-500 text-white'
      case 'asana': return 'bg-orange-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const renderTaskList = (showDelegateButton: boolean = false) => (
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task.id} className="bg-gray-800 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-102">
          <h3 className="text-lg font-bold text-purple-300 mb-2">{task.title}</h3>
          <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
            <span className={`px-2 py-1 rounded-full text-sm ${task.priority === 'Low' ? 'bg-yellow-800 text-yellow-200' : task.priority === 'Medium' ? 'bg-orange-800 text-orange-200' : 'bg-red-800 text-red-200'}`}>
              Priority: {task.priority}
            </span>
            <span className="bg-green-800 text-green-200 px-2 py-1 rounded-full text-sm">Deadline: {task.deadline}</span>
          </div>
          <div className="flex flex-wrap space-x-2 mb-2">
            <span className={`${getSourceColor(task.source)} text-xs font-semibold px-2 py-1 rounded-full`}>{task.source}</span>
            {task.waitedOn && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">Blocking</span>}
            {task.linkedToGoals && <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">Goal</span>}
          </div>
          <div className="flex flex-wrap justify-between items-center gap-2">
            <span className="flex items-center gap-1 bg-purple-800 text-purple-200 px-2 py-1 rounded-full text-sm">
              <Clock className="w-3 h-3" />
              {task.suggestedTime}
            </span>
            {showDelegateButton && !task.completed && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDelegateClick(task.id)}
                className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Delegate
              </Button>
            )}
            {task.completed && (
              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-sm">Completed</span>
            )}
          </div>
          {task.aiSuggestions.length > 0 && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left hover:bg-purple-700"
                onClick={() => handleRecommendationClick(task.id)}
              >
                <Zap className="mr-2 h-4 w-4" />
                AI Suggestions
              </Button>
              {selectedRecommendation === task.id && (
                <div className="mt-2 p-2 bg-gray-700 rounded-md">
                  <ul className="list-disc list-inside space-y-1">
                    {task.aiSuggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-300">{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {selectedTask === task.id && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-semibold text-purple-300">Assign to:</h4>
              <div className="flex flex-wrap gap-2">
                {teamMembers.map(member => (
                  <Button
                    key={member.id}
                    variant="outline"
                    size="sm"
                    className={`mr-2 ${task.assignedTo === member.id ? 'bg-green-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                    onClick={() => handleAssignTask(task.id, member.id)}
                  >
                    {member.name} ({member.capacity}% capacity)
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      {delegationMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300">
          {delegationMessage}
        </div>
      )}
    </div>
  )

  const renderTeamCapacity = () => (
    <div className="bg-gray-800 shadow-lg rounded-lg p-4 mb-6">
      <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
        Team Capacity
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 ml-2 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent> productivity factors.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      <div className="space-y-4">
        {teamMembers.map(member => (
          <div key={member.id} className="flex items-center justify-between">
            <span className="text-sm font-medium<Progress value={member.capacity} className="w-full" />
              <span className="text-sm font-medium text-gray-300">{member.capacity}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderDelegationEffectiveness = () => (
    <div className="bg-gray-800 shadow-lg rounded-lg p-4 mb-6">
      <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
        ="w-4 h-4 ml-2 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delegation effectiveness is measured by task completion rates, team feedback, and overall productivity improvements.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831/>
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a3"
              strokeDasharray={`${delegationEffectiveness}, 100`}
            />
          </svg>
          purple-300">
            {delegationEffectiveness}%
          </div>
        </div>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-3600 to-blue-600 text-white shadow-lg rounded-lg p-4">
        <h3 className="flex items-center gap-2 text3>
        <p className="text-lg">I've analyzed your workload across all platforms. Here's your optimdiv>
        <div>
          <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-centeroltipTrigger>
                <TooltipContent>
                  <p>Tasks are prioritized based on dea>
            </TooltipProvider>
          </h3>
          {renderTaskList()}
        </div>
      </="text-3xl font-bold text-purple-300">Tasks</h2>
      <div className="bg-gray-800 shadow-lg rounded-TaskList(true)}
      </div>
    </div>
  )

  const renderAnalytics = () => {
    const completedTasks = tasks: tasks.filter(task => task.assignedTo === member.id).length
    }))

    return (
      <div className="spaced grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 shadow-lg rounded-lg p-4">
            text-gray-300">Completed Tasks:</span>
                <span className="text-2xl font-bold text-green="text-2xl font-bold text-blue-400">{delegatedTasks}</span>
              </div>
            </div>
          </div>d text-purple-300 mb-4">Delegation Leaderboard</h3>
            <div className="space-y-4">
                  <span className="text-gray-300">{member.name}:</span>
                    <span className="text-))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  const + 1, 0).getDate()
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(),-y-6">
        <h2 className="text-3xl font-bold text-purple-300">Calendar</h2>
        <Card className2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={daydingDays, ...days].map((day, index) => (
                <Button
                  key={index}
                  variant={.getFullYear(), selectedDate.getMonth(), day))}
                >
                  {day}
                </Button>bg-gray-800 shadow-lg rounded-lg p-4">
          <h3 className="text-xl font-bold text-purple-300 mb
    )
  }

  const renderGuide = () => (
    <div className="space-y-6">
      <h2 className="text-3xl3 className="text-xl font-bold text-purple-300 mb-4">How to Use Larridin</h3>
        <ol className="list
            <strong>Tasks:</strong> See all your tasks and delegate them to team members. Click the day.
          </li>
          <li>
            <strong>Analytics:</strong> Track your task completion rate
            <strong>Delegation:</strong> When delegating a task, consider the team member's current</li>
          <li>
            <strong>AI Assistant:</strong> Pay attention to the AI Assistant's recommendationsalized recommendations on how to approach and complete the task efficiently.
          </li>
        <LayoutDashboard className="w-5 h-5" />, render: renderDashboard },
    { id: 'tasks', label: 'Tasks: <FileText className="w-5 h-5" />, render: renderCalendar },
    { id: 'analytics', label: 'Analytics', icon:Text className="w-5 h-5" />, render: renderGuide },
  ]

  const SidebarContent = () => (
    <>
      <div="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          <path
            d="M9.5 19C8.89 19 8.39 18.65 8.14 18.13L6.31 14.47C6.11 14.06 6 13.61 6 13.14V7.5C6 6.12 7.12 5 8.5 5H14.5C15.88 5 17 6.12 17 7.5V13.14C17 13.61 16.89 14.06 16.69 14.47L14.86 18.13C14.61 18ap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 5V19"
            stroke)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          <linearGradient
              id="paint0_linear"
              x1="6"
              y1="5"
              x