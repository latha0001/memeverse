"use client"

import { useState, useEffect } from "react"
import { MemeGrid } from "@/components/meme-grid"
import { MemeFilters } from "@/components/meme-filters"
import { MemeSearch } from "@/components/meme-search"
import { useMemeContext } from "@/context/meme-context"
import { Loader2 } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

export default function ExplorePage() {
  const { memes, loading, fetchMemes, hasMore } = useMemeContext()
  const [category, setCategory] = useState("trending")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("likes")
  const [page, setPage] = useState(1)

  const { ref, inView } = useInView({
    threshold: 0.1,
  })

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
      fetchMemes(1, category, searchQuery, sortBy)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, category, sortBy, fetchMemes]) // Added fetchMemes to dependencies

  // Handle infinite scroll
  useEffect(() => {
    if (inView && hasMore && !loading) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchMemes(nextPage, category, searchQuery, sortBy, true)
    }
  }, [inView, hasMore, loading, page, category, searchQuery, sortBy, fetchMemes]) // Added page and category to dependencies

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    setPage(1)
  }

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
    setPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Explore Memes</h1>
        <p className="text-muted-foreground">
          Discover the best memes from around the internet. Filter by category, search, and sort to find your favorites.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <MemeSearch value={searchQuery} onChange={setSearchQuery} />
        <div className="flex flex-wrap gap-4">
          <MemeFilters
            category={category}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      <MemeGrid memes={memes} />

      {loading && (
        <div className="flex justify-center my-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!loading && memes.length === 0 && (
        <div className="text-center my-16">
          <h3 className="text-2xl font-bold">No memes found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Intersection observer target for infinite scrolling */}
      {hasMore && <div ref={ref} className="h-10" />}
    </div>
  )
}

