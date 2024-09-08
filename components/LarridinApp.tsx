import React, { useState, useEffect } from 'react'
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Calendar, CheckCircle, Clock, FileText, LayoutDashboard, Menu, MessageSquare, PieChart, Settings, Zap } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"

const LarridinApp: React.FC = () => {
  const [isClient, setIsClient] = useState(false)
  const [taskFilter, setTaskFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')

  useEffect(() => {
    setIsClient(true)
  }, [])

  // ... (rest of the component code remains unchanged)

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

export default LarridinApp