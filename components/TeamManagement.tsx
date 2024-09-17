import React from 'react'
import TeamMemberProfile from './TeamMemberProfile'
import SkillGapAnalysis from './SkillGapAnalysis'

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