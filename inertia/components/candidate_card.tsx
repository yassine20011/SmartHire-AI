"use client"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { MapPin, Star } from "lucide-react"
import { Link } from "@inertiajs/react"

interface CandidateCardProps {
  candidate: {
    id: string
    name: string
    title: string
    location: string
    experience: string
    skills: string[]
    matchScore: number
    avatar: string
  }
  onInterviewRequest?: () => void
}

export function CandidateCard({ candidate, onInterviewRequest }: CandidateCardProps) {
  return (
    <div className="flex items-start space-x-4 rounded-md border p-4">
      <img
        src={candidate.avatar || "/placeholder.svg"}
        alt={candidate.name}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium leading-none">
              <Link href={`/candidate/${candidate.id}`} className="hover:underline">
                {candidate.name}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">{candidate.title}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{candidate.matchScore}%</span>
          </div>
        </div>
        <div className="flex items-center gap-1 pt-1">
          <MapPin className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{candidate.location}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{candidate.experience} d'expérience</span>
        </div>
        <div className="flex flex-wrap gap-1 pt-2">
          {candidate.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs font-normal">
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 3 && (
            <Badge variant="outline" className="text-xs font-normal">
              +{candidate.skills.length - 3}
            </Badge>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Button size="sm" asChild>
          <Link href={`/candidate/${candidate.id}`}>Voir profil</Link>
        </Button>
        {onInterviewRequest && (
          <Button size="sm" variant="outline" onClick={onInterviewRequest}>
            Entretien
          </Button>
        )}
      </div>
    </div>
  )
}

