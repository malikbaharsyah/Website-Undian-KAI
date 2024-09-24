import { Button } from "@/components/ui/button"
import { useState } from "react"
import Prize from "../interfaces/Prize"
import CustomCarousel from "../CustomCarousel"

interface SelectPrizePageProps {
    setStep: (step: number) => void
    prizes: Prize[]
    step: number
}

export default function SelectPrizePage({setStep, prizes, step}: SelectPrizePageProps): JSX.Element {
    const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null)
    
    return (
        <div className="p-6 space-y-6 flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-[#000072]">
            Jalan Sehat 17 Agustus
          </h1>

          <div className="space-y-4 flex-1">
            <h2 className="text-xl font-semibold">Select Prize</h2>
            <CustomCarousel prizes={prizes} setSelectedPrize={setSelectedPrize}/>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Input Quantity(s)</h2>
              <p className="text-sm text-gray-400">Maximum {selectedPrize?.quantity} pcs.</p>
              <input
                type="number"
                defaultValue="0"
                className="border rounded-md px-3 py-2 w-[50px] text-center"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              className="border-[#000072] text-[#000072] hover:bg-[#000072] hover:text-white"
              onClick={() => setStep(step-1)}
            >
              Back
            </Button>
            <Button className="bg-[#000072] hover:bg-[#000072]/90 text-white"
            onClick={() => setStep(step+1)}>
              Next
            </Button>
          </div>
        </div>
    )
}