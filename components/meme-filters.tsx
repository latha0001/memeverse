"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowDownAZ, ArrowUpDown, Flame, Clock, Star, Shuffle } from "lucide-react"

interface MemeFiltersProps {
  category: string
  onCategoryChange: (category: string) => void
  sortBy: string
  onSortChange: (sortBy: string) => void
}

export function MemeFilters({ category, onCategoryChange, sortBy, onSortChange }: MemeFiltersProps) {
  const categories = [
    { id: "trending", label: "Trending", icon: <Flame className="h-4 w-4 mr-2" /> },
    { id: "new", label: "New", icon: <Clock className="h-4 w-4 mr-2" /> },
    { id: "classic", label: "Classic", icon: <Star className="h-4 w-4 mr-2" /> },
    { id: "random", label: "Random", icon: <Shuffle className="h-4 w-4 mr-2" /> },
  ]

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button key={cat.id} variant={category === cat.id ? "default" : "outline"} size="sm" onClick={() => onCategoryChange(cat.id)}className="flex items-center"> {cat.icon} {cat.label}</Button>
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort by
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onSortChange("likes")}>
            <Flame className="h-4 w-4 mr-2" />
            Most Liked
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("date")}>
            <Clock className="h-4 w-4 mr-2" />
            Newest First
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("comments")}>
            <ArrowDownAZ className="h-4 w-4 mr-2" />
            Most Comments
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

