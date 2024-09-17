import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

interface TeamMemberProfileProps {
  member: TeamMember
}

const TeamMemberProfile: React.FC<TeamMemberProfileProps> = ({ member }) => {
  if (!member) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>No member data available</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  const { name, role, email, capacity, skills, bio, avatar } = member

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-gray-400">{role}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{bio}</p>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Contact:</h4>
          <p>{email}</p>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Capacity:</h4>
          <Progress value={capacity} className="w-full" />
          <p className="text-sm text-right mt-1">{capacity}%</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {skills && skills.map((skill, index) => (
              <span key={index} className="bg-purple-700 text-white px-2 py-1 rounded-full text-sm">
                {skill.name} (Level {skill.level})
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TeamMemberProfile