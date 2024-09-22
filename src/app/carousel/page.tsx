"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const cards = [
  {
    id: 1,
    title: "Mountain Retreat",
    description: "Escape to the serene mountains for a peaceful getaway.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Beach Paradise",
    description: "Relax on pristine beaches with crystal clear waters.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "City Adventure",
    description: "Explore vibrant city life and cultural attractions.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Forest Expedition",
    description: "Discover the wonders of lush, green forests.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "Desert Oasis",
    description: "Experience the magic of vast, golden deserts.",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function Component() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // Track direction: -1 for left, 1 for right

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      <div className="flex items-center justify-center h-[500px] perspective-1000">
        <AnimatePresence initial={false} custom={direction}>
          {[-1, 0, 1].map((offset) => {
            const index = (currentIndex + offset + cards.length) % cards.length
            const card = cards[index]

            return (
              <motion.div
                key={card.id}
                className={`absolute w-64 h-96 ${
                  offset === 0 ? "z-10" : "z-0 opacity-50"
                }`}
                custom={direction} // Use direction in animation
                initial={{
                  x: direction === 1 ? 300 : -300, // Enter from left or right
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  x: offset * 280,
                  opacity: offset === 0 ? 1 : 0.7,
                  scale: offset === 0 ? 1 : 0.8,
                }}
                exit={{
                  x: direction === 1 ? -300 : 300, // Exit to left or right
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2"
        onClick={handlePrev}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
        onClick={handleNext}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
