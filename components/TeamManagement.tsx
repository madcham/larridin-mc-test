import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  teamMembers?: TeamMember[]
}

const TeamManagement: React.FC<TeamManagementProps> = ({ teamMembers = [] }) => {
  const [expandedMember, setExpandedMember] = useState<string | null>(null)

  const toggleMemberExpansion = (memberId: string) => {
    setExpandedMember(expandedMember === memberId ? null : memberId)
  }

  const calculateTeamSkills = () => {
    const skillMap: { [key: string]: number[] } = {}
    teamMembers.forEach(member => {
      member.skills.forEach(skill => {
        if (!skillMap[skill.name]) {
          skillMap[skill.name] = []
        }
        skillMap[skill.name].push(skill.level)
      })
    })
    return Object.entries(skillMap).map(([name, levels]) => ({
      name,
      averageLevel: levels.reduce((a, b) => a + b, 0) / levels.length
    }))
  }

  const teamSkills = calculateTeamSkills()

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <Card className="bg-gray-800 text-white">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-4 text-purple-300">Team Management</h3>
          <p className="text-gray-400">No team members data available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map(member => (
          <Card key={member.id} className="bg-gray-800 text-white border border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-purple-300">{member.name}</h3>
                  <p className="text-gray-400">{member.role}</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-400">Capacity</span>
                  <span className="text-sm font-medium text-gray-400">{member.capacity}%</span>
                </div>
                <Progress value={member.capacity} className="w-full bg-gray-700" indicatorClassName="bg-purple-500" />
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2 text-purple-300">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map(skill => (
                    <Badge key={skill.name} variant="secondary" className="bg-purple-700 text-purple-100">
                      {skill.name} (Level {skill.level})
                    </Badge>
                  ))}
                </div>
              </div>
              <button
                className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                onClick={() => toggleMemberExpansion(member.id)}
              >
                {expandedMember === member.id ? 'Hide Details' : 'Show Details'}
              </button>
              {expandedMember === member.id && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2 text-purple-300">Bio</h4>
                  <p className="text-gray-400">{member.bio}</p>
                  <h4 className="text-lg font-semibold mt-4 mb-2 text-purple-300">Contact</h4>
                  <p className="text-gray-400">{member.email}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-gray-800 text-white border border-purple-500">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-4 text-purple-300">Team Skill Gap Analysis</h3>
          <p className="text-gray-400 mb-4">
            This analysis shows the average skill level across the team for each skill. 
            It helps identify areas where the team excels and potential gaps that may need addressing.
          </p>
          <div className="space-y-4">
            {teamSkills.map(skill => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-400">{skill.name}</span>
                  <span className="text-sm font-medium text-gray-400">
                    {skill.averageLevel.toFixed(1)}
                  </span>
                </div>
                <Progress value={skill.averageLevel * 20} className="w-full bg-gray-700" indicatorClassName="bg-purple-500" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TeamManagement