"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Checkbox } from "~/components/ui/checkbox"
import { ArrowLeft, Github, Linkedin } from "lucide-react"
import { z } from "zod"
import { Link, router } from '@inertiajs/react'

// Form validation schema
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
})

export default function LoginPage() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      loginSchema.parse(formData)
      // Form is valid, proceed with submission
      console.log("Login form submitted:", formData)

      // Redirect based on user type (this would normally be determined by the backend)
      // For demo purposes, we'll redirect to candidate dashboard
      router.visit("/dashboard/candidate")

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

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
          <h1 className="text-2xl font-semibold tracking-tight">Connexion</h1>
          <p className="text-sm text-muted-foreground">Connectez-vous à votre compte SmartHire AI</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>Entrez vos identifiants pour accéder à votre compte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked) => {
                    setFormData({
                      ...formData,
                      remember: checked === true,
                    })
                  }}
                />
                <Label htmlFor="remember" className="text-sm">
                  Se souvenir de moi
                </Label>
              </div>

              <Button type="submit" className="w-full">
                Se connecter
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
              Pas encore de compte ?{" "}
              <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                S'inscrire
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

