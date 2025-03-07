"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface MemeGridProps {
  memes: any[]
}

export function MemeGrid({ memes }: MemeGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {memes.map((meme, index) => (
        <motion.div key={meme.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
          <Link href={`/meme/${meme.id}`}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative aspect-square w-full">
                  <Image src={meme.imageUrl || "/placeholder.svg?height=300&width=300"} alt={meme.title} fill className="object-cover"/>
                  {meme.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-white text-center font-bold text-sm">
                      {meme.caption}
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold mb-1 line-clamp-1">{meme.title}</h3>
                  <div className="flex items-center mt-auto justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={meme.user.avatar} alt={meme.user.name} />
                        <AvatarFallback>{meme.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground line-clamp-1">{meme.user.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-sm">
                        <Heart className="h-4 w-4 mr-1 text-red-500" />
                        <span>{meme.likes}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{meme.comments?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

