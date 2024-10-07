'use client'

import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Prize from "../components/interfaces/Prize"

interface CustomCarouselProps {
  prizes: Prize[]
  setSelectedPrize: (prize: Prize | null) => void
}

export default function CustomCarousel({ prizes, setSelectedPrize }: CustomCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    setSelectedPrize(prizes[currentIndex])
  }, [currentIndex, prizes, setSelectedPrize])

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + prizes.length) % prizes.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % prizes.length)
  }

  const renderPrizeCard = (prize: Prize, offset: number) => (
    <motion.div
      key={prize.prize_id}
      className={`absolute w-64 h-64 ${
        offset === 0 ? "z-10" : "z-0 opacity-50"
      }`}
      custom={direction}
      initial={{
        x: direction === 1 ? 300 : -300,
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        x: offset * 280,
        opacity: offset === 0 ? 1 : 0.75,
        scale: offset === 0 ? 1.25 : 0.75,
      }}
      exit={{
        x: direction === 1 ? -300 : 300,
        opacity: 0,
        scale: 0.75,
      }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
        <img
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${prize.image}`}
          alt={prize.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{prize.name}</h3>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      <div className="flex items-center justify-center h-[350px] perspective-1000">
        <AnimatePresence initial={false} custom={direction}>
          {prizes.length === 1 ? (
            renderPrizeCard(prizes[0], 0)
          ) : prizes.length === 2 ? (
            prizes.map((prize, index) => renderPrizeCard(prize, index - currentIndex))
          ) : (
            [-1, 0, 1].map((offset) => {
              const index = (currentIndex + offset + prizes.length) % prizes.length
              return renderPrizeCard(prizes[index], offset)
            })
          )}
        </AnimatePresence>
      </div>
      {prizes.length > 1 && (
        <>
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
        </>
      )}
    </div>
  )
}