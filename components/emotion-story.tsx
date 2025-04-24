"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface EmotionStoryProps {
  emotion: string
}

// Define story content based on emotions
const storyContent = {
  happy: {
    title: "The Unexpected Adventure",
    content: [
      "The sun was shining brightly as Maya stepped out of her apartment. She had a feeling today was going to be special, though she couldn't explain why.",
      "As she walked down the street, a colorful flyer caught her eye. 'Community Garden Volunteers Needed Today!' it announced in cheerful letters.",
      "On a whim, Maya decided to follow the address. When she arrived, she was greeted by a diverse group of neighbors, all working together to transform an empty lot into something beautiful.",
      "By the end of the day, Maya had dirt under her fingernails, new friends in her community, and a sense of accomplishment that made her heart feel full. Sometimes the best adventures are the ones we never planned for.",
    ],
    images: [
      "/placeholder.svg?height=300&width=500&text=Sunny+Day",
      "/placeholder.svg?height=300&width=500&text=Community+Flyer",
      "/placeholder.svg?height=300&width=500&text=Garden+Volunteers",
      "/placeholder.svg?height=300&width=500&text=Community+Garden",
    ],
  },
  sad: {
    title: "After the Rain",
    content: [
      "The rain had been falling for days, matching Thomas's mood perfectly. Ever since he lost his job, everything seemed gray and hopeless.",
      "Sitting by his window, watching droplets race down the glass, Thomas noticed an elderly neighbor struggling with groceries in the downpour.",
      "Without thinking, he grabbed his umbrella and rushed outside to help. The woman's grateful smile was the first warmth he'd felt in weeks.",
      "As they talked under the shelter of his umbrella, she mentioned her son's company was hiring. 'Sometimes,' she said, 'the universe has a way of washing away the old to make room for something new.' For the first time in days, Thomas felt a glimmer of hope.",
    ],
    images: [
      "/placeholder.svg?height=300&width=500&text=Rainy+Window",
      "/placeholder.svg?height=300&width=500&text=Elderly+Neighbor",
      "/placeholder.svg?height=300&width=500&text=Umbrella+Shelter",
      "/placeholder.svg?height=300&width=500&text=Glimmer+of+Hope",
    ],
  },
  angry: {
    title: "The Mountain Within",
    content: [
      "Alex slammed the door behind him, fury coursing through his veins. The argument with his boss had been the last straw in a week full of frustrations.",
      "Almost without conscious thought, he found himself driving to the hiking trail he hadn't visited in months. The steep path challenged his body while his mind continued to boil.",
      "With each step upward, each labored breath, something shifted. His anger, so overwhelming in the office, seemed smaller against the vastness of the mountain landscape.",
      "When he reached the summit, Alex sat in silence, watching the world below. The problems were still there, waiting for him to descend. But now he could see them from a different perspective, and somehow, that made all the difference.",
    ],
    images: [
      "/placeholder.svg?height=300&width=500&text=Slammed+Door",
      "/placeholder.svg?height=300&width=500&text=Hiking+Trail",
      "/placeholder.svg?height=300&width=500&text=Mountain+Climb",
      "/placeholder.svg?height=300&width=500&text=Mountain+Summit",
    ],
  },
  fear: {
    title: "The Shadow and the Light",
    content: [
      "Every night for weeks, Jamie had the same nightmare. A shadowy figure chasing her through endless corridors, never quite catching her but never far behind.",
      "Her therapist suggested something unconventional: 'Next time, in your dream, try turning around. Face what's chasing you.'",
      "That night, the dream began as usual. The corridors, the running, the fear. But this time, remembering her therapist's words, Jamie stopped. With her heart pounding, she slowly turned around.",
      "The shadow stopped too. As Jamie looked closer, the darkness began to dissolve, revealing not a monster but a reflection of herself – younger, scared, holding a forgotten memory she'd been running from for years. It was time to heal.",
    ],
    images: [
      "/placeholder.svg?height=300&width=500&text=Nightmare+Corridor",
      "/placeholder.svg?height=300&width=500&text=Therapist+Session",
      "/placeholder.svg?height=300&width=500&text=Facing+Fear",
      "/placeholder.svg?height=300&width=500&text=Shadow+Dissolving",
    ],
  },
  surprise: {
    title: "The Unexpected Gift",
    content: [
      "The package sat on Eliza's doorstep, unmarked except for her name. She hadn't ordered anything, and her birthday was months away.",
      "Curiosity piqued, she carefully opened it to find a beautiful antique compass nestled in velvet. Underneath was a note that simply read: 'Sometimes we need help finding our true north. Your journey begins now.'",
      "The compass needle spun wildly before settling on a direction that pointed away from her usual route to work. On impulse, Eliza decided to follow it.",
      "That decision led her to a hidden art gallery, a conversation with a stranger who would become important in her life, and eventually, to discovering a passion she had long forgotten. The anonymous gift had changed everything.",
    ],
    images: [
      "/placeholder.svg?height=300&width=500&text=Mystery+Package",
      "/placeholder.svg?height=300&width=500&text=Antique+Compass",
      "/placeholder.svg?height=300&width=500&text=Following+Direction",
      "/placeholder.svg?height=300&width=500&text=Hidden+Gallery",
    ],
  },
  disgust: {
    title: "The Garden Transformation",
    content: [
      "The abandoned lot behind Raj's new apartment was a mess – overgrown, littered with trash, and neglected for years. Every time he looked out his window, he felt a wave of revulsion.",
      "One morning, instead of just complaining, Raj put on gloves and filled a trash bag. It barely made a dent, but he returned the next day. And the next.",
      "Neighbors noticed. First one joined him, then another. Someone brought seeds and starter plants. Another brought tools. The revulsion that had initially driven Raj transformed into determination.",
      "Six months later, the space that had once disgusted him had become a community garden, bursting with vegetables, flowers, and neighbors who had become friends. What he once couldn't bear to look at had become the view he most cherished.",
    ],
    images: [
      "/placeholder.svg?height=300&width=500&text=Abandoned+Lot",
      "/placeholder.svg?height=300&width=500&text=Cleanup+Effort",
      "/placeholder.svg?height=300&width=500&text=Community+Joining",
      "/placeholder.svg?height=300&width=500&text=Transformed+Garden",
    ],
  },
  neutral: {
    title: "The Ordinary Day",
    content: [
      "Nothing about Tuesday seemed remarkable to Jamie. The morning routine, the commute, the emails waiting in the inbox – all perfectly ordinary.",
      "During lunch, rather than eating at his desk as usual, Jamie decided on a whim to sit in the small park across from the office.",
      "Watching people pass by – a child chasing pigeons, an elderly couple holding hands, a street musician lost in her melody – Jamie began to notice the quiet beauty in these everyday moments.",
      "The afternoon was still filled with ordinary tasks, but something had shifted. Jamie had discovered that even the most routine day contains countless small wonders, if only we take the time to notice them.",
    ],
    images: [
      "/placeholder.svg?height=300&width=500&text=Office+Routine",
      "/placeholder.svg?height=300&width=500&text=Park+Bench",
      "/placeholder.svg?height=300&width=500&text=People+Watching",
      "/placeholder.svg?height=300&width=500&text=Everyday+Beauty",
    ],
  },
}

export default function EmotionStory({ emotion }: EmotionStoryProps) {
  const [currentPage, setCurrentPage] = useState(0)

  const story = storyContent[emotion as keyof typeof storyContent] || storyContent.neutral

  const nextPage = () => {
    if (currentPage < story.content.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="text-center">
        <h2 className={`text-2xl font-bold gradient-text ${emotion}-gradient`}>{story.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">A story tailored to your {emotion} mood</p>
      </div>

      <div className="overflow-hidden rounded-lg mb-4">
        <Image
          src={story.images[currentPage] || "/placeholder.svg"}
          alt={`Illustration for ${story.title}, page ${currentPage + 1}`}
          width={500}
          height={300}
          className="w-full object-cover"
        />
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="text-lg leading-relaxed">{story.content[currentPage]}</p>
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={prevPage} disabled={currentPage === 0} className="gap-1">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Page {currentPage + 1} of {story.content.length}
        </div>

        <Button onClick={nextPage} disabled={currentPage === story.content.length - 1} className="gap-1">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

