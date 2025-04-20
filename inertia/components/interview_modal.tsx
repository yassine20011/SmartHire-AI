"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Textarea } from "~/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "~/lib/utils"

interface InterviewModalProps {
  isOpen: boolean
  onClose: () => void
  candidateId: string | null
  jobId: string
}

// Generate time slots from 9:00 to 18:00
const timeSlots = Array.from({ length: 19 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9
  const minute = (i % 2) * 30
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
})

export function InterviewModal({ isOpen, onClose, candidateId, jobId }: InterviewModalProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string>("")
  const [interviewType, setInterviewType] = useState<string>("video")
  const [notes, setNotes] = useState<string>("")

  const handleSubmit = () => {
    if (!date || !time || !interviewType) return

    // Format the data for submission
    const interviewData = {
      candidateId,
      jobId,
      date: format(date, "yyyy-MM-dd"),
      time,
      type: interviewType,
      notes,
    }

    console.log("Interview scheduled:", interviewData)
    // Here you would typically make an API call to schedule the interview

    // Reset form and close modal
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setDate(undefined)
    setTime("")
    setInterviewType("video")
    setNotes("")
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Planifier un entretien</DialogTitle>
          <DialogDescription>Choisissez une date et une heure pour l'entretien avec le candidat.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date: Date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Heure</label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une heure" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type d'entretien</label>
            <Select value={interviewType} onValueChange={setInterviewType}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Visioconférence</SelectItem>
                <SelectItem value="phone">Téléphone</SelectItem>
                <SelectItem value="inperson">En personne</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes (optionnel)</label>
            <Textarea
              placeholder="Ajoutez des informations supplémentaires pour le candidat..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={!date || !time || !interviewType}>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

