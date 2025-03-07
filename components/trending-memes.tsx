"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useMemeContext } from "@/context/meme-context"
import Link from "next/link"
import Image from "next/image"

export function TrendingMemes() {
  const { memes, fetchMemes, loading } = useMemeContext()

  useEffect(() => {
    fetchMemes(1, "trending", "", "likes")
  }, [fetchMemes])

  // Get top 6 memes
  const trendingMemes = memes.slice(0, 6)

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="animate-pulse">
                <div className="h-48 bg-muted"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-muted"></div>
                    <div className="h-3 bg-muted rounded w-24"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trendingMemes.map((meme, index) => (
        <motion.div
          key={meme.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link href={`/meme/${meme.id}`}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={meme.imageUrl || "/placeholder.svg?height=192&width=384"}
                    alt={meme.title}
                    fill
                    className="object-cover"
                  />
                  {meme.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-white text-center font-bold text-sm">
                      {meme.caption}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1 line-clamp-1">{meme.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={meme.user.avatar} alt={meme.user.name} />
                        <AvatarFallback>{meme.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{meme.user.name}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Heart className="h-4 w-4 mr-1 text-red-500" />
                      <span>{meme.likes}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}

      {trendingMemes.length === 0 && !loading && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No trending memes available. Be the first to upload!</p>
        </div>
      )}
    </div>
  )
}

