"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Badge } from "~/components/ui/badge"
import { Progress } from "~/components/ui/progress"
import { Briefcase, Building2, FileText, MapPin, Star, User } from "lucide-react"
import {Link} from "@inertiajs/react"
import { JobCard } from "~/components/job_card"
import { DashboardHeader } from "~/components/dashboard_header"
import { DashboardShell } from "~/components/dashboard_shell"

// Mock data
const recommendedJobs = [
  {
    id: "1",
    title: "Développeur Frontend React",
    company: "Tech Solutions",
    location: "Paris, France",
    type: "CDI",
    salary: "45K - 60K €",
    matchScore: 95,
    postedAt: "Il y a 2 jours",
    logo: "https://placehold.co/40x40",
  },
  {
    id: "2",
    title: "Développeur Full Stack JavaScript",
    company: "Digital Agency",
    location: "Lyon, France",
    type: "CDI",
    salary: "50K - 65K €",
    matchScore: 88,
    postedAt: "Il y a 3 jours",
    logo: "https://placehold.co/40x40",
  },
  {
    id: "3",
    title: "Ingénieur Frontend Vue.js",
    company: "StartupXYZ",
    location: "Remote",
    type: "CDI",
    salary: "40K - 55K €",
    matchScore: 82,
    postedAt: "Il y a 1 semaine",
    logo: "https://placehold.co/40x40",
  },
]

const applications = [
  {
    id: "1",
    title: "Développeur Frontend React",
    company: "Tech Solutions",
    location: "Paris, France",
    status: "Entretien",
    appliedAt: "Il y a 1 semaine",
    logo: "https://placehold.co/40x40",
  },
  {
    id: "2",
    title: "Développeur Full Stack JavaScript",
    company: "Digital Agency",
    location: "Lyon, France",
    status: "En attente",
    appliedAt: "Il y a 2 semaines",
    logo: "https://placehold.co/40x40",
  },
]

const profileCompleteness = 75

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("recommended")

  return (
    <DashboardShell userType="candidate">
      <DashboardHeader heading="Tableau de bord candidat" text="Bienvenue sur votre espace personnel SmartHire AI" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profil complété</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileCompleteness}%</div>
            <Progress value={profileCompleteness} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Complétez votre profil pour augmenter vos chances</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offres consultées</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-2">+12 depuis la semaine dernière</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidatures</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-2">2 en attente d'entretien</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-3">
          <CardHeader>
            <CardTitle>Votre profil</CardTitle>
            <CardDescription>Informations personnelles et professionnelles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-24 w-24">
                <img
                  src="https://placehold.co/96x96"
                  alt="Avatar"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="space-y-1 text-center">
                <h3 className="text-xl font-bold">Thomas Dubois</h3>
                <p className="text-sm text-muted-foreground">Développeur Full Stack</p>
              </div>
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Expérience</span>
                  </div>
                  <span className="text-sm font-medium">5 ans</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Localisation</span>
                  </div>
                  <span className="text-sm font-medium">Paris, France</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Compétences clés</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>React</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Node.js</Badge>
                  <Badge>Express</Badge>
                  <Badge>MongoDB</Badge>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href="/settings">Modifier le profil</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-7 md:col-span-4">
          <CardHeader>
            <CardTitle>Offres d'emploi</CardTitle>
            <CardDescription>Découvrez les offres recommandées et suivez vos candidatures</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="recommended">Recommandées</TabsTrigger>
                <TabsTrigger value="applications">Candidatures</TabsTrigger>
              </TabsList>

              <TabsContent value="recommended" className="space-y-4">
                {recommendedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
                <Button variant="outline" className="w-full">
                  Voir plus d'offres
                </Button>
              </TabsContent>

              <TabsContent value="applications">
                {applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div key={application.id} className="flex items-center space-x-4 rounded-md border p-4">
                        <img
                          src={application.logo || "https://placehold.co/40x40"}
                          alt={application.company}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <div className="flex-1 space-y-1">
                          <p className="font-medium leading-none">{application.title}</p>
                          <p className="text-sm text-muted-foreground">{application.company}</p>
                          <div className="flex items-center pt-1">
                            <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{application.location}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant={application.status === "Entretien" ? "default" : "secondary"}>
                            {application.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{application.appliedAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">Vous n'avez pas encore de candidatures</p>
                    <Button variant="link" className="mt-2" asChild>
                      <Link href="#recommended">Découvrir des offres</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

