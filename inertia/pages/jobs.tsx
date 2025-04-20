"use client"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Building2, Calendar, Clock, DollarSign, MapPin, Share2, Users } from "lucide-react"
import { CandidateCard } from "~/components/candidate_card"
import { DashboardHeader } from "~/components/dashboard_header"
import { DashboardShell } from "~/components/dashboard_shell"
import { InterviewModal } from "~/components/interview_modal"
import { useState } from "react"

// Mock data
const jobDetails = {
  id: "1",
  title: "Développeur Frontend React",
  company: "Tech Solutions",
  location: "Paris, France",
  type: "CDI",
  salary: "45K - 60K €",
  postedAt: "Il y a 2 semaines",
  applicants: 12,
  description: `
    <p>Nous recherchons un développeur Frontend React talentueux pour rejoindre notre équipe dynamique.</p>
    <h3>Responsabilités :</h3>
    <ul>
      <li>Développer des interfaces utilisateur réactives et intuitives</li>
      <li>Collaborer avec les designers et les développeurs backend</li>
      <li>Optimiser les applications pour des performances maximales</li>
      <li>Assurer la qualité du code par des tests unitaires</li>
    </ul>
    <h3>Avantages :</h3>
    <ul>
      <li>Horaires flexibles et télétravail partiel</li>
      <li>Environnement de travail stimulant</li>
      <li>Formation continue et conférences</li>
      <li>Mutuelle d'entreprise</li>
    </ul>
  `,
  requirements: `
    <h3>Compétences requises :</h3>
    <ul>
      <li>Maîtrise de React.js et de l'écosystème JavaScript moderne</li>
      <li>Expérience avec TypeScript et les frameworks CSS modernes</li>
      <li>Connaissance des bonnes pratiques de développement web</li>
      <li>Capacité à travailler en équipe et à communiquer efficacement</li>
    </ul>
    <h3>Expérience :</h3>
    <ul>
      <li>Minimum 3 ans d'expérience en développement frontend</li>
      <li>Portfolio de projets React démontrant vos compétences</li>
    </ul>
  `,
  logo: "/placeholder.svg?height=80&width=80",
}

const recommendedCandidates = [
  {
    id: "1",
    name: "Sophie Martin",
    title: "Développeuse Frontend React",
    location: "Paris, France",
    experience: "4 ans",
    skills: ["React", "TypeScript", "CSS", "HTML"],
    matchScore: 95,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jean Dupont",
    title: "Développeur Full Stack JavaScript",
    location: "Lyon, France",
    experience: "6 ans",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    matchScore: 88,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)

  const openInterviewModal = (candidateId: string) => {
    setSelectedCandidate(candidateId)
    setIsInterviewModalOpen(true)
  }

  return (
    <DashboardShell userType="recruiter">
      <DashboardHeader heading={jobDetails.title} text={`${jobDetails.company} • ${jobDetails.location}`}>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
          <Button size="sm">Modifier l'offre</Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-4">
          <CardHeader>
            <div className="flex items-start gap-4">
              <img
                src={jobDetails.logo || "/placeholder.svg"}
                alt={jobDetails.company}
                width={80}
                height={80}
                className="rounded-md"
              />
              <div>
                <CardTitle>{jobDetails.title}</CardTitle>
                <CardDescription className="flex flex-col gap-1 mt-1">
                  <div className="flex items-center">
                    <Building2 className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{jobDetails.company}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{jobDetails.location}</span>
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {jobDetails.type}
                </Badge>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {jobDetails.salary}
                </Badge>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {jobDetails.postedAt}
                </Badge>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {jobDetails.applicants} candidats
                </Badge>
              </div>
            </div>

            <Tabs defaultValue="description">
              <TabsList className="mb-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="requirements">Prérequis</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <div dangerouslySetInnerHTML={{ __html: jobDetails.description }} />
              </TabsContent>
              <TabsContent value="requirements">
                <div dangerouslySetInnerHTML={{ __html: jobDetails.requirements }} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-7 md:col-span-3">
          <CardHeader>
            <CardTitle>Candidats recommandés</CardTitle>
            <CardDescription>
              Notre IA a trouvé {recommendedCandidates.length} candidats correspondant à votre offre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onInterviewRequest={() => openInterviewModal(candidate.id)}
                />
              ))}
              <Button variant="outline" className="w-full">
                Voir tous les candidats
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <InterviewModal
        isOpen={isInterviewModalOpen}
        onClose={() => setIsInterviewModalOpen(false)}
        candidateId={selectedCandidate}
        jobId={params.id}
      />
    </DashboardShell>
  )
}

