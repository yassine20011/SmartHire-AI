"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Checkbox } from "~/components/ui/checkbox"
import { ArrowLeft, Github, Linkedin } from "lucide-react"
import { Link, useForm, router } from '@inertiajs/react'
import { z } from "zod"
import { usePage } from "@inertiajs/react"

type FormField = {
  id: string
  label: string
  type: string
  placeholder: string
}

// Form validation schemas
const candidateSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les conditions d'utilisation" }),
  }),
})

const recruiterSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  companyName: z.string().min(2, "Le nom de l'entreprise est requis"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les conditions d'utilisation" }),
  }),
})

const candidateFields = [
  { id: "firstName", label: "Prénom", type: "text", placeholder: "Prénom" },
  { id: "lastName", label: "Nom", type: "text", placeholder: "Nom" },
  { id: "email", label: "Email", type: "email", placeholder: "nom@exemple.com" },
  { id: "password", label: "Mot de passe", type: "password", placeholder: "••••••••" },
]

const recruiterFields = [
  { id: "firstName", label: "Prénom", type: "text", placeholder: "Prénom" },
  { id: "lastName", label: "Nom", type: "text", placeholder: "Nom" },
  { id: "email", label: "Email", type: "email", placeholder: "nom@entreprise.com" },
  { id: "companyName", label: "Entreprise", type: "text", placeholder: "Nom de l'entreprise" },
  { id: "password", label: "Mot de passe", type: "password", placeholder: "••••••••" },
]

function renderForm(
  fields: FormField[],
  formState: Record<string, string | boolean>,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errors: Record<string, string>
) {

  return fields.map(({ id, label, type, placeholder }: FormField) => (
    <div key={id} className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={formState[id] as string}
        onChange={handleChange}
        autoComplete="on"
      />
      {errors[id] && <p className="text-xs text-destructive">{errors[id]}</p>}
    </div>
  ))
}

export default function SignupPage({ error }: { error: string }) {
  const { type } = usePage().props

  const [activeTab, setActiveTab] = useState<string>((type as string) || "candidate")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const candidateForm = useForm<{
    firstName: string
    lastName: string
    email: string
    password: string
    terms: boolean
    role: string
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
    role: "candidate",
  })

  const recruiterForm = useForm<{
    firstName: string
    lastName: string
    email: string
    password: string
    companyName: string
    terms: boolean
    role: string
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    terms: false,
    role: "recruiter",
  })


  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      candidateSchema.parse(candidateForm.data)
      candidateForm.post("/signup", {
        onSuccess: () => {
          console.log("Candidate form submitted successfully")
        },
        onError: (e) => {
          console.log("Candidate form submission failed")
          console.log(e)
        },
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0].toString()] = err.message
          }
        })
        setErrors(formattedErrors)
      }
    }
  }

  const handleRecruiterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(recruiterForm.data)

    try {
      recruiterSchema.parse(recruiterForm.data)
      recruiterForm.post("/signup", {
        onSuccess: () => {
          console.log("Recruiter form submitted successfully")
        },
        onError: (e) => {
          console.log("Recruiter form submission failed")
          console.log(e)
        }
      })
    } catch (error) {
      console.log("Recruiter form submission error", error)
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0].toString()] = err.message
          }
        })
        setErrors(formattedErrors)
      }
    }
  }

  const handleCandidateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    type t = keyof typeof candidateForm.data

    const { name, value } = e.target as HTMLInputElement & {
      name: t
      value: string
      type: string
      checked: boolean
    }

    candidateForm.setData(name, value)

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleRecruiterChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    type t = keyof typeof candidateForm.data

    const { name, value } = e.target as HTMLInputElement & {
      name: t
      value: string
      type: string
      checked: boolean
    }

    recruiterForm.setData(name, value)

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center mx-auto">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost" className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
      </Link>

      <div className="flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Créer un compte</h1>
          <p className="text-sm text-muted-foreground">Inscrivez-vous pour accéder à SmartHire AI</p>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value);
          router.get('/signup', { type: value }, {
            preserveState: true,
            preserveScroll: true,
            only: []
          });
        }} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="candidate">
              Candidat
            </TabsTrigger>
            <TabsTrigger value="recruiter">
              Recruteur
            </TabsTrigger>
          </TabsList>

          <TabsContent value="candidate">
            <Card>
              <CardHeader>
                <CardTitle>Inscription Candidat</CardTitle>
                <CardDescription>Créez votre profil candidat pour trouver le job idéal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleCandidateSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {renderForm(candidateFields.slice(0, 2), candidateForm.data, handleCandidateChange, errors)}
                  </div>
                  {renderForm(candidateFields.slice(2), candidateForm.data, handleCandidateChange, errors)}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      name="terms"
                      checked={candidateForm.data.terms}
                      onCheckedChange={(checked) => {
                        candidateForm.setData("terms", checked === true)
                        if (errors.terms) {
                          setErrors({
                            ...errors,
                            terms: "",
                          })
                        }
                      }}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      J'accepte les{" "}
                      <Link href="#" className="underline underline-offset-4 hover:text-primary">
                        conditions d'utilisation
                      </Link>
                    </Label>
                  </div>
                  {errors.terms && <p className="text-xs text-destructive">{errors.terms}</p>}

                  <Button type="submit" className="w-full">
                    S'inscrire
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Déjà inscrit ?{" "}
                  <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                    Se connecter
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="recruiter">
            <Card>
              <CardHeader>
                <CardTitle>Inscription Recruteur</CardTitle>
                <CardDescription>Créez votre profil recruteur pour trouver les meilleurs talents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleRecruiterSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {renderForm(recruiterFields.slice(0, 2), recruiterForm.data, handleRecruiterChange, errors)}
                  </div>
                  {renderForm(recruiterFields.slice(2), recruiterForm.data, handleRecruiterChange, errors)}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="r-terms"
                      name="terms"
                      checked={recruiterForm.data.terms}
                      onCheckedChange={(checked) => {
                        recruiterForm.setData("terms", checked === true)
                        if (errors.terms) {
                          setErrors({
                            ...errors,
                            terms: "",
                          })
                        }
                      }}
                    />
                    <Label htmlFor="r-terms" className="text-sm">
                      J'accepte les{" "}
                      <Link href="#" className="underline underline-offset-4 hover:text-primary">
                        conditions d'utilisation
                      </Link>
                    </Label>
                  </div>
                  {errors.terms && <p className="text-xs text-destructive">{errors.terms}</p>}

                  <Button type="submit" className="w-full">
                    S'inscrire
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Déjà inscrit ?{" "}
                  <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                    Se connecter
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

