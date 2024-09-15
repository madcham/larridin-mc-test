'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, CheckCircle, Clock, FileText, LayoutDashboard, Menu, MessageSquare, PieChart, Settings, Users, Info, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import AINotifications from "./AINotifications"
import * as Collapsible from '@radix-ui/react-collapsible'

const LarridinApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [openTooltip, setOpenTooltip] = useState<string | null>(null)

  useEffect(() => {
    console.log('LarridinApp component mounted')
  }, [])

  const handleTabClick = (tabId: string) => {
    console.log('Tab clicked:', tabId)
    setActiveTab(tabId)
    console.log('Active tab set to:', tabId)
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
          </div>
          <AINotifications taskId={task.id} taskTitle={task.title} />
        </div>
      ))}
    </div>
  )

  const renderTeamCapacity = () => (
    <div className="bg-gray-800 shadow-lg rounded-lg p-4 mb-6">
      <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
        Team Capacity
        <Collapsible.Root open={openTooltip === 'teamCapacity'} onOpenChange={(open) => setOpenTooltip(open ? 'teamCapacity' : null)}>
          <Collapsible.Trigger asChild>
            <Button variant="ghost" size="sm" className="ml-2 p-0">
              <Info className="w-4 h-4 text-gray-400" />
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content className="mt-2 p-2 bg-gray-700 rounded-md text-sm">
            Team capacity is calculated based on assigned tasks, working hours, and individual productivity factors.
          </Collapsible.Content>
        </Collapsible.Root>
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
      