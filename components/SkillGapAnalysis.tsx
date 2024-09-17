import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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

interface SkillGapAnalysisProps {
  teamMembers: TeamMember[]
}

const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({ teamMembers }) => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Skill Gap Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No team members data available for analysis.</p>
        </CardContent>
      </Card>
    )
  }

  const allSkills = Array.from(new Set(teamMembers.flatMap(member => member.skills.map(skill => skill.name))))
  const averageSkillLevels = allSkills.map(skill => {
    const levels = teamMembers.map(member => member.skills.find(s => s.name === skill)?.level || 0)
    const average = levels.reduce((sum, level) => sum + level, 0) / teamMembers.length
    return { name: skill, level: average }
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <CardTitle>Team Skill Gap Analysis</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Analyzes the average skill levels across the team.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
      </CardHeader>
      <CardContent>
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent>
            <p className="text-gray-400 mb-4">
              This analysis helps identify areas where the team excels and where there might be skill gaps. 
              Each skill is rated on a scale of 1 to 5, with 5 being the highest level of expertise.
            </p>
          </CollapsibleContent>
        </Collapsible>
        <div className="space-y-4">
          {averageSkillLevels.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{skill.name}</span>
                <span>{skill.level.toFixed(1)}/5</span>
              </div>
              <Progress value={skill.level * 20} className="w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SkillGapAnalysis