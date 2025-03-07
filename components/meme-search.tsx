"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface MemeSearchProps {
  value: string
  onChange: (value: string) => void
}

export function MemeSearch({ value, onChange }: MemeSearchProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input type="search" placeholder="Search memes..." className="pl-10" value={value} onChange={(e) => onChange(e.target.value)}/>
    </div>
  )
}

