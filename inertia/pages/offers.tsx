"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"
import { Badge } from "~/components/ui/badge"
import { Slider } from "~/components/ui/slider"
import { Checkbox } from "~/components/ui/checkbox"
import { Label } from "~/components/ui/label"
import { Filter, Search } from "lucide-react"
import { JobCard } from "~/components/job_card"
import { DashboardHeader } from "~/components/dashboard_header"
import { DashboardShell } from "~/components/dashboard_shell"
import { Collapsible, CollapsibleContent } from "~/components/ui/collapsible"
import { usePage } from "@inertiajs/react"
import JobModel from "#models/job"

// Location options for filter
const locationOptions = [
  "Toutes les localisations",
  "Paris, France",
  "Lyon, France",
  "Bordeaux, France",
  "Nantes, France",
  "Lille, France",
  "Marseille, France",
  "Remote",
]

// Job type options for filter
const jobTypeOptions = ["Tous les types", "CDI", "CDD", "Freelance", "Stage", "Alternance"]

// Experience level options for filter
const experienceOptions = ["Toutes les expériences", "0-2 ans", "2-5 ans", "5-8 ans", "8+ ans"]

// Skill options for filter
const skillOptions = [
  "React",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Vue.js",
  "Angular",
  "Python",
  "Java",
  "C#",
  "PHP",
  "Ruby",
  "AWS",
  "Docker",
  "Kubernetes",
  "DevOps",
  "Machine Learning",
  "Data Science",
  "UX/UI Design",
]

export default function BrowseJobsPage() {
   const { props } = usePage()
    const recommendedJobs = props.recommendedJobs as JobModel[]

  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("Toutes les localisations")
  const [jobType, setJobType] = useState("Tous les types")
  const [experience, setExperience] = useState("Toutes les expériences")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState([30, 80])
  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const formattedJobs = recommendedJobs.map(job => {
    let skills = [];
    if (job.requiredSkills) {
      try {
        skills = JSON.parse(job.requiredSkills);
      } catch (e) {
        if (typeof job.requiredSkills === 'string') {
          skills = job.requiredSkills.split(',').map(s => s.trim());
        } else if (Array.isArray(job.requiredSkills)) {
          skills = job.requiredSkills;
        }
      }
    }
    const postedDate = new Date(job.createdAt.toString())
    const now = new Date()
    const diffDays = Math.round((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24))

    let postedAt = "Il y a "
    if (diffDays === 0) {
      postedAt += "aujourd'hui"
    } else if (diffDays === 1) {
      postedAt += "1 jour"
    } else if (diffDays < 7) {
      postedAt += `${diffDays} jours`
    } else if (diffDays < 30) {
      const weeks = Math.round(diffDays / 7)
      postedAt += `${weeks} ${weeks === 1 ? 'semaine' : 'semaines'}`
    } else {
      const months = Math.round(diffDays / 30)
      postedAt += `${months} ${months === 1 ? 'mois' : 'mois'}`
    }

    // Return the original job object with additional fields needed by JobCard
    return {
      ...job, // Keep all original properties
      employmentType: job.jobType, // Add employmentType based on jobType
      recruiter: { name: "Entreprise confidentielle" }, // Add required recruiter object
      // Additional properties for UI display
      postedAt,
      logo: "https://placehold.co/40x40",
      skills: Array.isArray(skills) ? skills : [],
      experience: "2-5 ans"
    }
  })

  const itemsPerPage = 5

  // Filter jobs based on all criteria
  const filteredJobs = formattedJobs.filter((job) => {
    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Location filter
    const matchesLocation = location === "Toutes les localisations" || job.location === location

    // Job type filter
    const matchesJobType = jobType === "Tous les types" || job.jobType === jobType

    // Experience filter
    const matchesExperience = experience === "Toutes les expériences" || job.experience === experience

    // Skills filter
    const matchesSkills = selectedSkills.length === 0 || selectedSkills.some((skill) => job.skills.includes(skill))

    // Salary filter (rough parsing of salary range)
    let jobSalaryMin = 0
    let jobSalaryMax = 0



    const matchesSalary =
      (jobSalaryMin === 0 && jobSalaryMax === 0) || // Handle case where salary info is missing
      (jobSalaryMin >= salaryRange[0] && jobSalaryMin <= salaryRange[1]) ||
      (jobSalaryMax >= salaryRange[0] && jobSalaryMax <= salaryRange[1])

    return matchesSearch && matchesLocation && matchesJobType && matchesExperience && matchesSkills && matchesSalary
  })

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "recent") {
      return a.postedAt.localeCompare(b.postedAt)
    } else if (sortBy === "salary-high") {
      const aSalaryMax = typeof a.salaryRange === 'string' ? Number.parseInt(a.salaryRange.split(" - ")[1]?.replace(/\D/g, "") || "0") : 0
      const bSalaryMax = typeof b.salaryRange === 'string' ? Number.parseInt(b.salaryRange.split(" - ")[1]?.replace(/\D/g, "") || "0") : 0
      return bSalaryMax - aSalaryMax
    } else if (sortBy === "salary-low") {
      const aSalaryMin = typeof a.salaryRange === 'string' ? Number.parseInt(a.salaryRange.split(" - ")[0]?.replace(/\D/g, "") || "0") : 0
      const bSalaryMin = typeof b.salaryRange === 'string' ? Number.parseInt(b.salaryRange.split(" - ")[0]?.replace(/\D/g, "") || "0") : 0
      return aSalaryMin - bSalaryMin
    }
    return 0
  })

  // Paginate jobs
  const paginatedJobs = sortedJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage)

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setLocation("Toutes les localisations")
    setJobType("Tous les types")
    setExperience("Toutes les expériences")
    setSelectedSkills([])
    setSalaryRange([30, 80])
    setSortBy("relevance")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Offres d'emploi recommandées"
        text="Offres basées sur votre profil et vos compétences"
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Filters - Desktop */}
        <Card className="hidden lg:block lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Filtres</span>
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                Réinitialiser
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Localisation</h3>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les localisations" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Type de contrat</h3>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Expérience</h3>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les expériences" />
                </SelectTrigger>
                <SelectContent>
                  {experienceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Salaire (K€)</h3>
              <div className="pt-2 px-2">
                <Slider value={salaryRange} min={30} max={100} step={5} onValueChange={setSalaryRange} />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>{salaryRange[0]}K €</span>
                  <span>{salaryRange[1]}K €</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Compétences</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {skillOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill}`}
                      checked={selectedSkills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <Label htmlFor={`skill-${skill}`} className="text-sm">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-9 space-y-6">
          {/* Search and Sort */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher par titre, entreprise ou mots-clés..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button type="submit">Rechercher</Button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden flex items-center gap-1"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="h-4 w-4" />
                    Filtres
                  </Button>

                  <div className="ml-2 flex items-center text-sm text-muted-foreground">
                    <span>{filteredJobs.length} résultats</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Pertinence</SelectItem>
                      <SelectItem value="recent">Plus récent</SelectItem>
                      <SelectItem value="salary-high">Salaire (décroissant)</SelectItem>
                      <SelectItem value="salary-low">Salaire (croissant)</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="hidden sm:flex border rounded-md">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      className="rounded-r-none"
                      onClick={() => setViewMode("grid")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-layout-grid"
                      >
                        <rect width="7" height="7" x="3" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="14" rx="1" />
                        <rect width="7" height="7" x="3" y="14" rx="1" />
                      </svg>
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      className="rounded-l-none"
                      onClick={() => setViewMode("list")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-list"
                      >
                        <line x1="8" x2="21" y1="6" y2="6" />
                        <line x1="8" x2="21" y1="12" y2="12" />
                        <line x1="8" x2="21" y1="18" y2="18" />
                        <line x1="3" x2="3.01" y1="6" y2="6" />
                        <line x1="3" x2="3.01" y1="12" y2="12" />
                        <line x1="3" x2="3.01" y1="18" y2="18" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Filters */}
          <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="lg:hidden">
            <CollapsibleContent>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Filtres</span>
                    <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                      Réinitialiser
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-location">Localisation</Label>
                      <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger id="mobile-location">
                          <SelectValue placeholder="Toutes les localisations" />
                        </SelectTrigger>
                        <SelectContent>
                          {locationOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile-job-type">Type de contrat</Label>
                      <Select value={jobType} onValueChange={setJobType}>
                        <SelectTrigger id="mobile-job-type">
                          <SelectValue placeholder="Tous les types" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-experience">Expérience</Label>
                      <Select value={experience} onValueChange={setExperience}>
                        <SelectTrigger id="mobile-experience">
                          <SelectValue placeholder="Toutes les expériences" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Salaire (K€)</Label>
                      <div className="pt-2 px-2">
                        <Slider value={salaryRange} min={30} max={100} step={5} onValueChange={setSalaryRange} />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>{salaryRange[0]}K €</span>
                          <span>{salaryRange[1]}K €</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Compétences</Label>
                    <div className="flex flex-wrap gap-2">
                      {skillOptions.slice(0, 10).map((skill) => (
                        <Badge
                          key={skill}
                          variant={selectedSkills.includes(skill) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                      <Badge variant="outline">+{skillOptions.length - 10}</Badge>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setIsFilterOpen(false)}>Appliquer les filtres</Button>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          {/* Job Listings */}
          {paginatedJobs.length > 0 ? (
            <div
              className={`space-y-4 ${viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" : "space-y-4"}`}
            >
              {paginatedJobs.map((job) => (
                <JobCard key={job.jobId} job={
                    {
                      ...job,
                      matchScore: job.$extras?.matchScore || 0,
                      recruiter: {
                        name: job.recruiter?.companyName,
                        company: job.recruiter?.companyName,
                        logo: "https://placehold.co/40x40",
                      }
                    }
                  } />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Aucune offre trouvée</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Aucune offre ne correspond à vos critères de recherche. Essayez d'élargir vos filtres.
                </p>
                <Button onClick={handleClearFilters}>Réinitialiser les filtres</Button>
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(index + 1)
                      }}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
