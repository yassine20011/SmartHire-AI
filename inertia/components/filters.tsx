"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command"
import { Check, Filter, X } from "lucide-react"
import { cn } from "~/lib/utils"

// Mock data for skills
const skillOptions = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "HTML",
  "CSS",
  "Vue.js",
  "Angular",
  "Next.js",
  "Express",
  "MongoDB",
  "SQL",
  "GraphQL",
  "AWS",
  "Docker",
]

// Mock data for locations
const locationOptions = [
  "Paris",
  "Lyon",
  "Marseille",
  "Bordeaux",
  "Lille",
  "Toulouse",
  "Nantes",
  "Strasbourg",
  "Remote",
]

// Mock data for experience levels
const experienceOptions = [
  { value: "0-1", label: "0-1 an" },
  { value: "1-3", label: "1-3 ans" },
  { value: "3-5", label: "3-5 ans" },
  { value: "5-10", label: "5-10 ans" },
  { value: "10+", label: "10+ ans" },
]

interface FiltersProps {
  filters: {
    skills: string[]
    location: string
    experience: string
  }
  setFilters: (filters: any) => void
}

export function Filters({ filters, setFilters }: FiltersProps) {
  const [skillsOpen, setSkillsOpen] = useState(false)

  const handleSkillSelect = (skill: string) => {
    if (filters.skills.includes(skill)) {
      setFilters({
        ...filters,
        skills: filters.skills.filter((s) => s !== skill),
      })
    } else {
      setFilters({
        ...filters,
        skills: [...filters.skills, skill],
      })
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFilters({
      ...filters,
      skills: filters.skills.filter((s) => s !== skill),
    })
  }

  const handleLocationChange = (location: string) => {
    setFilters({
      ...filters,
      location,
    })
  }

  const handleExperienceChange = (experience: string) => {
    setFilters({
      ...filters,
      experience,
    })
  }

  const handleClearFilters = () => {
    setFilters({
      skills: [],
      location: "",
      experience: "",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Popover open={skillsOpen} onOpenChange={setSkillsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-9 border-dashed">
              <Filter className="mr-2 h-4 w-4" />
              Compétences
              {filters.skills.length > 0 && (
                <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                  {filters.skills.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Rechercher une compétence..." />
              <CommandList>
                <CommandEmpty>Aucun résultat.</CommandEmpty>
                <CommandGroup>
                  {skillOptions.map((skill) => (
                    <CommandItem key={skill} value={skill} onSelect={() => handleSkillSelect(skill)}>
                      <Check
                        className={cn("mr-2 h-4 w-4", filters.skills.includes(skill) ? "opacity-100" : "opacity-0")}
                      />
                      {skill}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Select value={filters.location} onValueChange={handleLocationChange}>
          <SelectTrigger className="h-9 w-[180px]">
            <SelectValue placeholder="Localisation" />
          </SelectTrigger>
          <SelectContent>
            {locationOptions.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.experience} onValueChange={handleExperienceChange}>
          <SelectTrigger className="h-9 w-[180px]">
            <SelectValue placeholder="Expérience" />
          </SelectTrigger>
          <SelectContent>
            {experienceOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(filters.skills.length > 0 || filters.location || filters.experience) && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-9 px-2 lg:px-3">
            Réinitialiser
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {filters.skills.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {filters.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="rounded-sm">
              {skill}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => handleRemoveSkill(skill)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Supprimer {skill}</span>
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

