'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, CheckCircle, Clock, FileText, LayoutDashboard, Menu, MessageSquare, PieChart, Settings, Zap, Users, Info, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

//testing comments
const LarridinApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    console.log('LarridinApp component mounted')
  }, [])

  const handleTabClick = (tabId: string) => {
    console.log('Tab clicked:', tabId)
    setActiveTab(tabId)
  }

  const handleAISuggestionClick = () => {
    console.log('AI Suggestion clicked')
    // Your existing AI suggestion logic here
  }

  const handleSidebarToggle = () => {
    console.log('Sidebar toggle clicked')
    setIsSidebarOpen(!isSidebarOpen)
  }

  console.log('Rendering LarridinApp component')

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'tasks', label: 'Tasks', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <PieChart className="w-5 h-5" /> },
    { id: 'guide', label: 'Guide', icon: <FileText className="w-5 h-5" /> },
  ]

  const tasks = [
    { id: 1, title: 'Update sales pipeline 📊', priority: 'Low', deadline: '2023-07-18', suggestedTime: '15min', source: 'salesforce', waitedOn: false, linkedToGoals: true },
    { id: 2, title: 'Follow up with lead 🤝', priority: 'Medium', deadline: '2023-07-19', suggestedTime: '10min', source: 'salesforce', waitedOn: false, linkedToGoals: false },
    { id: 3, title: 'Respond to team query 💬', priority: 'High', deadline: '2023-07-15', suggestedTime: '10min', source: 'slack', waitedOn: true, linkedToGoals: false },
  ]

  const teamMembers = [
    { id: 1, name: 'Alice Johnson', capacity: 75 },
    { id: 2, name: 'Bob Smith', capacity: 90 },
    { id: 3, name: 'Charlie Brown', capacity: 60 },
    { id: 4, name: 'Diana Prince', capacity: 85 },
  ]

  const delegationEffectiveness = 78

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'salesforce': return 'bg-blue-500 text-white'
      case 'slack': return 'bg-purple-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getTaskSuggestions = (task: { id: number }) => {
    switch (task.id) {
      case 1:
        return [
          { emoji: '📊', text: 'Review and update opportunity stages in Salesforce' },
          { emoji: '📈', text: 'Generate a quick sales forecast report' },
          { emoji: '👥', text: 'Schedule a team review of the updated pipeline' },
        ]
      case 2:
        return [
          { emoji: '📧', text: 'Draft a personalized follow-up email to the lead' },
          { emoji: '📞', text: 'Schedule a discovery call with the potential client' },
          { emoji: '🎯', text: 'Prepare a custom proposal based on lead\'s needs' },
        ]
      case 3:
        return [
          { emoji: '💬', text: 'Compose a clear and concise response to the team query' },
          { emoji: '📅', text: 'Schedule a quick team sync to address any follow-up questions' },
          { emoji: '📚', text: 'Compile relevant resources to share with the team' },
        ]
      default:
        return [
          { emoji: '📅', text: 'Schedule a focused time block for this task' },
          { emoji: '🔗', text: 'Link this task to your quarterly goals' },
          { emoji: '👥', text: 'Consider delegating or seeking help with this task' },
        ]
    }
  }

  const renderTaskList = () => (
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task.id} className="bg-gray-800 rounded-lg p-4">
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="bg-purple-600 text-white border-none hover:bg-purple-700" onClick={handleAISuggestionClick}>
                  <Zap className="w-4 h-4 mr-2" />
                  AI Suggestions
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-purple-300">{task.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {getTaskSuggestions(task).map((suggestion, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg">
                      <span className="text-2xl">{suggestion.emoji}</span>
                      <span className="text-gray-200">{suggestion.text}</span>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  )

  const renderTeamCapacity = () => (
    <div className="bg-gray-800 shadow-lg rounded-lg p-4 mb-6">
      <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
        Team Capacity
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 ml-2 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">Team capacity is calculated based on assigned tasks, working hours, and individual productivity factors.</p>
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
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 ml-2 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">Delegation effectiveness is measured by task completion rates, team feedback, and overall productivity improvements.</p>
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
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 ml-2 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Tasks are prioritized based on deadlines, importance, and your work patterns.</p>
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
        {renderTaskList()}
      </div>
    </div>
  )

  const renderCalendar = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300">Calendar</h2>
      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-bold">{day}</div>
          ))}
          {Array.from({ length: 35 }, (_, i) => (
            <div key={i} className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center">
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300">Analytics</h2>
      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <h3 className="text-xl font-bold text-purple-300 mb-4">Task Completion Rate</h3>
        <div className="flex items-center space-x-2">
          <BarChart className="w-6 h-6 text-purple-300" />
          <div className="flex-1 bg-gray-700 h-4 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full" style={{ width: '75%' }}></div>
          </div>
          <span className="font-bold text-purple-300">75%</span>
        </div>
      </div>
    </div>
  )

  const renderGuide = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300">Guide</h2>
      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <h3 className="text-xl font-bold text-purple-300 mb-4">Welcome to Larridin: Your AI-Powered Management Assistant</h3>
        <div className="space-y-4 text-gray-300">
          <p>
            Larridin is designed to streamline your managerial tasks, boost productivity, and enhance team collaboration. Here's how the app works and why it's an essential tool for managers:
          </p>
          <h4 className="text-lg font-semibold text-purple-300">Dashboard</h4>
          <p>
            Your central hub for quick insights. It displays your AI-curated task list, team capacity, and delegation effectiveness. This overview helps you make informed decisions and prioritize your day.
          </p>
          <h4 className="text-lg font-semibold text-purple-300">Tasks</h4>
          <p>
            Manage and track all your tasks in one place. Tasks are automatically prioritized and include AI suggestions for efficient completion. This feature ensures you're always focused on what's most important.
          </p>
          <h4 className="text-lg font-semibold text-purple-300">Calendar</h4>
          <p>
            Visualize your schedule and important deadlines. The calendar integrates with your tasks, helping you plan your time effectively and avoid conflicts.
          </p>
          <h4 className="text-lg font-semibold text-purple-300">Analytics</h4>
          <p>
            Gain insights into your team's performance and your own productivity. Use these metrics to identify areas for improvement and celebrate successes.
          </p>
          <h4 className="text-lg font-semibold text-purple-300">AI Assistant</h4>
          <p>
            Your personal AI helper that provides task suggestions, helps with delegation, and offers insights to improve your management style. It learns from your habits to provide increasingly personalized assistance.
          </p>
          <h4 className="text-lg font-semibold text-purple-300">Why Larridin for Managers?</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>Centralizes all management tasks and information</li>
            <li>Provides AI-driven insights for better decision making</li>
            <li>Improves time management and task prioritization</li>
            <li>Enhances team collaboration and performance tracking</li>
            <li>Reduces cognitive load by automating routine tasks</li>
            <li>Adapts to your management style for personalized assistance</li>
          </ul>
          <p>
            Larridin is more than just a task manager; it's your AI-powered partner in effective leadership and team management. Explore each feature to unlock your full potential as a manager!
          </p>
        </div>
      </div>
    </div>
  )

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
    </>
  )

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="hidden md:block w-64 bg-gray-800 border-r border-gray-700 p-4">
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
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-gray-800 p-4" onClick={e => e.stopPropagation()}>
              <SidebarContent />
            </div>
          </div>
        )}
      </div>
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'guide' && renderGuide()}
      </main>
    </div>
  )
}

export default LarridinApp