import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, CheckCircle, Clock, FileText, LayoutDashboard, Menu, MessageSquare, PieChart, Settings, Zap } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function LarridinApp() {
  const [taskFilter, setTaskFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')

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

  const getSourceColor = (source) => {
    switch (source) {
      case 'salesforce': return 'bg-blue-500 text-white'
      case 'slack': return 'bg-purple-500 text-white'
      case 'gmail': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getTaskSuggestions = (task) => {
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
    <ScrollArea className="h-[calc(100vh-280px)] pr-4">
      <div className="space-y-4">
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-none hover:from-purple-600 hover:to-blue-600">
                      <Zap className="w-4 h-4 mr-2" />
                      AI Suggestions
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 border-none">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-purple-700 dark:text-purple-300">{task.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {getTaskSuggestions(task).map((suggestion, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                          <span className="text-2xl">{suggestion.emoji}</span>
                          <span className="text-gray-800 dark:text-gray-200">{suggestion.text}</span>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
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

  const renderTasks = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300">Task Manager 📋</h2>
      <ScrollArea className="w-full" orientation="horizontal">
        <div className="flex space-x-2 mb-4 pb-2">
          {taskFilters.map(filter => (
            <Button
              key={filter.id}
              variant={taskFilter === filter.id ? "default" : "outline"}
              onClick={() => setTaskFilter(filter.id)}
              className={`${taskFilter === filter.id ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-white dark:bg-gray-800'} rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 hover:shadow-lg whitespace-nowrap`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="w-full" orientation="horizontal">
        <div className="flex space-x-2 mb-4 pb-2">
          {platformFilters.map(filter => (
            <Button
              key={filter.id}
              variant={platformFilter === filter.id ? "default" : "outline"}
              onClick={() => setPlatformFilter(filter.id)}
              className={`${platformFilter === filter.id ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-white dark:bg-gray-800'} rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 hover:shadow-lg whitespace-nowrap`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
      {renderTaskList()}
    </div>
  )

  const renderCalendar = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300">Smart Calendar 📅</h2>
      <Card className="bg-gradient-to-br from-purple-400 to-blue-500 text-white border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Settings className="w-6 h-6" />
            AI Calendar Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">I've identified optimal time slots for your tasks based on your work patterns and priorities.</p>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-700 dark:text-purple-300">Today's Optimized Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: '9:00 AM - 9:30 AM', task: 'Respond to team query', color: 'bg-green-500 text-white' },
              { time: '10:00 AM - 10:15 AM', task: 'Follow up with lead', color: 'bg-blue-500 text-white' },
              { time: '11:00 AM - 11:30 AM', task: 'Review Q2 report', color: 'bg-purple-500 text-white' },
              { time: '2:00 PM - 2:15 PM', task: 'Share project update', color: 'bg-yellow-500 text-white' },
              { time: '3:30 PM - 3:45 PM', task: 'Update sales pipeline', color: 'bg-red-500 text-white' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <span className="font-medium text-gray-800 dark:text-gray-200 mb-2 sm:mb-0">{item.time}</span>
                <Badge className={`${item.color} text-sm font-semibold px-3 py-1`}>{item.task}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300">Analytics</h2>
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardContent className="pt-6">
          <p className="text-lg text-gray-600 dark:text-gray-300">This is a placeholder for the Analytics content.</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderGuide = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300">User Guide</h2>
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-300">Welcome to Larridin!</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Larridin is your AI-powered personal assistant, designed to help you manage tasks, optimize your schedule, and boost your productivity across various platforms.
          </p>
          <h4 className="text-lg font-semibold text-purple-500 dark:text-purple-400">Key Features:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
            <li><strong>Smart Task Management:</strong> Organize and prioritize tasks from different platforms in one place.</li>
            <li><strong>AI-Powered Suggestions:</strong> Get intelligent recommendations for tackling your tasks efficiently.</li>
            <li><strong>Calendar Optimization:</strong> Let AI help you schedule your day for maximum productivity.</li>
            <li><strong>Cross-Platform Integration:</strong> Seamlessly manage tasks from Salesforce, Slack, Gmail, and more.</li>
            <li><strong>Productivity Analytics:</strong> Gain insights into your work patterns and improve your efficiency.</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300">
            Explore the different tabs to discover how Larridin can revolutionize your workday. If you have any questions, don't hesitate to ask your AI assistant!
          </p>
        </CardContent>
      </Card>
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
      <TabsList className="flex flex-col items-stretch h-full space-y-2">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="justify-start py-3 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <div className="flex items-center gap-3">
              {tab.icon}
              <span className="text-sm font-medium">{tab.label}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </>
  )

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <Tabs defaultValue="dashboard" className="flex w-full">
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <SidebarContent />
        </aside>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="absolute top-4 left-4 md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-white dark:bg-gray-800 p-4">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
          <TabsContent value="tasks">{renderTasks()}</TabsContent>
          <TabsContent value="calendar">{renderCalendar()}</TabsContent>
          <TabsContent value="analytics">{renderAnalytics()}</TabsContent>
          <TabsContent value="guide">{renderGuide()}</TabsContent>
        </main>
      </Tabs>
    </div>
  )
}
