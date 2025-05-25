"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Textarea } from "~/components/ui/textarea"
import { Switch } from "~/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { DashboardHeader } from "~/components/dashboard_header"
import { DashboardShell } from "~/components/dashboard_shell"
import { UploadCV } from "~/components/upload_cv"
import { usePage, router } from "@inertiajs/react"
import User from "#models/user"
import { toast } from "sonner"
import RootLayout from "~/components/RootLayout"


export default function SettingsPage() {

  const { user, errors } = usePage().props as { user?: User, errors?: Record<string, string> }
  const [activeTab, setActiveTab] = useState("profile")
  const userType = user?.role

  // Mock user data
  const [userData, setUserData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email,
    phone: user?.phone || "",
    title: user?.jobTitle || "",
    location: user?.location || "",
    bio: user?.bio || ""
  })

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    jobRecommendations: true,
    applicationUpdates: true,
    marketingEmails: false,
  })

  // Mock privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "recruiters", // all, recruiters, none
    showContactInfo: true,
    allowMessaging: true,
  })

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: checked,
    })
  }

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: value,
    })
  }

  const handleSaveProfile = () => {
    router.patch("/settings", userData,
      {
        onSuccess: () => {
          console.log("Profile updated successfully")
        },
        onError: () => {
          toast.error(errors?.email || "Something went wrong")
        },
      }
    )
  }

  const handleSaveNotifications = () => {
    // Save notification settings
    console.log("Saving notification settings:", notificationSettings)
    // Here you would typically make an API call to update the notification settings
  }

  const handleSavePrivacy = () => {
    // Save privacy settings
    console.log("Saving privacy settings:", privacySettings)
    // Here you would typically make an API call to update the privacy settings
  }

  return (
    <RootLayout>
      <DashboardShell userType={userType}>
        <DashboardHeader heading="Paramètres" text="Gérez votre profil et vos préférences" />

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 max-w-full overflow-hidden">
            <Card>
              <CardHeader>
                <CardTitle>Type de compte</CardTitle>
                <CardDescription>Choisissez votre type de compte</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" name="firstName" value={userData.firstName} onChange={handleUserDataChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" name="lastName" value={userData.lastName} onChange={handleUserDataChange} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={userData.email} onChange={handleUserDataChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" name="phone" value={userData.phone} onChange={handleUserDataChange} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre professionnel</Label>
                    <Input id="title" name="title" value={userData.title} onChange={handleUserDataChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Localisation</Label>
                    <Input id="location" name="location" value={userData.location} onChange={handleUserDataChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" name="bio" value={userData.bio} onChange={handleUserDataChange} rows={4} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile}>Enregistrer les modifications</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CV et documents</CardTitle>
                <CardDescription>Téléchargez votre CV et autres documents</CardDescription>
              </CardHeader>
              <CardContent>
                <UploadCV />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 max-w-full overflow-hidden">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notification</CardTitle>
                <CardDescription>Choisissez les notifications que vous souhaitez recevoir</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailAlerts">Alertes par email</Label>
                    <p className="text-sm text-muted-foreground">Recevez des emails concernant votre compte</p>
                  </div>
                  <Switch
                    id="emailAlerts"
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) => handleNotificationChange("emailAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="jobRecommendations">Recommandations d'emploi</Label>
                    <p className="text-sm text-muted-foreground">Recevez des recommandations d'emploi personnalisées</p>
                  </div>
                  <Switch
                    id="jobRecommendations"
                    checked={notificationSettings.jobRecommendations}
                    onCheckedChange={(checked) => handleNotificationChange("jobRecommendations", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="applicationUpdates">Mises à jour des candidatures</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez des notifications sur l'état de vos candidatures
                    </p>
                  </div>
                  <Switch
                    id="applicationUpdates"
                    checked={notificationSettings.applicationUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("applicationUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketingEmails">Emails marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez des emails concernant nos offres et nouveautés
                    </p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotifications}>Enregistrer les préférences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4 max-w-full overflow-hidden">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Paramètres de confidentialité</CardTitle>
                <CardDescription>Gérez qui peut voir votre profil et vos informations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Visibilité du profil</Label>
                  <Select
                    value={privacySettings.profileVisibility}
                    onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                  >
                    <SelectTrigger id="profileVisibility" className="w-full">
                      <SelectValue placeholder="Sélectionnez une option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Visible par tous</SelectItem>
                      <SelectItem value="recruiters">Visible par les recruteurs uniquement</SelectItem>
                      <SelectItem value="none">Profil privé</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground break-words">Contrôlez qui peut voir votre profil sur SmartHire AI</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showContactInfo">Afficher les informations de contact</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre aux recruteurs de voir vos informations de contact
                    </p>
                  </div>
                  <Switch
                    id="showContactInfo"
                    checked={privacySettings.showContactInfo}
                    onCheckedChange={(checked) => handlePrivacyChange("showContactInfo", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowMessaging">Autoriser les messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre aux recruteurs de vous contacter via la messagerie
                    </p>
                  </div>
                  <Switch
                    id="allowMessaging"
                    checked={privacySettings.allowMessaging}
                    onCheckedChange={(checked) => handlePrivacyChange("allowMessaging", checked)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePrivacy}>Enregistrer les paramètres</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Suppression du compte</CardTitle>
                <CardDescription>Supprimez définitivement votre compte et toutes vos données</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  La suppression de votre compte est irréversible. Toutes vos données personnelles, candidatures et
                  messages seront définitivement supprimés.
                </p>
                <Button variant="destructive">Supprimer mon compte</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </RootLayout>
  )
}

