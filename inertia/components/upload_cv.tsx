"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { FileText, Upload, X } from "lucide-react"
import { router } from "@inertiajs/react"
import { usePage } from "@inertiajs/react"
import User from "#models/user"
import { PageProps } from '@inertiajs/core'

type PagePropsWithData = PageProps & {
  user?: User
  resumeUrl?: string
}

export function UploadCV() {
  const { user, resumeUrl } = usePage<PagePropsWithData>().props
  console.log("resume", resumeUrl)

  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleUpload = (e:any) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    const formData = new FormData()
    formData.append("resume", file)
    router.post("/settings", formData, {
      forceFormData: true,
      onProgress: (progress: any) => {
        setUploadProgress(Math.round((progress.loaded / progress.total) * 100))
      },
      onFinish: () => {
        setIsUploading(false)
        setUploadProgress(100)
      },
    })
  }

  const handleRemoveFile = () => {
    setFile(null)
    setUploadProgress(0)
    setIsUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Glissez-déposez votre CV ici</p>
                <p className="text-xs text-muted-foreground">Formats supportés: PDF, DOCX, maximum 5MB</p>
              </div>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                Parcourir les fichiers
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </>
        ) : (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleRemoveFile} disabled={isUploading}>
                <X className="h-4 w-4" />
                <span className="sr-only">Supprimer le fichier</span>
              </Button>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">{uploadProgress}%</p>
              </div>
            )}

            {!isUploading && uploadProgress < 100 && (
              <Button onClick={(e) => handleUpload(e)} className="w-full">
                Télécharger
              </Button>
            )}


          </div>
        )}
      </div>
      {resumeUrl != null && (
        <div>
        <h3 className="text-sm font-medium mb-2">Documents téléchargés</h3>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{user?.firstName}-{user?.lastName}.pdf</p>
                <p className="text-xs text-muted-foreground">Téléchargé le 15/03/2023</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => window.open(resumeUrl, "_blank")}>
                Voir
              </Button>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
      )}
    </div>
  )
}

