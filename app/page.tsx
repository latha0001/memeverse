import { Button } from "@/components/ui/button"
import { TrendingMemes } from "@/components/trending-memes"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Trending Memes</h2>
          <Link href="/explore">
            <Button variant="ghost" className="group">
              View all
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <TrendingMemes />
      </section>

      <section className="my-16 rounded-xl bg-muted p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 max-w-md">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none border-transparent bg-primary text-primary-foreground">
              <Sparkles className="mr-1 h-3 w-3" />
              New Feature
            </div>
            <h2 className="text-3xl font-bold">Create Your Own Memes</h2>
            <p className="text-muted-foreground">
              Unleash your creativity with our meme generator. Add captions, customize templates, and share your
              creations with the world.
            </p>
            <Link href="/upload">
              <Button size="lg">
                Create a Meme
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative w-full max-w-sm h-64 rounded-lg overflow-hidden border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <p className="text-xl font-bold text-center px-4">Your meme masterpiece awaits!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="my-16">
        <h2 className="text-3xl font-bold mb-8">Why Join MemeVerse?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h3 className="text-xl font-bold mb-2">Discover</h3>
            <p className="text-muted-foreground">
              Explore thousands of memes across different categories and find your favorites.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h3 className="text-xl font-bold mb-2">Create</h3>
            <p className="text-muted-foreground">
              Use our easy-to-use meme generator to create and share your own memes.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h3 className="text-xl font-bold mb-2">Connect</h3>
            <p className="text-muted-foreground">
              Join a community of meme enthusiasts, share laughs, and climb the leaderboard.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

