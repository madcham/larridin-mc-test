'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, CheckCircle, Clock, FileText, LayoutDashboard, Menu, MessageSquare, PieChart, Settings, Zap } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"

const LarridinApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [taskFilter, setTaskFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // ... (rest of the component code remains the same)

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <SidebarContent />
      </aside>
      <div className="md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-20 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
        >
          <Menu className="h-6 w-6" />
        </button>
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsSidebarOpen(false)}>
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 p-4" onClick={e => e.stopPropagation()}>
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