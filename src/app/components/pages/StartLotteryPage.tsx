import { useState } from 'react'
import { Button } from "@/components/ui/button"
import WinnerButton from '../WinnerButton'

interface StartLotteryPageProps {
    setStep: (step: number) => void
    step: number
    numOfWinners: number
}

export default function StartLotteryPage({ setStep, step, numOfWinners }: StartLotteryPageProps): JSX.Element {
    const [selectedNumber, setSelectedNumber] = useState<string | null>(null)
    const [isStarting, setIsStarting] = useState(false)

    const numbers = Array.from({ length: numOfWinners }, () =>
        Math.floor(10000 + Math.random() * 90000).toString()
    )

    const handleStart = () => {
        if (isStarting) {
            const randomIndex = Math.floor(Math.random() * numbers.length)
            setSelectedNumber(numbers[randomIndex])
        }

    }

    return (
        <div className="p-6 space-y-6 flex-1 flex flex-col font-poppins">
            <h1 className="text-3xl font-bold text-[#000072]">Jalan Sehat 17 Agustus</h1>
            <div className="mb-6 flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold text-center mb-4 mt-8">Fortuner GR</h2>
                <div className="relative w-full max-w-2xl flex justify-center">
                    <div className="absolute inset-0 bg-blue-300 rounded-full filter blur-3xl opacity-50"></div>
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Prize"
                        className="relative rounded-lg max-w-[300px] max-h-[300px]"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 flex-1 justify-center items-center">
                {numbers.map((number, index) => (
                    <div key={index} className="flex justify-center items-center h-full">
                        <WinnerButton initialId={null}/>
                    </div>
                ))}
            </div>
            <div className="flex justify-between space-x-4">
                <Button className='hover:bg-[#000072]/90 hover:text-white' variant="outline" onClick={() => setStep(step - 1)}>
                    Choose Prize
                </Button>
                <Button className="bg-[#000072] hover:bg-[#000072]/90 text-white" onClick={() => setIsStarting(!isStarting)}>
                    {isStarting ? 'Stop' : 'Start'}
                </Button>
            </div>
        </div>
    )
}
