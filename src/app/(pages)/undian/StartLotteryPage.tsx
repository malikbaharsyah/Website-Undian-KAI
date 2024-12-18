import { useEffect, useRef, useState } from 'react'
import { Button } from "@/app/components/ui/button"
import WinnerButton from './WinnerButton'
import { WinnerDetail } from './WinnerButton'
import { useLottery } from './LotteryContext'
import { Slider } from "@/app/components/ui/slider";
import Confetti from 'react-confetti'
import Image from 'next/image';
import useFetchAPI from '@/app/components/hooks/fetchAPI';
import { useWindowSize } from 'react-use';



export default function StartLotteryPage(): JSX.Element {
    const { setStep, step, qty, setQty, selectedPrize, selectedEvent } = useLottery();

    const [participants, setParticipants] = useState<string[]>([]);
    const [currentParticipants, setCurrentParticipants] = useState<string[]>([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [speed, setSpeed] = useState(126);
    const [showConfetti, setShowConfetti] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const fetchAPI = useFetchAPI();
    const startSoundRef = useRef<HTMLAudioElement | null>(null);
    const stopSoundRef = useRef<HTMLAudioElement | null>(null);
    const [winnerDetails, setWinnerDetails] = useState<WinnerDetail[]>([]);

    const [buttonStatuses, setButtonStatuses] = useState<boolean[]>([]);
    const { width, height } = useWindowSize();
    const updateButtonHandledStatus = (index: number, isHandled: boolean) => {
        setButtonStatuses((prevStatuses) => {
            const newStatuses = [...prevStatuses];
            newStatuses[index] = isHandled;
            return newStatuses;
        });
    };

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
        setShowConfetti(false);
        if (startSoundRef.current) {
            startSoundRef.current.loop = true;
            startSoundRef.current.play();
        }
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setCurrentParticipants(() => {
                    const shuffledParticipants = shuffleParticipants(participants).slice(0, qty);
                    return shuffledParticipants;
                });
            }, speed);
        }
    };

    const handleStopShuffle = async () => {
        setIsShuffling(false);
        const winnersRes = await fetchAPI(`/winners/${selectedEvent?.event_id}`, {
            method: 'POST',
            body: JSON.stringify({
                winners: currentParticipants
            })
        })

        if (winnersRes.success) {
            const winnersData = winnersRes.data;
        
            const sortedWinnersData = winnersData.sort((a: WinnerDetail, b: WinnerDetail) => {
                const indexA = currentParticipants.indexOf(a.nipp);
                const indexB = currentParticipants.indexOf(b.nipp);
                return indexA - indexB;
            });
            setWinnerDetails(sortedWinnersData);
        }
        

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (startSoundRef.current) {
            startSoundRef.current.pause();
            startSoundRef.current.currentTime = 0;
        }
        if (stopSoundRef.current) {
            stopSoundRef.current.play();
        }

        setButtonStatuses(Array(currentParticipants.length).fill(false));
        setShowConfetti(true);
    };

    const handleSpeedChange = (value: number) => {
        setSpeed(251 - value);
        if (isShuffling && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                setCurrentParticipants(() => {
                    const shuffledParticipants = shuffleParticipants(participants).slice(0, qty);
                    return shuffledParticipants;
                });
            }, 251 - value);
        }
    };

    useEffect(() => {
  console.log("Component Rendered");

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
      <>
        <div className="p-6 space-y-6 flex-1 flex flex-col font-poppins relative overflow-hidden h-screen">
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={250} />}
            <h1 className="text-3xl font-bold text-[#000072]">{selectedEvent?.name}</h1>
            <div className="overflow-auto border-y flex-1">
                <div className="mb-6 flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-bold text-center mb-4 mt-8">{selectedPrize?.name}</h2>
                    <div className="relative w-full max-w-2xl flex justify-center">
                        <div className="absolute inset-0 bg-blue-300 rounded-full filter blur-3xl opacity-50"></div>
                        <Image
                            loader={({ src }) => src}
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${selectedPrize?.image}`}
                            alt="Prize"
                            width={320}
                            height={240}
                            className="relative rounded-lg max-w-[300px] max-h-[300px]"
                        />
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <div className="flex flex-wrap gap-6 mb-6 w-full justify-center">
                        {currentParticipants.map((participant, index) => (
                            <div key={index} className="flex-grow min-w-[200px] max-w-[280px]">
                                <WinnerButton 
                                    initialId={participant} 
                                    isShuffling={isShuffling} 
                                    updateHandledStatus={(isHandled) => updateButtonHandledStatus(index, isHandled)}
                                    winnerDetail={winnerDetails[index]}
                                    setWinnerDetail={(winnerDetail) => {
                                        setWinnerDetails((prevDetails) => {
                                            const newDetails = [...prevDetails];
                                            newDetails[index] = winnerDetail;
                                            return newDetails;
                                        });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-between space-x-4 items-end">
                <Button
                className="hover:bg-[#000072]/90 hover:text-white"
                variant="outline"
                onClick={() => { setStep(step - 1); setQty(0); }}
                disabled={isShuffling || buttonStatuses.some((status) => !status)}
                >
                    Choose Prize
                </Button>
            <div className="space-y-3 justify-center items-center flex flex-col">
                <Slider
                    defaultValue={[125]}
                    onValueChange={(value) => handleSpeedChange(value[0])}
                    max={250}
                    min={1}
                    step={1}
                    className="w-60"
                />
                <p>Current Speed: {251 - speed}</p>
            </div>
            <Button
    className="bg-[#000072] hover:bg-[#000072]/90 text-white"
    onClick={() => { isShuffling ? handleStopShuffle() : handleStartShuffle(); setIsShuffling(!isShuffling) }}
    disabled={buttonStatuses.some((status) => !status)}
>
    {isShuffling ? 'Stop' : 'Start'}
</Button>
            </div>
            <audio ref={startSoundRef} src="/sounds/tick.mp3" />
            <audio ref={stopSoundRef} src="/sounds/celebration.mp3" />
        </div>
      </>
    )
}