"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MemeGrid } from "@/components/meme-grid"
import { useMemeContext } from "@/context/meme-context"
import { motion } from "framer-motion"
import { Camera, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { userMemes, savedMemes, updateUserProfile } = useMemeContext()
  const [name, setName] = useState("Current User")
  const [bio, setBio] = useState("Meme enthusiast and creator")
  const [avatarPreview, setAvatarPreview] = useState("/Preethu.jpg")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update profile in context
    updateUserProfile({
      name,
      bio,
      avatar: avatarPreview,
    })

    setIsEditing(false)
    setIsSaving(false)

    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={avatarPreview} alt={name} />
                  <AvatarFallback className="text-4xl">{name.charAt(0)}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer"
                  >
                    <Camera className="h-5 w-5" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                )}
              </div>

              <div className="flex-1 space-y-4 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
                    </div>
                    <div className="flex gap-2 justify-center md:justify-start">
                      <Button onClick={handleSaveProfile} disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Profile"
                        )}
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h1 className="text-3xl font-bold">{name}</h1>
                      <p className="text-muted-foreground mt-1">{bio}</p>
                    </div>
                    <div className="flex gap-4 justify-center md:justify-start">
                      <div>
                        <p className="font-bold">{userMemes.length}</p>
                        <p className="text-sm text-muted-foreground">Memes</p>
                      </div>
                      <div>
                        <p className="font-bold">{savedMemes.length}</p>
                        <p className="text-sm text-muted-foreground">Saved</p>
                      </div>
                    </div>
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="memes" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="memes">My Memes</TabsTrigger>
            <TabsTrigger value="saved">Saved Memes</TabsTrigger>
          </TabsList>
          <TabsContent value="memes" className="mt-6">
            {userMemes.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold mb-2">No memes yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't uploaded any memes yet. Start creating and sharing your humor!
                </p>
                <Button href="/upload" asChild>
                  <a href="/upload">Upload Your First Meme</a>
                </Button>
              </div>
            ) : (
              <MemeGrid memes={userMemes} />
            )}
          </TabsContent>
          <TabsContent value="saved" className="mt-6">
            {savedMemes.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold mb-2">No saved memes</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't saved any memes yet. Explore and save memes you like!
                </p>
                <Button href="/explore" asChild>
                  <a href="/explore">Explore Memes</a>
                </Button>
              </div>
            ) : (
              <MemeGrid memes={savedMemes} />
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

