'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, CheckCircle, Clock, FileText, LayoutDashboard, Menu, MessageSquare, PieChart, Settings, Zap, Users, Info } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

const LarridinApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [taskFilter, setTaskFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    { id: 4, title: 'Share project update 📢', priority: 'Medium', deadline: '2023-07-16', suggestedTime: '15min', source: 'slack', waitedOn: true, linkedToGoals: false },
    { id: 5, title: 'Review Q2 report 📑', priority: 'High', deadline: '2023-07-15', suggestedTime: '30min', source: 'gmail', waitedOn: false, linkedToGoals: true },
  ]

  const taskFilters = [
    { id: 'all', label: 'All Tasks' },
    { id: 'quick', label: 'Quick Wins' },
    { id: 'waited_on', label: 'Blocking' },
    { id: 'goals', label: 'Goals' },
  ]

  const platformFilters = [
    { id: 'all', label: 'All Platforms' },
    { id: 'salesforce', label: 'Salesforce' },
    { id: 'slack', label: 'Slack' },
    { id: 'gmail', label: 'Gmail' },
  ]

  const teamMembers = [
    { id: 1, name: 'Alice Johnson', capacity: 75 },
    { id: 2, name: 'Bob Smith', capacity: 90 },
    { id: 3, name: 'Charlie Brown', capacity: 60 },
    { id: 4, name: 'Diana Prince', capacity: 85 },
  ]

  const delegationEffectiveness = 78 // This would be calculated based on actual data

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'salesforce': return 'bg-blue-500 text-white'
      case 'slack': return 'bg-purple-500 text-white'
      case 'gmail': return 'bg-red-500 text-white'
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
      case 4:
        return [
          { emoji: '📢', text: 'Create a concise project status update for stakeholders' },
          { emoji: '📊', text: 'Prepare a visual progress report using project metrics' },
          { emoji: '🎥', text: 'Record a short video update for remote team members' },
        ]
      case 5:
        return [
          { emoji: '📑', text: 'Skim through the Q2 report and highlight key points' },
          { emoji: '💡', text: 'Prepare a list of insights and recommendations' },
          { emoji: '🎤', text: 'Draft talking points for the upcoming board meeting' },
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
    <div className="space-y-4 overflow-auto h-[calc(100vh-280px)] pr-4">
      {tasks.filter(task => {
        if (taskFilter === 'quick') return parseInt(task.suggestedTime) <= 15
        if (taskFilter === 'waited_on') return task.waitedOn
        if (taskFilter === 'goals') return task.linkedToGoals
        return true
      }).filter(task => {
        if (platformFilter === 'all') return true
        return task.source === platformFilter
      }).map(task => (
        <div key={task.id} className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-4">
          <h3 className="text-lg font-bold text-purple-300 mb-2">{task.title}</h3>
          <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
            <span className="bg-yellow-900 text-yellow-100 px-2 py-1 rounded-full text-sm">Priority: {task.priority}</span>
            <span className="bg-green-900 text-green-100 px-2 py-1 rounded-full text-sm">Deadline: {task.deadline}</span>
          </div>
          <div className="flex flex-wrap space-x-2 mb-2">
            <span className={`${getSourceColor(task.source)} text-xs font-semibold px-2 py-1 rounded-full`}>{task.source}</span>
            {task.waitedOn && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">Blocking</span>}
            {task.linkedToGoals && <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">Goal</span>}
          </div>
          <div className="flex flex-wrap justify-between items-center gap-2">
            <span className="flex items-center gap-1 bg-purple-900 text-purple-100 px-2 py-1 rounded-full text-sm">
              <Clock className="w-3 h-3" />
              {task.suggestedTime}
            </span>
            {mounted && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-none hover:from-purple-600 hover:to-blue-600">
                    <Zap className="w-4 h-4 mr-2" />
                    AI Suggestions
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-none">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-purple-300">{task.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {getTaskSuggestions(task).map((suggestion, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg shadow-md">
                        <span className="text-2xl">{suggestion.emoji}</span>
                        <span className="text-gray-200">{suggestion.text}</span>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
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
      <h2 className="text-3xl font-bold text-purple-300">Task Manager 📋</h2>
      <div className="flex space-x-2 mb-4 pb-2 overflow-x-auto">
        {taskFilters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setTaskFilter(filter.id)}
            className={`${taskFilter === filter.id ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-800'} rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 hover:shadow-lg whitespace-nowrap`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="flex space-x-2 mb-4 pb-2 overflow-x-auto">
        {platformFilters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setPlatformFilter(filter.id)}
            className={`${platformFilter === filter.id ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-800'} rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 hover:shadow-lg whitespace-nowrap`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      {renderTaskList()}
    </div>
  )

  const renderCalendar = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300">Smart Calendar 📅</h2>
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg rounded-lg p-4">
        <h3 className="flex items-center gap-2 text-2xl font-bold mb-2">
          <Settings className="w-6 h-6" />
          AI Calendar Optimization
        </h3>
        <p className="text-lg">I've identified optimal time slots for your tasks based on your work patterns and priorities.</p>
      </div>
      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <h3 className="text-2xl font-bold text-purple-300 mb-4">Today's Optimized Schedule</h3>
        <div className="space-y-4">
          {[
            { time: '9:00 AM - 9:30 AM', task: 'Respond to team query', color: 'bg-green-500 text-white' },
            { time: '10:00 AM - 10:15 AM', task: 'Follow up with lead', color: 'bg-blue-500 text-white' },
            { time: '11:00 AM - 11:30 AM', task: 'Review Q2 report', color: 'bg-purple-500 text-white' },
            { time: '2:00 PM - 2:15 PM', task: 'Share project update', color: 'bg-yellow-500 text-white' },
            { time: '3:30 PM - 3:45 PM', task: 'Update sales pipeline', color: 'bg-red-500 text-white' },
          ].map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-700 p-3 rounded-lg">
              <span className="font-medium text-gray-200 mb-2 sm:mb-0">{item.time}</span>
              <span className={`${item.color} text-sm font-semibold px-3 py-1 rounded-full`}>{item.task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300">Analytics</h2>
      <div className="bg-gray-800 shadow-lg rounded-lg p-6">
        <p className="text-lg text-gray-300">This is a placeholder for the Analytics content.</p>
      </div>
    </div>
  )

  const renderGuide = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300">User Guide</h2>
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold text-purple-300">Welcome to Larridin!</h3>
        <p className="text-gray-300">
          Larridin is your AI-powered personal assistant, designed to help you manage tasks, optimize your schedule, and boost your productivity across various platforms.
        </p>
        <h4 className="text-lg font-semibold text-purple-400">Key Features:</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Smart Task Management:</strong> Organize and prioritize tasks from different platforms in one place.</li>
          <li><strong>AI-Powered Suggestions:</strong> Get intelligent recommendations for tackling your tasks efficiently.</li>
          <li><strong>Calendar Optimization:</strong> Let AI help you schedule your day for maximum productivity.</li>
          <li><strong>Cross-Platform Integration:</strong> Seamlessly manage tasks from Salesforce, Slack, Gmail, and more.</li>
          <li><strong>Productivity Analytics:</strong> Gain insights into your work patterns and improve your efficiency.</li>
        </ul>
        <h4 className="text-lg font-semibold text-purple-400 mt-4">Understanding Team Capacity:</h4>
        <p className="text-gray-300">
          Team capacity is a measure of how much work your team can handle at any given time. It's calculated based on several factors:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Assigned Tasks:</strong> The number and complexity of tasks currently assigned to each team member.</li>
          <li><strong>Working Hours:</strong> The available working hours of each team member, accounting for time off and part-time schedules.</li>
          <li><strong>Individual Productivity:</strong> Historical data on each team member's work speed and efficiency.</li>
          <li><strong>Skill Match:</strong> How well the assigned tasks match each team member's skills and expertise.</li>
        </ul>
        <p className="text-gray-300">
          The capacity percentage you see for each team member represents their current workload relative to their maximum capacity. This helps you make informed decisions about task delegation and workload management.
        </p>
        <h4 className="text-lg font-semibold text-purple-400 mt-4">Delegation Effectiveness:</h4>
        <p className="text-gray-300">
          Delegation effectiveness is a measure of how well tasks are being distributed and completed within your team. It's calculated based on:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Task Completion Rates:</strong> The percentage of delegated tasks completed on time.</li>
          <li><strong>Team Feedback:</strong> Satisfaction scores from team members about the tasks they've been assigned.</li>
          <li><strong>Productivity Improvements:</strong> Measurable increases in team output following task delegation.</li>
          <li><strong>Skill Development:</strong> How well delegation is contributing to team members' skill growth.</li>
        </ul>
        <p className="text-gray-300">
          The delegation effectiveness score helps you gauge how well you're utilizing your team's skills and capacity. A higher score indicates that tasks are being appropriately assigned, leading to better team performance and satisfaction.
        </p>
        <p className="text-gray-300 mt-4">
          Explore the different tabs to discover how Larridin can revolutionize your workday. If you have any questions, don't hesitate to ask your AI assistant!
        </p>
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
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">Larridin</h1>
      </div>
      <div className="flex flex-col items-stretch h-full space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 justify-start py-3 px-4 text-left hover:bg-gray-700 rounded-lg transition-colors duration-200 ${activeTab === tab.id ? 'bg-gray-700' : ''}`}
          >
            {tab.icon}
            <span className="text-sm font-medium text-gray-200">{tab.label}</span>
          </button>
        ))}
      </div>
    </>
  )

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="hidden md:block w-64 bg-gray-800 border-r border-gray-700 p-4">
        <SidebarContent />
      </aside>
      <div className="md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-20 bg-gray-800 p-2 rounded-md shadow-md"
        >
          <Menu className="h-6 w-6" />
        </button>
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsSidebarOpen(false)}>
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