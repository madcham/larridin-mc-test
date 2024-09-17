'use client'

import React, { useState, useMemo } from 'react'
import { CheckCircle, Clock, FileText, LayoutDashboard, Menu, MessageSquare, PieChart, Info, BarChart, Lightbulb, ChevronDown, ChevronUp, Zap, Users, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import TeamManagement from './TeamManagement'

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
  role: string
  email: string
  capacity: number
  skills: { name: string; level: number }[]
  bio: string
  avatar: string
}

interface IntegrationSystem {
  id: string
  name: string
  icon: React.ReactNode
  isAuthenticated: boolean
  rules: string[]
}

export default function LarridinApp() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [delegationMessage, setDelegationMessage] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)
  const [isAIRecommendationsOpen, setIsAIRecommendationsOpen] = useState(true)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    teamCapacity: false,
    delegationEffectiveness: false,
  })

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

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Aisha Patel',
      role: 'Sales Manager',
      email: 'aisha@example.com',
      capacity: 75,
      skills: [
        { name: 'Sales', level: 5 },
        { name: 'Communication', level: 4 },
        { name: 'Project Management', level: 3 },
      ],
      bio: 'Aisha is an experienced sales manager with a track record of exceeding targets.',
      avatar: '/placeholder.svg?height=200&width=200',
    },
    {
      id: '2',
      name: 'Jamal Washington',
      role: 'Technical Lead',
      email: 'jamal@example.com',
      capacity: 90,
      skills: [
        { name: 'Programming', level: 5 },
        { name: 'System Design', level: 4 },
        { name: 'Project Management', level: 3 },
      ],
      bio: 'Jamal is a skilled technical lead with expertise in multiple programming languages and system design.',
      avatar: '/placeholder.svg?height=200&width=200',
    },
    {
      id: '3',
      name: 'Yuki Tanaka',
      role: 'UX Designer',
      email: 'yuki@example.com',
      capacity: 60,
      skills: [
        { name: 'UI Design', level: 5 },
        { name: 'User Research', level: 4 },
        { name: 'Prototyping', level: 4 },
      ],
      bio: 'Yuki is a creative UX designer passionate about creating intuitive and engaging user experiences.',
      avatar: '/placeholder.svg?height=200&width=200',
    },
    {
      id: '4',
      name: 'Sofia Rodriguez',
      role: 'Marketing Specialist',
      email: 'sofia@example.com',
      capacity: 85,
      skills: [
        { name: 'Digital Marketing', level: 5 },
        { name: 'Content Creation', level: 4 },
        { name: 'Analytics', level: 3 },
      ],
      bio: 'Sofia is a results-driven marketing specialist with a focus on digital strategies and content marketing.',
      avatar: '/placeholder.svg?height=200&width=200',
    },
  ])

  const [integrationSystems, setIntegrationSystems] = useState<IntegrationSystem[]>([
    { id: 'salesforce', name: 'Salesforce', icon: <BarChart className="w-6 h-6" />, isAuthenticated: false, rules: [] },
    { id: 'gmail', name: 'Gmail', icon: <MessageSquare className="w-6 h-6" />, isAuthenticated: false, rules: [] },
    { id: 'slack', name: 'Slack', icon: <MessageSquare className="w-6 h-6" />, isAuthenticated: false, rules: [] },
  ])

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
      case 'gmail': return 'bg-yellow-500 text-white'
      case 'calendar': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const handleFilterClick = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    )
  }

  const filterAndSortTasks = useMemo(() => {
    return (tasks: Task[]) => {
      if (activeFilters.length === 0) return tasks

      const filteredTasks = tasks.filter(task => 
        activeFilters.includes(task.suggestedTime) || 
        activeFilters.includes(task.source)
      )

      return filteredTasks.sort((a, b) => {
        const aMatchCount = activeFilters.filter(f => f === a.suggestedTime || f === a.source).length
        const bMatchCount = activeFilters.filter(f => f === b.suggestedTime || f === b.source).length
        return bMatchCount - aMatchCount
      })
    }
  }, [activeFilters])

  const handleAuthenticate = (systemId: string) => {
    setIntegrationSystems(prevSystems =>
      prevSystems.map(system =>
        system.id === systemId ? { ...system, isAuthenticated: true } : system
      )
    )
  }

  const handleToggleRule = (systemId: string, rule: string) => {
    setIntegrationSystems(prevSystems =>
      prevSystems.map(system =>
        system.id === systemId
          ? {
              ...system,
              rules: system.rules.includes(rule)
                ? system.rules.filter(r => r !== rule)
                : [...system.rules, rule]
            }
          : system
      )
    )
  }

  const handleImportTasks = () => {
    // Simulate task import
    const newTasks = integrationSystems.flatMap(system =>
      system.isAuthenticated && system.rules.length > 0
        ? [
            {
              id: `imported-${system.id}-${Date.now()}`,
              title: `Imported task from ${system.name}`,
              priority: 'Medium',
              deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              suggestedTime: '30min',
              source: system.id,
              waitedOn: false,
              linkedToGoals: false,
              assignedTo: null,
              completed: false,
              aiSuggestions: [`Review this task imported from ${system.name}`]
            }
          ]
        : []
    )

    setTasks(prevTasks => [...prevTasks, ...newTasks])
    alert(`Successfully imported ${newTasks.length} tasks!`)
  }

  const renderTaskList = (showDelegateButton: boolean = false) => (
    <div className="space-y-4">
      {filterAndSortTasks(tasks).map(task => (
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
                className="w-full justify-start text-left bg-purple-700 hover:bg-purple-600 text-white border-purple-500"
                onClick={() => handleRecommendationClick(task.id)}
              >
                <Zap className="mr-2 h-4 w-4" />
                AI Suggestions
                {selectedRecommendation === task.id ? <ChevronUp className="ml-auto h-4 w-4" /> : <ChevronDown className="ml-auto h-4 w-4" />}
              </Button>
              {selectedRecommendation === task.id && (
                <div className="mt-2 p-2 bg-gray-700 rounded-md border border-purple-500">
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
      <h3 
        className="text-xl font-bold text-purple-300 mb-4 flex items-center cursor-pointer"
        onClick={() => setExpandedSections(prev => ({ ...prev, teamCapacity: !prev.teamCapacity }))}
      >
        Team Capacity
        <Info className="w-4 h-4 ml-2 text-gray-400" />
        {expandedSections.teamCapacity ? <ChevronUp className="ml-auto h-4 w-4" /> : <ChevronDown className="ml-auto h-4 w-4" />}
      </h3>
      {expandedSections.teamCapacity && (
        <>
          <p className="text-sm text-gray-400 mb-4">Team capacity is calculated based on assigned tasks, working hours, and individual productivity factors.</p>
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
        </>
      )}
    </div>
  )

  const renderDelegationEffectiveness = () => (
    <div className="bg-gray-800 shadow-lg rounded-lg p-4 mb-6">
      <h3 
        className="text-xl font-bold text-purple-300 mb-4 flex items-center cursor-pointer"
        onClick={() => setExpandedSections(prev => ({ ...prev, delegationEffectiveness: !prev.delegationEffectiveness }))}
      >
        Delegation Effectiveness
        <Info className="w-4 h-4 ml-2 text-gray-400" />
        {expandedSections.delegationEffectiveness ? <ChevronUp className="ml-auto h-4 w-4" /> : <ChevronDown className="ml-auto h-4 w-4" />}
      </h3>
      {expandedSections.delegationEffectiveness && (
        <>
          <p className="text-sm text-gray-400 mb-4">Delegation effectiveness is measured by task completion rates, team feedback, and overall productivity improvements.</p>
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
        </>
      )}
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
                  <Button variant="ghost" size="sm" className="ml-2 p-0">
                    <Info className="w-4 h-4 text-gray-400" />
                  </Button>
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
      <div className="flex flex-wrap gap-2 mb-4">
        {['10min', '15min', '30min', '1h', '2h'].map(filter => (
          <Button
            key={filter}
            variant={activeFilters.includes(filter) ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterClick(filter)}
            className={activeFilters.includes(filter) ? "bg-purple-600 text-white" : "bg-gray-700 text-purple-300"}
          >
            {filter}
          </Button>
        ))}
        {['salesforce', 'gmail', 'slack', 'asana', 'email', 'calendar'].map(filter => (
          <Button
            key={filter}
            variant={activeFilters.includes(filter) ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterClick(filter)}
            className={activeFilters.includes(filter) ? "bg-blue-600 text-white" : "bg-gray-700 text-blue-300"}
          >
            {filter}
          </Button>
        ))}
      </div>
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

  const renderCalendar = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300">Calendar</h2>
      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date: Date | undefined) => date && setSelectedDate(date)}
          className="rounded-md border"
        />
      </div>
      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <h3 className="text-xl font-bold text-purple-300 mb-4">Tasks for {selectedDate.toDateString()}</h3>
        {renderTaskList(true)}
      </div>
    </div>
  )

  const renderTeam = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300">Team Management</h2>
      <TeamManagement teamMembers={teamMembers} />
    </div>
  )

  const renderIntegrations = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300">Integrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrationSystems.map(system => (
          <Card key={system.id} className="bg-gray-800 text-white border border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {system.icon}
                  <h3 className="text-xl font-semibold text-purple-300">{system.name}</h3>
                </div>
                <Button
                  variant={system.isAuthenticated ? "secondary" : "default"}
                  onClick={() => handleAuthenticate(system.id)}
                  disabled={system.isAuthenticated}
                >
                  {system.isAuthenticated ? 'Authenticated' : 'Authenticate'}
                </Button>
              </div>
              {system.isAuthenticated && (
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-purple-300">Import Rules</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={system.rules.includes('recent')}
                        onCheckedChange={() => handleToggleRule(system.id, 'recent')}
                      />
                      <label>All items from past 24 hours</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={system.rules.includes('highPriority')}
                        onCheckedChange={() => handleToggleRule(system.id, 'highPriority')}
                      />
                      <label>High priority items from past 48 hours</label>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={handleImportTasks} className="mt-4">
        Import Tasks
      </Button>
    </div>
  )

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
            <strong>Team:</strong> View detailed profiles of team members and analyze skill gaps within the team.
          </li>
          <li>
            <strong>Integrations:</strong> Connect and manage external tools and services to import tasks automatically.
          </li>
          <li>
            <strong>Delegation:</strong> When delegating a task, consider the team member's current capacity and skills. The app will show you each member's current workload to help you make informed decisions.
          </li>
          <li>
            <strong>AI Assistant:</strong> Pay attention to the AI Assistant's recommendations on the dashboard. It analyzes your workload across all platforms to provide optimized task lists.
          </li>
          <li>
            <strong>AI Suggestions:</strong> Check the AI Suggestions for each task to get personalized recommendations on how to approach and complete the task efficiently.
          </li>
        </ol>
      </div>
    </div>
  )

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, render: renderDashboard },
    { id: 'tasks', label: 'Tasks', icon: <CheckCircle className="w-5 h-5" />, render: renderTasks },
    { id: 'calendar', label: 'Calendar', icon: <FileText className="w-5 h-5" />, render: renderCalendar },
    { id: 'analytics', label: 'Analytics', icon: <PieChart className="w-5 h-5" />, render: renderAnalytics },
    { id: 'team', label: 'Team', icon: <Users className="w-5 h-5" />, render: renderTeam },
    { id: 'integrations', label: 'Integrations', icon: <Link className="w-5 h-5" />, render: renderIntegrations },
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