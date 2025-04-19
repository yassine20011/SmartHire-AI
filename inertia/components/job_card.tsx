import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Building2, MapPin, Star } from "lucide-react"
import { Link } from "lucide-react"

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    type: string
    salary?: string
    matchScore: number
    postedAt: string
    logo: string
  }
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="flex items-start space-x-4 rounded-md border p-4">
      <img src={job.logo || "/placeholder.svg"} alt={job.company} width={40} height={40} className="rounded-md" />
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium leading-none">
              <Link href={`/jobs/${job.id}`} className="hover:underline">
                {job.title}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{job.matchScore}%</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1">
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            {job.location}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Building2 className="mr-1 h-3 w-3" />
            {job.type}
          </div>
          {job.salary && (
            <Badge variant="outline" className="text-xs font-normal">
              {job.salary}
            </Badge>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Button size="sm" asChild>
          <Link href={`/jobs/${job.id}`}>Postuler</Link>
        </Button>
        <p className="text-xs text-muted-foreground">{job.postedAt}</p>
      </div>
    </div>
  )
}

