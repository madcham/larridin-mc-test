import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

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
        <CardTitle>Team Skill Gap Analysis</CardTitle>
      </CardHeader>
      <CardContent>
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