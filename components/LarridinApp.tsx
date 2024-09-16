'use client'

import React, { useState } from 'react'
import { Calendar as CalendarIcon, CheckCircle, Clock, FileText, LayoutDashboard, Menu, MessageSquare, PieChart, Settings, Users, Info, BarChart, Lightbulb, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import AINotifications from "./AINotifications"
//import confetti from 'canvas-confetti'

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
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)
  const [isAIRecommendationsOpen, setIsAIRecommendationsOpen] = useState(true)

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Update sales pipeline 📊', priority: 'Low', deadline: '2024-09-20', suggestedTime: '15min', source: 'salesforce', waitedOn: false, linkedToGoals: true, assignedTo: null, completed: false },
    { id: '2', title: 'Follow up with lead 🤝', priority: 'Medium', deadline: '2024-09-19', suggestedTime: '10min', source: 'salesforce', waitedOn: false, linkedToGoals: false, assignedTo: null, completed: false },
    { id: '3', title: 'Respond to team query 💬', priority: 'High', deadline: '2024-09-15', suggestedTime: '10min', source: 'slack', waitedOn: true, linkedToGoals: false, assignedTo: null, completed: true },
    { id: '4', title: 'Prepare quarterly report 📈', priority: 'High', deadline: '2024-09-20', suggestedTime: '2h', source: 'email', waitedOn: false, linkedToGoals: true, assignedTo: '2', completed: false },
    { id: '5', title: 'Review marketing strategy 🎯', priority: 'Medium', deadline: '2024-09-22', suggestedTime: '1h', source: 'asana', waitedOn: false, linkedToGoals: true, assignedTo: '4', completed: true },
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
      preview: 'Based on your teams current workload and skills, I recommend delegating the "Update sales pipeline" task to Alice Johnson. Her expertise in sales and communication makes her an ideal fit for this task.'
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
    //confetti({
      //particleCount: 100,
      //spread: 70,
      //origin: { y: 0.6 }
    //})
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

  const renderTaskList = (showDelegateButton: boolean = false, filterDate?: Date) => (
    <div className="space-y-4">
      {tasks
        .filter(task => !filterDate || new Date(task.deadline).toDateString() === filterDate.toDateString())
        .map(task => (
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
          <AINotifications taskId={task.id} taskTitle={task.title} />
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
            <TooltipContent>
              <p>Team capacity is calculated based on assigned tasks, working hours, and individual productivity factors.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      <div className="space-y-4">
        {teamMembers.map(member => (
          <div key={member.id} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">{member.name}</span>
            <div className="flex items-center gap-2 w-2/3">
              <Progress value={member.capacity} className="w-full" />
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
        Delegation Effectiveness
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 ml-2 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delegation effectiveness is measured by task completion rates, team feedback, and overall productivity improvements.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#4B5563"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="3"
              strokeDasharray={`${delegationEffectiveness}, 100`}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-purple-300">
            {delegationEffectiveness}%
          </div>
        </div>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300">Welcome back, Alex! 👋</h2>
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg rounded-lg p-4">
        <h3 className="flex items-center gap-2 text-2xl font-bold mb-2">
          <MessageSquare className="w-6 h-6" />
          AI Assistant
        </h3>
        <p className="text-lg">I've analyzed your workload across all platforms. Here's your optimized task list for today:</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {renderTeamCapacity()}
          {renderDelegationEffectiveness()}
        </div>
        <div>
          <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
            Today's Tasks
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 ml-2 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tasks are prioritized based on deadlines, importance, and your work patterns.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          {renderTaskList()}
        </div>
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300">Tasks</h2>
      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <h3 className="text-xl font-bold text-purple-300 mb-4">All Tasks</h3>
        {renderTaskList(true)}
      </div>
    </div>
  )

  const renderAnalytics = () => {
    const completedTasks = tasks.filter(task => task.completed).length
    const delegatedTasks = tasks.filter(task => task.assignedTo !== null).length
    const delegationByMember = teamMembers.map(member => ({
      ...member,
      delegatedTasks: tasks.filter(task => task.assignedTo === member.id).length
    }))

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-purple-300">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-bold text-purple-300 mb-4">Task Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Completed Tasks:</span>
                <span className="text-2xl font-bold text-green-400">{completedTasks}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Delegated Tasks:</span>
                <span className="text-2xl font-bold text-blue-400">{delegatedTasks}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-bold text-purple-300 mb-4">Delegation Leaderboard</h3>
            <div className="space-y-4">
              {delegationByMember
                .sort((a, b) =>  b.delegatedTasks - a.delegatedTasks)
                .map(member => (
                  <div key={member.id} className="flex justify-between items-center">
                    <span className="text-gray-300">{member.name}:</span>
                    <span className="text-xl font-bold text-purple-400">{member.delegatedTasks} tasks</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCalendar = () => {
    const staticTasks = [
      { id: '1', title: 'Update sales pipeline 📊', priority: 'Low', deadline: '2024-09-20', suggestedTime: '15min', source: 'salesforce' },
      { id: '2', title: 'Follow up with lead 🤝', priority: 'Medium', deadline: '2024-09-19', suggestedTime: '10min', source: 'salesforce' },
      { id: '3', title: 'Respond to team query 💬', priority: 'High', deadline: '2024-09-15', suggestedTime: '10min', source: 'slack' },
    ]

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-purple-300">Calendar</h2>
        <div className="bg-gray-800 shadow-lg rounded-lg p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="bg-gray-800 shadow-lg rounded-lg p-4">
          <h3 className="text-xl font-bold text-purple-300 mb-4">Tasks for {date?.toDateString()}</h3>
          <div className="space-y-4">
            {staticTasks.map(task => (
              <div key={task.id} className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-bold text-purple-300 mb-2">{task.title}</h4>
                <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    task.priority === 'Low' ? 'bg-yellow-800 text-yellow-200' : 
                    task.priority === 'Medium' ? 'bg-orange-800 text-orange-200' : 
                    'bg-red-800 text-red-200'
                  }`}>
                    Priority: {task.priority}
                  </span>
                  <span className="bg-green-800 text-green-200 px-2 py-1 rounded-full text-sm">Deadline: {task.deadline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 bg-purple-800 text-purple-200 px-2 py-1 rounded-full text-sm">
                    <Clock className="w-3 h-3" />
                    {task.suggestedTime}
                  </span>
                  <span className={`${getSourceColor(task.source)} text-xs font-semibold px-2 py-1 rounded-full`}>{task.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderGuide = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300">Guide</h2>
      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <h3 className="text-xl font-bold text-purple-300 mb-4">How to Use Larridin</h3>
        <ol className="list-decimal list-inside space-y-4 text-gray-300">
          <li>
            <strong>Dashboard:</strong> View your AI-optimized task list, team capacity, and delegation effectiveness.
          </li>
          <li>
            <strong>Tasks:</strong> See all your tasks and delegate them to team members. Click the "Delegate" button next to a task to assign it to a team member.
          </li>
          <li>
            <strong>Calendar:</strong> View your tasks in a calendar format. Select a date to see tasks for that specific day.
          </li>
          <li>
            <strong>Analytics:</strong> Track your task completion rate and see how effectively you're delegating tasks to your team members.
          </li>
          <li>
            <strong>Delegation:</strong> When delegating a task, consider the team member's current capacity and skills. The app will show you each member's current workload to help you make informed decisions.
          </li>
          <li>
            <strong>AI Assistant:</strong> Pay attention to the AI Assistant's recommendations on the dashboard. It analyzes your workload across all platforms to provide optimized task lists.
          </li>
          <li>
            <strong>AI Recommendations:</strong> Check the AI Recommendations section in the sidebar for personalized suggestions to improve your productivity and team management.
          </li>
        </ol>
      </div>
    </div>
  )

  const renderAIRecommendations = () => (
    <div className="bg-gray-800 shadow-lg rounded-lg p-4">
      <button
        onClick={() => setIsAIRecommendationsOpen(!isAIRecommendationsOpen)}
        className="flex items-center justify-between w-full text-left mb-4"
      >
        <h3 className="text-xl font-bold text-purple-300">AI Recommendations</h3>
        {isAIRecommendationsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {isAIRecommendationsOpen && (
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {aiRecommendations.map(recommendation => (
            <div key={recommendation.id} className="mb-4">
              <Button
                variant="outline"
                className="w-full justify-start text-left hover:bg-purple-700"
                onClick={() => handleRecommendationClick(recommendation.id)}
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                {recommendation.title}
              </Button>
              {selectedRecommendation === recommendation.id && (
                <div className="mt-2 p-2 bg-gray-700 rounded-md">
                  <p className="text-sm text-gray-300">{recommendation.preview}</p>
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      )}
    </div>
  )

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, render: renderDashboard },
    { id: 'tasks', label: 'Tasks', icon: <CheckCircle className="w-5 h-5" />, render: renderTasks },
    { id: 'calendar', label: 'Calendar', icon: <CalendarIcon className="w-5 h-5" />, render: renderCalendar },
    { id: 'analytics', label: 'Analytics', icon: <PieChart className="w-5 h-5" />, render: renderAnalytics },
    { id: 'guide', label: 'Guide', icon: <FileText className="w-5 h-5" />, render: renderGuide },
  ]

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 mb-8">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          <path
            d="M9.5 19C8.89 19 8.39 18.65 8.14 18.13L6.31 14.47C6.11 14.06 6 13.61 6 13.14V7.5C6 6.12 7.12 5 8.5 5H14.5C15.88 5 17 6.12 17 7.5V13.14C17 13.61 16.89 14.06 16.69 14.47L14.86 18.13C14.61 18.65 14.11 19 13.5 19H9.5Z"
            stroke="url(#paint0_linear)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 5V19"
            stroke="url(#paint1_linear)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 8H7"
            stroke="url(#paint2_linear)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 11H7"
            stroke="url(#paint3_linear)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="6"
              y1="5"
              x2="17"
              y2="19"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="12"
              y1="5"
              x2="12"
              y2="19"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient
              id="paint2_linear"
              x1="7"
              y1="8"
              x2="9"
              y2="8"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient
              id="paint3_linear"
              x1="7"
              y1="11"
              x2="9"
              y2="11"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
        <h1 className="text-2xl font-bold text-purple-300">Larridin</h1>
      </div>
      <nav className="flex flex-col items-stretch h-full space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex items-center gap-3 justify-start py-3 px-4 text-left hover:bg-gray-700 rounded-lg transition-colors duration-200 ${activeTab === tab.id ? 'bg-gray-700' : ''}`}
          >
            {tab.icon}
            <span className="text-sm font-medium text-gray-200">{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-8">
        {renderAIRecommendations()}
      </div>
    </>
  )

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="hidden md:block w-64 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
        <SidebarContent />
      </aside>
      <div className="md:hidden">
        <button
          onClick={handleSidebarToggle}
          className="fixed top-4 left-4 z-20 bg-gray-800 p-2 rounded-md shadow-md"
        >
          <Menu className="h-6 w-6" />
        </button>
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={handleSidebarToggle}>
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-gray-800 p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
              <SidebarContent />
            </div>
          </div>
        )}
      </div>
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {tabs.find(tab => tab.id === activeTab)?.render()}
      </main>
    </div>
  )
}

export default LarridinApp