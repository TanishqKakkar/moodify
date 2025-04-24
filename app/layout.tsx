import type { Metadata } from "next";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

// Fonts
const inter = Inter({ subsets: ["latin"] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Metadata
export const metadata: Metadata = {
  title: "Moodify | Emotional Digital Experiences",
  description: "Transform your emotions into immersive digital landscapes and music",
  generator: "v0.dev",
};

// Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {/* Remove the header with SignedOut/SignedIn buttons */}
            {children}
            <Toaster />
            {/* Move nav to a footer and center it */}
            <footer className="w-full flex justify-center py-4">
              <nav>
                <a href="/terms" className="mx-2 text-sm text-muted-foreground hover:underline">Terms</a>
                <a href="/privacy" className="mx-2 text-sm text-muted-foreground hover:underline">Privacy</a>
              </nav>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
