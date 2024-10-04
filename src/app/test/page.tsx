"use client"

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface Participant {
  id: number;
  name: string;
}

const participants: Participant[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
  { id: 4, name: "Alice Williams" },
  { id: 5, name: "Charlie Brown" },
  { id: 6, name: "Dave Wilson" },
  { id: 7, name: "Emily Davis" },
  { id: 8, name: "Frank Miller" },
  { id: 9, name: "Grace Lee" },
  { id: 10, name: "Henry Ford" },
];

export default function ShufflePage(): JSX.Element {
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [speed, setSpeed] = useState(250);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartShuffle = () => {
    setIsShuffling(true);
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * participants.length);
        setCurrentParticipant(participants[randomIndex]);
      }, speed);
    }
  };

  const handleStopShuffle = () => {
    setIsShuffling(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleSpeedChange = (value: number) => {
    setSpeed(value);
    if (isShuffling && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * participants.length);
        setCurrentParticipant(participants[randomIndex]);
      }, value);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="p-6 space-y-6 flex-1 flex flex-col items-center bg-white text-black">
      <h1 className="text-3xl font-bold text-[#000072]">Live Shuffle</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shuffling Participant</h2>
        <div className="p-4 bg-gray-200 rounded-md text-xl font-bold">
          {currentParticipant ? currentParticipant.name : "No participant selected"}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Speed (ms)</h2>
        <Slider
          defaultValue={[speed]}
          onValueChange={(value) => handleSpeedChange(value[0])}
          max={250}
          min={1}
          step={1}
        />
        <p>current Speed: {speed} ms</p>
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={handleStartShuffle}
          disabled={isShuffling}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Start Shuffle
        </Button>
        <Button
          onClick={handleStopShuffle}
          disabled={!isShuffling}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Stop Shuffle
        </Button>
      </div>
    </div>
  );
}
