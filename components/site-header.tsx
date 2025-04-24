"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export function SiteHeader() {
  const pathname = usePathname()

  // Don't show header on auth pages
  if (pathname === "/login" || pathname === "/register") {
    return null
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Music className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Moodify</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/about" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              About Us
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* Show Login/Sign up only when signed out */}
          <SignedOut>
            <div className="hidden sm:flex gap-2">
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors ml-4">
                  Sign up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
          {/* Show user button when signed in */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}

