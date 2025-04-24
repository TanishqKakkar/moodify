"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import AuthCheck from "@/components/auth-check";

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
    image: "/smiley.jpg", // <-- Correct path for Next.js public folder
  },
  title2: "The Lucky Penny",
  content2: [
    "Jamie was running late for work when he noticed a shiny penny lying heads-up on the sidewalk.",
    "He paused, smiled, and picked it up, remembering his grandmother’s words: 'A lucky penny means something good is coming your way.'",
    "That afternoon, his boss called him into the office—not for a reprimand, but to offer him a promotion for his consistent hard work.",
    "Jamie walked home grinning, the penny safe in his pocket, a small reminder that even the tiniest moments can hold joy."
  ],
  title3: "The Piano in the Park",
  content3: [
    "On her daily walk through the park, Anya heard the faint sound of piano music echoing through the trees.",
    "Curious, she followed it and discovered an old upright piano placed near a bench, with a handwritten sign: 'Play me.'",
    "A little boy was playing a simple melody, his fingers uncertain but eager. Anya, a retired music teacher, sat beside him and gently joined in.",
    "Soon, a crowd gathered, clapping as the two played together. That spontaneous duet brought smiles to everyone around—and sparked a new friendship for Anya and the boy."
  ],
  sad: {
    title: "After the Rain",
    content: [
      "The rain had been falling for days, matching Thomas's mood perfectly. Ever since he lost his job, everything seemed gray and hopeless.",
      "Sitting by his window, watching droplets race down the glass, Thomas noticed an elderly neighbor struggling with groceries in the downpour.",
      "Without thinking, he grabbed his umbrella and rushed outside to help. The woman's grateful smile was the first warmth he'd felt in weeks.",
      "As they talked under the shelter of his umbrella, she mentioned her son's company was hiring. 'Sometimes,' she said, 'the universe has a way of washing away the old to make room for something new.' For the first time in days, Thomas felt a glimmer of hope.",
    ],
    image: "/after_the_rain.jpeg",
  },
  angry: {
    title: "The Mountain Within",
    content: [
      "Alex slammed the door behind him, fury coursing through his veins. The argument with his boss had been the last straw in a week full of frustrations.",
      "Almost without conscious thought, he found himself driving to the hiking trail he hadn't visited in months. The steep path challenged his body while his mind continued to boil.",
      "With each step upward, each labored breath, something shifted. His anger, so overwhelming in the office, seemed smaller against the vastness of the mountain landscape.",
      "When he reached the summit, Alex sat in silence, watching the world below. The problems were still there, waiting for him to descend. But now he could see them from a different perspective, and somehow, that made all the difference.",
    ],
    image: "/mountain_within.jpeg",
  },
  surprised: {
    title: "The Unexpected Gift",
    content: [
      "The package sat on Eliza's doorstep, unmarked except for her name. She hadn't ordered anything, and her birthday was months away.",
      "Curiosity piqued, she carefully opened it to find a beautiful antique compass nestled in velvet. Underneath was a note that simply read: 'Sometimes we need help finding our true north. Your journey begins now.'",
      "The compass needle spun wildly before settling on a direction that pointed away from her usual route to work. On impulse, Eliza decided to follow it.",
      "That decision led her to a hidden art gallery, a conversation with a stranger who would become important in her life, and eventually, to discovering a passion she had long forgotten. The anonymous gift had changed everything.",
    ],
    image: "/the_unexpected_surprise.png",
  },
  neutral: {
    title: "The Ordinary Day",
    content: [
      "Nothing about Tuesday seemed remarkable to Jamie. The morning routine, the commute, the emails waiting in the inbox – all perfectly ordinary.",
      "During lunch, rather than eating at his desk as usual, Jamie decided on a whim to sit in the small park across from the office.",
      "Watching people pass by – a child chasing pigeons, an elderly couple holding hands, a street musician lost in her melody – Jamie began to notice the quiet beauty in these everyday moments.",
      "The afternoon was still filled with ordinary tasks, but something had shifted. Jamie had discovered that even the most routine day contains countless small wonders, if only we take the time to notice them.",
    ],
    image: "/ordinary_day.jpg",
  },
};

export default function StoryPage() {
  const [emotion, setEmotion] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [story, setStory] = useState<any>(null);
  const [isClient, setIsClient] = useState(false); // <-- Add this line
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // <-- Add this line
    const detectedEmotion = localStorage.getItem("emotion");
    const normalizedEmotion = detectedEmotion ? detectedEmotion.toLowerCase() : "neutral";
    if (normalizedEmotion && storyContent[normalizedEmotion as keyof typeof storyContent]) {
      setEmotion(normalizedEmotion);
      setStory(storyContent[normalizedEmotion as keyof typeof storyContent]);
    } else {
      setEmotion("neutral");
      setStory(storyContent.neutral);
    }
  }, []);

  // Only render after client-side hydration
  if (!isClient || !story) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <p>Loading your personalized story...</p>
      </div>
    );
  }

  const nextPage = () => {
    if (story && currentPage < story.content.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      router.push("/feedback");
    }
  };

  if (!story) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <p>Loading your personalized story...</p>
      </div>
    );
  }

  return (
    <AuthCheck>
      <div className="container flex min-h-screen flex-col py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">{story.title}</h1>
          <p className="mt-2 text-muted-foreground">A story tailored to your {emotion} mood</p>
        </div>

        <Card className="mx-auto w-full max-w-4xl">
          <CardContent className="p-6 md:p-10">
            <div className="mb-8 overflow-hidden rounded-lg">
              {/* Hardcoded image for testing */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg"
                alt="Hardcoded test image"
                width={500}
                height={300}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed">{story.content[currentPage]}</p>
            </div>

            <div className="mt-8 flex justify-between">
              <div className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {story.content.length}
              </div>
              <Button onClick={nextPage} className="gap-1">
                {currentPage < story.content.length - 1 ? "Next Page" : "Finish Story"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthCheck>
  );
}
