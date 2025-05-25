import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Building2, MapPin, Star } from "lucide-react"
import { Link } from "@inertiajs/react"
import { DateTime } from "luxon"

interface JobCardProps {
  job: {
    jobId: number
    title: string
    description: string
    location: string
    jobType: string
    employmentType: string
    salaryRange?: string
    matchScore?: number
    createdAt: string | DateTime
    recruiter: {
      name?: string
      company?: string
      logo?: string
    }
  }
}

export function JobCard({ job }: JobCardProps) {
  const formatCreatedAt = (createdAt: string | DateTime | undefined) => {
    if (!createdAt) return "Recently";
    if (typeof createdAt === 'string') return createdAt;
    if (createdAt instanceof DateTime) return createdAt.toRelative();
    return String(createdAt);
  };

  return (
    <div className="flex items-start space-x-4 rounded-md border p-4">
      <img
        src={job.recruiter?.logo || "/placeholder.svg"}
        alt={job.recruiter?.company || "Company"}
        width={40}
        height={40}
        className="rounded-md"
      />
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium leading-none">
              <Link href={`/jobs/${job.jobId}`} className="hover:underline">
                {job.title}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">{job.recruiter?.company || job.recruiter?.name}</p>
          </div>
          {job.matchScore !== undefined && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{job.matchScore}%</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1">
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            {job.location}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Building2 className="mr-1 h-3 w-3" />
            {job.jobType} • {job.employmentType}
          </div>
          {job.salaryRange && (
            <Badge variant="outline" className="text-xs font-normal">
              {`${job.salaryRange.split("-")[0]}MAD - ${job.salaryRange.split("-")[1]}MAD`}
            </Badge>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Button size="sm" asChild>
          <Link href={`/jobs/${job.jobId}`}>Postuler</Link>
        </Button>
        <p className="text-xs text-muted-foreground">
          {formatCreatedAt(job.createdAt)}
        </p>
      </div>
    </div>
  )
}

