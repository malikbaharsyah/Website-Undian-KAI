import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import WinnerButton from './WinnerButton'
import { useLottery } from './LotteryContext'
import Participant from '../components/interfaces/Participant'
import { Slider } from "@/components/ui/slider";
import fetchAPI from '../components/hooks/fetchAPI'

export default function StartLotteryPage(): JSX.Element {
    const [selectedNumber, setSelectedNumber] = useState<string | null>(null)
    const { setStep, step, qty, setQty, selectedPrize,
        selectedEvent,
     } = useLottery()

    const [participants, setParticipants] = useState<string[]>([])
    const [currentParticipants, setCurrentParticipants] = useState<string[]>([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [speed, setSpeed] = useState(250);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const numbers = Array.from({ length: qty }, () =>
        Math.floor(10000 + Math.random() * 90000).toString()
    )

    const shuffleParticipants = (array: string[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };
      

      const handleStartShuffle = () => {
        setIsShuffling(true);
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
            setCurrentParticipants((prev) => {
              const shuffledParticipants = shuffleParticipants(participants).slice(0, qty);
              return shuffledParticipants;
            });
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
            setCurrentParticipants(() => {
              const shuffledParticipants = shuffleParticipants(participants).slice(0, qty);
              return shuffledParticipants;
            });
          }, value);
        }
      };

    useEffect(() => {
        fetchAPI(`/participants/${selectedEvent?.event_id}`)
          .then((data) => {
            setParticipants(data.data);
            setCurrentParticipants(data.data.slice(0, qty));
          })
          .catch((error) => {
            console.error(error);
          });
    
        return () => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        };
      }, [qty, selectedEvent?.event_id]);

    return (
        <div className="p-6 space-y-6 flex-1 flex flex-col font-poppins">
            <h1 className="text-3xl font-bold text-[#000072]">{selectedEvent?.name}</h1>
            <div className="mb-6 flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold text-center mb-4 mt-8">{selectedPrize?.name}</h2>
                <div className="relative w-full max-w-2xl flex justify-center">
                    <div className="absolute inset-0 bg-blue-300 rounded-full filter blur-3xl opacity-50"></div>
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${selectedPrize?.image}`}
                        alt="Prize"
                        className="relative rounded-lg max-w-[300px] max-h-[300px]"
                    />
                </div>
            </div>
            <div className="grid flex-1 gap-6 mb-6 w-full
                grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                place-items-center justify-items-center"
                >
                    {currentParticipants.map((participant, index) => (
                        <div key={index} className="w-full max-w-[280px]">
                            <WinnerButton initialId={participant} isShuffling={isShuffling}/>
                        </div>
                    ))}
            </div>
            <div className="space-y-4 justify-center items-center flex flex-col">
                <h2 className="text-xl font-semibold">Speed (ms)</h2>
                    <Slider
                        defaultValue={[speed]}
                        onValueChange={(value) => handleSpeedChange(value[0])}
                        max={250}
                        min={1}
                        step={1}
                        className='w-60'
                        />
                    <p>current Speed: {speed} ms</p>
            </div>
            <div className="flex justify-between space-x-4">
                <Button className='hover:bg-[#000072]/90 hover:text-white' variant="outline" onClick={() => { setStep(step - 1); setQty(0);}}>
                    Choose Prize
                </Button>
                <Button className="bg-[#000072] hover:bg-[#000072]/90 text-white"
                onClick={() => {isShuffling ? handleStopShuffle() : handleStartShuffle(); setIsShuffling(!isShuffling)}}
                >
                    {isShuffling ? 'Stop' : 'Start'}
                </Button>
            </div>
        </div>
    )
}
