"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

// Sample meme data
const initialMemes = [
  {
    id: "1",
    title: "Types of Friends in a Roasting Session! 😂🔥",
    caption: "Every friend group has: the roaster, the one who enjoys it, and the comeback thinker!",
    imageUrl: "/1637161917447.png",
    likes: 245,
    comments: [
      {
        id: "c1",
        text: "This is so relatable!",
        user: {
          id: "u2",
          name: "sridher@026",
          avatar: "/meme2.jpg",
        },
        createdAt: "2023-05-15T10:30:00Z",
      },
    ],
    createdAt: "2023-05-15T08:30:00Z",
    user: {
      id: "u1",
      name: "Kurry@026",
      avatar: "/smiling-baby-girl-3-4-year-old-wearing-stylish-dress-and-wreath-with-roses-outdoors-looking-at-camera-childhood-TRETX3.jpg",
    },
  },
  {
    id: "2",
    title: "Friendship Expectations vs Reality 😂",
    caption: "Me showing my WhatsApp status vs My friend taking it way too seriously! 🤣🔥",
    imageUrl: "/22cb27a4_1599618359031.jpeg",
    likes: 189,
    comments: [],
    createdAt: "2023-05-14T15:45:00Z",
    user: {
      id: "u2",
      name: "Chinttu@026",
      avatar: "/portrait-four-year-old-girl-260nw-382815565.webp",
    },
  },
  {
    id: "3",
    title: "WiFi Connection Struggles 😂",
    caption: "Trying to connect to WiFi feels like solving a mystery, only to realize it's not the WiFi but your neighbor’s password-protected network! 🤣📶",
    imageUrl: "/83c7c2e899a6da74502f96d5bddd6334.jpg",
    likes: 320,
    comments: [],
    createdAt: "2023-05-13T12:15:00Z",
    user: {
      id: "u3",
      name: "manoj@026",
      avatar: "/65d0cef4cab72c2ecf9d613badf726a8.jpg",
    },
  },
  {
    id: "4",
    title: "The Struggle of Unexpected Wakeups 😂",
    caption: "At night, sleep comes peacefully... but in the morning, alarm clocks and responsibilities come uninvited! 😴⏰🤣",
    imageUrl: "/Nice Funny Jokes Images Top Brahmanandam Comedy Setairs Pictures Telugu Comedy Navvulu Free Download.jpg",
    likes: 275,
    comments: [],
    createdAt: "2023-05-12T09:20:00Z",
    user: {
      id: "u1",
      name: "Kumar@026",
      avatar: "/professional-photography-4-year-old_0010.jpg",
    },
  },
  {
    id: "5",
    title: "The Reason Behind the Laughter 😂",
    caption: "Mee reason vini janalu navvutaaru master... Avnu Akhil bro, goranga navkuntunam! 🤣🤣",
    imageUrl: "/samayam-telugu-79099087.webp",
    likes: 210,
    comments: [],
    createdAt: "2023-05-11T14:50:00Z",
    user: {
      id: "u4",
      name: "Kiran@026",
      avatar: "/smiling-kid-girl-34-year-260nw-1459955051.webp",
    },
  },
  {
    id: "6",
    title: "Ganesh Chaturthi Celebration Expectations vs Reality 😂",
    caption: "Prasadam ammayipoyindaa... 😅",
    imageUrl: "/images (2).jpg",
    likes: 298,
    comments: [],
    createdAt: "2023-05-10T11:35:00Z",
    user: {
      id: "u2",
      name: "Gangu@026",
      avatar: "/aa3584b50280cfbcfdf095740246f505.jpg",
    },
  },
  {
    id: "7",
    title: "Study Struggles & Overthinking 😂",
    caption: "7th stage of hallucination... 🤣",
    imageUrl: "/1638191397830.png",
    likes: 156,
    comments: [],
    createdAt: "2023-05-09T16:25:00Z",
    user: {
      id: "u3",
      name: "Raj@026",
      avatar: "/sep-2021-4-months-old-baby-boy-professional-photo-session-using-props-and-backdrops-in-delhi-by-meghna-rathore-photography-1.jpg",
    },
  },
  {
    id: "8",
    title: "Whatsapp Status Vs Real Life 😂",
    caption: "A guy laughs even by looking at a single WhatsApp status...But when it comes to his own wedding, he seriously analyzes everything! 🤣",
    imageUrl: "/oar2.jpg",
    likes: 187,
    comments: [],
    createdAt: "2023-05-08T13:40:00Z",
    user: {
      id: "u1",
      name: "Latha@026",
      avatar: "/music-and-cognitive-development-1584478808.jpg",
    },
  },
]

type MemeContextType = {
  memes: any[]
  userMemes: any[]
  savedMemes: any[]
  loading: boolean
  hasMore: boolean
  fetchMemes: (page: number, category: string, search: string, sortBy: string, append?: boolean) => void
  getMemeById: (id: string) => any
  likeMeme: (id: string, isLiked: boolean) => void
  addComment: (memeId: string, comment: any) => void
  uploadMeme: (meme: any) => Promise<void>
  saveMeme: (id: string, isSaved: boolean) => void
  isMemeInSaved: (id: string) => boolean
  updateUserProfile: (profile: any) => void
}

const MemeContext = createContext<MemeContextType | undefined>(undefined)

export function MemeProvider({ children }: { children: React.ReactNode }) {
  const [memes, setMemes] = useState<any[]>([])
  const [allMemes, setAllMemes] = useState<any[]>([])
  const [savedMemeIds, setSavedMemeIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [userProfile, setUserProfile] = useState({
    name: "Current User",
    bio: "Meme enthusiast and creator",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  // Initialize memes on mount
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setAllMemes(initialMemes)
      setMemes(initialMemes.slice(0, 6))
      setLoading(false)
    }, 1000)

    // Load saved memes from localStorage
    const savedIds = JSON.parse(localStorage.getItem("savedMemes") || "[]")
    setSavedMemeIds(savedIds)
  }, [])

  // Fetch memes with filters
  const fetchMemes = useCallback(
    (page: number, category: string, search: string, sortBy: string, append = false) => {
      setLoading(true)

      // Simulate API fetch with delay
      setTimeout(() => {
        let filteredMemes = [...allMemes]

        // Apply category filter
        if (category === "trending") {
          filteredMemes = filteredMemes.sort((a, b) => b.likes - a.likes)
        } else if (category === "new") {
          filteredMemes = filteredMemes.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
        } else if (category === "random") {
          filteredMemes = filteredMemes.sort(() => Math.random() - 0.5)
        }

        // Apply search filter
        if (search) {
          const searchLower = search.toLowerCase()
          filteredMemes = filteredMemes.filter(
            (meme) =>
              meme.title.toLowerCase().includes(searchLower) ||
              (meme.caption && meme.caption.toLowerCase().includes(searchLower)),
          )
        }

        // Apply sort
        if (sortBy === "likes") {
          filteredMemes = filteredMemes.sort((a, b) => b.likes - a.likes)
        } else if (sortBy === "date") {
          filteredMemes = filteredMemes.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
        } else if (sortBy === "comments") {
          filteredMemes = filteredMemes.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0))
        }

        // Paginate
        const pageSize = 6
        const start = (page - 1) * pageSize
        const paginatedMemes = filteredMemes.slice(0, start + pageSize)

        setHasMore(paginatedMemes.length < filteredMemes.length)

        if (append && page > 1) {
          setMemes((prev) => [...prev, ...paginatedMemes.slice(start)])
        } else {
          setMemes(paginatedMemes)
        }

        setLoading(false)
      }, 800)
    },
    [allMemes],
  )

  // Get meme by ID
  const getMemeById = useCallback(
    (id: string) => {
      return allMemes.find((meme) => meme.id === id)
    },
    [allMemes],
  )

  // Like a meme
  const likeMeme = useCallback((id: string, isLiked: boolean) => {
    setAllMemes((prev) =>
      prev.map((meme) => (meme.id === id ? { ...meme, likes: isLiked ? meme.likes + 1 : meme.likes - 1 } : meme)),
    )

    setMemes((prev) =>
      prev.map((meme) => (meme.id === id ? { ...meme, likes: isLiked ? meme.likes + 1 : meme.likes - 1 } : meme)),
    )
  }, [])

  // Add comment to a meme
  const addComment = useCallback((memeId: string, comment: any) => {
    setAllMemes((prev) =>
      prev.map((meme) => (meme.id === memeId ? { ...meme, comments: [...(meme.comments || []), comment] } : meme)),
    )

    setMemes((prev) =>
      prev.map((meme) => (meme.id === memeId ? { ...meme, comments: [...(meme.comments || []), comment] } : meme)),
    )
  }, [])

  // Upload a new meme
  const uploadMeme = useCallback(async (meme: any) => {
    // Add meme to state
    setAllMemes((prev) => [meme, ...prev])

    // If we're viewing recent memes, add to current view
    setMemes((prev) => {
      if (prev.length > 0 && prev[0].createdAt >= meme.createdAt) {
        return [meme, ...prev]
      }
      return prev
    })

    return Promise.resolve()
  }, [])

  // Save/unsave a meme
  const saveMeme = useCallback(
    (id: string, isSaved: boolean) => {
      if (isSaved) {
        setSavedMemeIds((prev) => [...prev, id])
        localStorage.setItem("savedMemes", JSON.stringify([...savedMemeIds, id]))
      } else {
        setSavedMemeIds((prev) => prev.filter((memeId) => memeId !== id))
        localStorage.setItem("savedMemes", JSON.stringify(savedMemeIds.filter((memeId) => memeId !== id)))
      }
    },
    [savedMemeIds],
  )

  // Check if meme is saved
  const isMemeInSaved = useCallback(
    (id: string) => {
      return savedMemeIds.includes(id)
    },
    [savedMemeIds],
  )

  // Update user profile
  const updateUserProfile = useCallback((profile: any) => {
    setUserProfile((prev) => ({ ...prev, ...profile }))
  }, [])

  // Get user's memes
  const userMemes = allMemes.filter((meme) => meme.user.id === "current-user")

  // Get saved memes
  const savedMemes = allMemes.filter((meme) => savedMemeIds.includes(meme.id))

  return (
    <MemeContext.Provider
      value={{
        memes,
        userMemes,
        savedMemes,
        loading,
        hasMore,
        fetchMemes,
        getMemeById,
        likeMeme,
        addComment,
        uploadMeme,
        saveMeme,
        isMemeInSaved,
        updateUserProfile,
      }}
    >
      {children}
    </MemeContext.Provider>
  )
}

export function useMemeContext() {
  const context = useContext(MemeContext)
  if (context === undefined) {
    throw new Error("useMemeContext must be used within a MemeProvider")
  }
  return context
}

