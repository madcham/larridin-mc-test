import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import TeamManagement from './TeamManagement'

interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
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

export default function LarridinApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Create project plan', description: 'Outline the project scope and timeline', status: 'todo' },
    { id: '2', title: 'Design user interface', description: 'Create wireframes and mockups', status: 'in-progress' },
    { id: '3', title: 'Implement backend API', description: 'Develop RESTful API endpoints', status: 'todo' },
    { id: '4', title: 'Write unit tests', description: 'Create comprehensive test suite', status: 'done' },
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

  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard()
      case 'tasks':
        return renderTasks()
      case 'calendar':
        return renderCalendar()
      case 'analytics':
        return renderAnalytics()
      case 'team':
        return <TeamManagement teamMembers={teamMembers} />
      case 'guide':
        return renderGuide()
      default:
        return null
    }
  }

  const renderDashboard = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Task Overview</h3>
          <p>Total Tasks: {tasks.length}</p>
          <p>To Do: {tasks.filter(task => task.status === 'todo').length}</p>
          <p>In Progress: {tasks.filter(task => task.status === 'in-progress').length}</p>
          <p>Done: {tasks.filter(task => task.status === 'done').length}</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderTasks = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tasks</h2>
      <ScrollArea className="h-[300px]">
        {tasks.map(task => (
          <Card key={task.id} className="mb-4">
            <CardContent>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-500">{task.description}</p>
              <p className="mt-2">Status: {task.status}</p>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  )

  const renderCalendar = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Calendar</h2>
      <Card>
        <CardContent>
          <p>Calendar component will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <Card>
        <CardContent>
          <p>Analytics component will be implemented here.</p>
        </CardContent>
      </Card>
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
            <ul className="list-disc list-inside ml-4 mt-2">
              <li><strong>Team Capacity:</strong> Shows each team member's current workload.</li>
              <li><strong>Skill Gap Analysis:</strong> Provides an overview of the team's collective skills and identifies potential areas for improvement.</li>
            </ul>
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

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <nav className="w-64 bg-gray-800 p-4">
        <ul className="space-y-2">
          {['dashboard', 'tasks', 'calendar', 'analytics', 'team', 'guide'].map((tab) => (
            <li key={tab}>
              <button
                className={`w-full text-left py-2 px-4 rounded ${activeTab === tab ? 'bg-purple-600' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  )
}