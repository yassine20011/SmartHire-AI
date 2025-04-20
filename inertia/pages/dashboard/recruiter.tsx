"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Badge } from "~/components/ui/badge"
import { BarChart, Briefcase, Building2, FileText, Plus, Search, Users } from "lucide-react"
import { Link } from "@inertiajs/react"
import { CandidateCard } from "~/components/candidate_card"
import { DashboardHeader } from "~/components/dashboard_header"
import { DashboardShell } from "~/components/dashboard_shell"
import { Filters } from "~/components/filters"

// Mock data
const activeJobs = [
  {
    id: "1",
    title: "Développeur Frontend React",
    location: "Paris, France",
    type: "CDI",
    applicants: 12,
    postedAt: "Il y a 2 semaines",
  },
  {
    id: "2",
    title: "Développeur Full Stack JavaScript",
    location: "Lyon, France",
    type: "CDI",
    applicants: 8,
    postedAt: "Il y a 1 semaine",
  },
]

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
  {
    id: "3",
    name: "Marie Leroy",
    title: "Développeuse Frontend Vue.js",
    location: "Bordeaux, France",
    experience: "3 ans",
    skills: ["Vue.js", "JavaScript", "CSS", "Sass"],
    matchScore: 82,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState("candidates")
  const [filters, setFilters] = useState({
    skills: [],
    location: "",
    experience: "",
  })

  return (
    <DashboardShell userType="recruiter">
      <DashboardHeader heading="Tableau de bord recruteur" text="Bienvenue sur votre espace recruteur SmartHire AI">
        <Button asChild>
          <Link href="/jobs/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle offre
          </Link>
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offres actives</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs.length}</div>
            <p className="text-xs text-muted-foreground mt-2">+1 depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidats potentiels</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-2">+8 depuis la semaine dernière</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entretiens planifiés</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-2">3 cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24%</div>
            <p className="text-xs text-muted-foreground mt-2">+5% depuis le mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Vos offres d'emploi</CardTitle>
                <CardDescription>Gérez vos offres d'emploi actives</CardDescription>
              </div>
              <Button asChild>
                <Link href="/jobs/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle offre
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {activeJobs.length > 0 ? (
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-1">
                      <Link href={`/jobs/${job.id}`} className="font-medium hover:underline">
                        {job.title}
                      </Link>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Building2 className="mr-1 h-3 w-3" />
                        <span>{job.location}</span>
                        <span className="mx-2">•</span>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{job.applicants} candidats</p>
                        <p className="text-xs text-muted-foreground">{job.postedAt}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/jobs/${job.id}`}>Voir</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground">Vous n'avez pas encore d'offres d'emploi</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/jobs/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer une offre
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Candidats</CardTitle>
            <CardDescription>Découvrez les candidats recommandés et les candidatures reçues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Filters filters={filters} setFilters={setFilters} />
            </div>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="candidates">Recommandés</TabsTrigger>
                <TabsTrigger value="applications">Candidatures</TabsTrigger>
              </TabsList>

              <TabsContent value="candidates" className="space-y-4">
                {recommendedCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
                <Button variant="outline" className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Rechercher plus de candidats
                </Button>
              </TabsContent>

              <TabsContent value="applications">
                <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">Aucune candidature pour le moment</p>
                  <Button variant="link" className="mt-2" asChild>
                    <Link href="#candidates">Voir les candidats recommandés</Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

