"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMemeContext } from "@/context/meme-context"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function LeaderboardPage() {
  const { memes } = useMemeContext()
  const [topMemes, setTopMemes] = useState<any[]>([])
  const [topUsers, setTopUsers] = useState<any[]>([])

  useEffect(() => {
    // Sort memes by likes
    const sortedMemes = [...memes].sort((a, b) => b.likes - a.likes).slice(0, 10)
    setTopMemes(sortedMemes)

    // Calculate top users based on total likes
    const userMap = new Map()
    memes.forEach((meme) => {
      const userId = meme.user.id
      if (!userMap.has(userId)) {
        userMap.set(userId, {
          id: userId,
          name: meme.user.name,
          avatar: meme.user.avatar,
          totalLikes: 0,
          memeCount: 0,
        })
      }

      const user = userMap.get(userId)
      user.totalLikes += meme.likes
      user.memeCount += 1
    })

    const sortedUsers = Array.from(userMap.values())
      .sort((a, b) => b.totalLikes - a.totalLikes)
      .slice(0, 10)

    setTopUsers(sortedUsers)
  }, [memes])

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
        <p className="text-muted-foreground">Check out the top memes and users in the MemeVerse community.</p>
      </motion.div>

      <Tabs defaultValue="memes" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="memes">Top Memes</TabsTrigger>
          <TabsTrigger value="users">Top Users</TabsTrigger>
        </TabsList>
        <TabsContent value="memes" className="mt-6">
          <div className="grid gap-6">
            {topMemes.map((meme, index) => (
              <motion.div
                key={meme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/meme/${meme.id}`}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-48 h-32">
                          <Image
                            src={meme.imageUrl || "/placeholder.svg?height=128&width=192"}
                            alt={meme.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {index + 1}
                          </div>
                        </div>
                        <div className="p-4 flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold truncate">{meme.title}</h3>
                            <div className="flex items-center text-sm">
                              <span className="font-bold text-primary">{meme.likes}</span>
                              <span className="ml-1 text-muted-foreground">likes</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={meme.user.avatar} alt={meme.user.name} />
                              <AvatarFallback>{meme.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{meme.user.name}</span>
                          </div>
                          {meme.caption && (
                            <p className="text-sm mt-2 text-muted-foreground line-clamp-1">{meme.caption}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}

            {topMemes.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold mb-2">No memes yet</h3>
                <p className="text-muted-foreground">
                  Start uploading and liking memes to see them on the leaderboard!
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-center">
                      <div className="bg-primary text-primary-foreground text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center mr-4">
                        {index + 1}
                      </div>
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.memeCount} memes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{user.totalLikes}</p>
                      <p className="text-xs text-muted-foreground">total likes</p>
                    </div>
                  </motion.div>
                ))}

                {topUsers.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No user data available yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

