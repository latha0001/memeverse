"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageSquare, Share2, Bookmark, BookmarkCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useMemeContext } from "@/context/meme-context"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export default function MemePage() {
  const params = useParams()
  const { id } = params
  const { getMemeById, likeMeme, addComment, saveMeme, isMemeInSaved } = useMemeContext()
  const [meme, setMeme] = useState<any>(null)
  const [comment, setComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (id) {
      const fetchedMeme = getMemeById(id as string)
      setMeme(fetchedMeme)

      // Check if meme is liked from localStorage
      const likedMemes = JSON.parse(localStorage.getItem("likedMemes") || "[]")
      setIsLiked(likedMemes.includes(id))

      // Check if meme is saved
      setIsSaved(isMemeInSaved(id as string))

      setLoading(false)
    }
  }, [id, getMemeById, isMemeInSaved])

  const handleLike = () => {
    if (!meme) return

    // Toggle like state
    const newLikedState = !isLiked
    setIsLiked(newLikedState)

    // Update localStorage
    const likedMemes = JSON.parse(localStorage.getItem("likedMemes") || "[]")
    if (newLikedState) {
      localStorage.setItem("likedMemes", JSON.stringify([...likedMemes, id]))
    } else {
      localStorage.setItem("likedMemes", JSON.stringify(likedMemes.filter((memeId: string) => memeId !== id)))
    }

    // Update meme in context
    likeMeme(meme.id, newLikedState)

    // Update local state
    setMeme({
      ...meme,
      likes: newLikedState ? meme.likes + 1 : meme.likes - 1,
    })
  }

  const handleSave = () => {
    if (!meme) return

    const newSavedState = !isSaved
    setIsSaved(newSavedState)

    saveMeme(meme.id, newSavedState)

    toast({
      title: newSavedState ? "Meme saved" : "Meme removed from saved",
      description: newSavedState
        ? "This meme has been added to your saved collection"
        : "This meme has been removed from your saved collection",
    })
  }

  const handleAddComment = () => {
    if (!comment.trim() || !meme) return

    const newComment = {
      id: Date.now().toString(),
      text: comment,
      user: {
        id: "Preethu@026",
        name: "Preethu@026",
        avatar: "/Preethu.jpg",
      },
      createdAt: new Date().toISOString(),
    }

    // Add comment to context
    addComment(meme.id, newComment)

    // Update local state
    setMeme({
      ...meme,
      comments: [...meme.comments, newComment],
    })

    // Clear input
    setComment("")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: meme?.title,
        text: meme?.caption,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Meme link copied to clipboard",
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-3xl">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-96 bg-muted rounded"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!meme) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Meme not found</h1>
        <p className="text-muted-foreground mb-8">The meme you're looking for doesn't exist or has been removed.</p>
        <Link href="/explore">
          <Button>Explore other memes</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6">
            <Link href="/explore" className="text-muted-foreground hover:underline">
              ← Back to explore
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-4">{meme.title}</h1>

          <div className="flex items-center mb-6">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={meme.user.avatar} alt={meme.user.name} />
              <AvatarFallback>{meme.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{meme.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(meme.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          <Card className="mb-6 overflow-hidden">
            <CardContent className="p-0 relative">
              <div className="relative aspect-video md:aspect-auto md:h-[500px] w-full">
                <Image
                  src={meme.imageUrl || "/placeholder.svg?height=500&width=800"}
                  alt={meme.title}
                  fill
                  className="object-contain bg-muted/30"
                />
              </div>
              {meme.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white text-center font-bold">
                  {meme.caption}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2" onClick={handleLike}>
                <motion.div animate={isLiked ? { scale: [1, 1.5, 1] } : {}} transition={{ duration: 0.5 }}>
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </motion.div>
                <span>{meme.likes} likes</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>{meme.comments.length} comments</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleSave}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isSaved ? "saved" : "unsaved"}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isSaved ? <BookmarkCheck className="h-5 w-5 text-primary" /> : <Bookmark className="h-5 w-5" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold">Comments</h2>

            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Current User" />
                <AvatarFallback>CU</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex items-center space-x-2">
                <Input
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleAddComment()
                    }
                  }}
                />
                <Button onClick={handleAddComment} disabled={!comment.trim()}>
                  Post
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {meme.comments.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
              ) : (
                meme.comments.map((comment: any) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex space-x-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">{comment.user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                      <p className="text-sm mt-1">{comment.text}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

