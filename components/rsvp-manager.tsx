"use client"

import { useState } from "react"
import { useInvitationStore, type Guest } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, Trash2, Users, Check, X, Mail, Phone, MessageSquare } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RSVPManager() {
  const {
    enableRSVP,
    setEnableRSVP,
    rsvpDeadline,
    setRsvpDeadline,
    guests,
    addGuest,
    removeGuest,
    updateGuest,
    rsvpMessage,
    setRsvpMessage,
  } = useInvitationStore()

  const [showAddForm, setShowAddForm] = useState(false)
  const [newGuest, setNewGuest] = useState<Omit<Guest, "id">>({
    name: "",
    email: "",
    phone: "",
    attending: null,
    numberOfGuests: 1,
    message: "",
  })

  const handleAddGuest = () => {
    if (newGuest.name) {
      addGuest({
        ...newGuest,
        id: Date.now().toString(),
      })
      // Reset form
      setNewGuest({
        name: "",
        email: "",
        phone: "",
        attending: null,
        numberOfGuests: 1,
        message: "",
      })
      setShowAddForm(false)
    }
  }

  const handleAttendanceChange = (id: string, attending: boolean | null) => {
    updateGuest(id, { attending })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch id="enable-rsvp" checked={enableRSVP} onCheckedChange={setEnableRSVP} />
          <Label htmlFor="enable-rsvp" className="text-base font-medium">
            Enable RSVP
          </Label>
        </div>
      </div>

      {enableRSVP && (
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="rsvp-deadline">RSVP Deadline</Label>
              <Input
                id="rsvp-deadline"
                type="date"
                value={rsvpDeadline}
                onChange={(e) => setRsvpDeadline(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="rsvp-message">RSVP Message</Label>
              <Textarea
                id="rsvp-message"
                value={rsvpMessage}
                onChange={(e) => setRsvpMessage(e.target.value)}
                placeholder="Enter a message for your RSVP section"
                className="min-h-[100px]"
              />
            </div>
          </div>

          <Tabs defaultValue="guests" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guests">Guest List</TabsTrigger>
              <TabsTrigger value="responses">Responses</TabsTrigger>
            </TabsList>

            <TabsContent value="guests" className="space-y-4 pt-4">
              {guests.length > 0 && (
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {guests.map((guest) => (
                        <TableRow key={guest.id}>
                          <TableCell className="font-medium">{guest.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1 text-xs">
                              {guest.email && (
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" /> {guest.email}
                                </div>
                              )}
                              {guest.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" /> {guest.phone}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {guest.attending === true && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <Check className="h-3 w-3 mr-1" /> Attending
                                </span>
                              )}
                              {guest.attending === false && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  <X className="h-3 w-3 mr-1" /> Not Attending
                                </span>
                              )}
                              {guest.attending === null && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  Pending
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeGuest(guest.id)}
                              className="h-8 w-8 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {showAddForm ? (
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="guest-name">Guest Name</Label>
                      <Input
                        id="guest-name"
                        value={newGuest.name}
                        onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                        placeholder="Enter guest name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="guest-email">Email</Label>
                        <Input
                          id="guest-email"
                          type="email"
                          value={newGuest.email}
                          onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                          placeholder="Enter guest email"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="guest-phone">Phone</Label>
                        <Input
                          id="guest-phone"
                          value={newGuest.phone}
                          onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                          placeholder="Enter guest phone"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowAddForm(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddGuest} disabled={!newGuest.name}>
                        Add Guest
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Button onClick={() => setShowAddForm(true)} className="w-full flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add Guest
                </Button>
              )}

              {guests.length === 0 && !showAddForm && (
                <div className="text-center p-6 border border-dashed rounded-md bg-muted/10">
                  <Users className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Add guests to your invitation list</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="responses" className="space-y-4 pt-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 border rounded-md bg-muted/10">
                  <p className="text-2xl font-bold">{guests.length}</p>
                  <p className="text-sm text-muted-foreground">Total Invites</p>
                </div>
                <div className="p-4 border rounded-md bg-green-50">
                  <p className="text-2xl font-bold text-green-600">
                    {guests.filter((g) => g.attending === true).length}
                  </p>
                  <p className="text-sm text-green-600">Attending</p>
                </div>
                <div className="p-4 border rounded-md bg-red-50">
                  <p className="text-2xl font-bold text-red-600">
                    {guests.filter((g) => g.attending === false).length}
                  </p>
                  <p className="text-sm text-red-600">Not Attending</p>
                </div>
              </div>

              {guests.filter((g) => g.attending !== null).length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Guest</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Guests</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {guests
                        .filter((g) => g.attending !== null)
                        .map((guest) => (
                          <TableRow key={guest.id}>
                            <TableCell className="font-medium">{guest.name}</TableCell>
                            <TableCell>
                              {guest.attending ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <Check className="h-3 w-3 mr-1" /> Attending
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  <X className="h-3 w-3 mr-1" /> Not Attending
                                </span>
                              )}
                            </TableCell>
                            <TableCell>{guest.numberOfGuests}</TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {guest.message ? (
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3 flex-shrink-0" />
                                  <span className="truncate">{guest.message}</span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground text-xs">No message</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-6 border border-dashed rounded-md bg-muted/10">
                  <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No responses yet</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
