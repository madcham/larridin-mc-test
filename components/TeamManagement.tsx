import React from 'react'
import TeamMemberProfile from './TeamMemberProfile'
import SkillGapAnalysis from './SkillGapAnalysis'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Info } from "lucide-react"

interface Skill {
  name: string
  level: number
}

interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  capacity: number
  skills: Skill[]
  bio: string
  avatar: string
}

interface TeamManagementProps {
  teamMembers: TeamMember[]
}

const TeamManagement: React.FC<TeamManagementProps> = ({ teamMembers }) => {
  const [isCapacityExpanded, setIsCapacityExpanded] = React.useState(false)

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-purple-300">Team Management</h2>
        <p className="text-gray-400">No team members data available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-300">Team Management</h2>
      
      <Collapsible open={isCapacityExpanded} onOpenChange={setIsCapacityExpanded}>
        <div className="flex items-center space-x-2 mb-4">
          <h3 className="text-xl font-semibold text-purple-200">Team Capacity</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Team capacity represents the workload of each team member.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isCapacityExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <p className="text-gray-400 mb-4">
            Team capacity is calculated based on assigned tasks, working hours, and individual productivity factors. 
            A higher percentage indicates a heavier workload.
          </p>
        </CollapsibleContent>
      </Collapsible>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map(member => (
          <TeamMemberProfile key={member.id} member={member} />
        ))}
      </div>
      <SkillGapAnalysis teamMembers={teamMembers} />
    </div>
  )
}

export default TeamManagement