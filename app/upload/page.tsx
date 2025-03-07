"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Upload, Wand2 } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { useMemeContext } from "@/context/meme-context"
import Image from "next/image"

export default function UploadPage() {
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { uploadMeme } = useMemeContext()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleGenerateCaption = async () => {
    if (!preview) {
      toast({
        title: "No image selected",
        description: "Please upload an image first to generate a caption",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate API call for caption generation
    setTimeout(() => {
      const captions = [
        "When you finally find the bug in your code after 5 hours",
        "That moment when the code works on the first try",
        "Me explaining to my mom what I do for a living",
        "When someone asks if you tested your code before deployment",
        "My brain during a coding interview",
      ]

      setCaption(captions[Math.floor(Math.random() * captions.length)])
      setIsGenerating(false)

      toast({
        title: "Caption generated!",
        description: "We've created a funny caption for your meme",
      })
    }, 1500)
  }

  const handleUpload = async () => {
    if (!file || !title) {
      toast({
        title: "Missing information",
        description: "Please provide a title and upload an image",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add meme to context
      await uploadMeme({
        id: Date.now().toString(),
        title,
        caption,
        imageUrl: preview as string,
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString(),
        user: {
          id: "current-user",
          name: "Current User",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      })

      // Reset form
      setTitle("")
      setCaption("")
      setFile(null)
      setPreview(null)

      toast({
        title: "Meme uploaded successfully!",
        description: "Your meme has been added to the collection",
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your meme. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Upload a Meme</h1>
        <p className="text-muted-foreground">
          Share your funniest memes with the MemeVerse community. Add captions, preview, and upload!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Meme Title</Label>
            <Input
              id="title"
              placeholder="Enter a catchy title for your meme"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="template">Use Template</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG, GIF (MAX. 5MB)</p>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="template">
              <Card>
                <CardContent className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg overflow-hidden border cursor-pointer hover:border-primary transition-colors"
                      onClick={() => {
                        setPreview(`/placeholder.svg?height=300&width=300&text=Template${i}`)
                      }}
                    >
                      <Image
                        src={`/placeholder.svg?height=150&width=150&text=Template${i}`}
                        alt={`Meme template ${i}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="caption">Caption</Label>
              <Button variant="outline" size="sm" onClick={handleGenerateCaption} disabled={isGenerating || !preview}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Caption
                  </>
                )}
              </Button>
            </div>
            <Textarea
              id="caption"
              placeholder="Add a funny caption for your meme"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
            />
          </div>

          <Button className="w-full" size="lg" onClick={handleUpload} disabled={isUploading || !file || !title}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>Upload Meme</>
            )}
          </Button>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Preview</h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: preview ? 1 : 0.5,
              scale: preview ? 1 : 0.95,
            }}
            transition={{ duration: 0.3 }}
            className="border rounded-lg overflow-hidden bg-muted/30 aspect-square flex items-center justify-center"
          >
            {preview ? (
              <div className="relative w-full h-full">
                <Image src={preview || "/placeholder.svg"} alt="Meme preview" fill className="object-contain" />
                {caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white text-center font-bold">
                    {caption}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">Your meme preview will appear here</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

