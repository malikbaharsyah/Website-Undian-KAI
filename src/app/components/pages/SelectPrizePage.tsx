import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Prize from "../interfaces/Prize"
import CustomCarousel from "../CustomCarousel"
import fetchAPI from "../hooks/fetchAPI"

interface SelectPrizePageProps {
    setStep: (step: number) => void
    step: number
    selectedEventId: number
}

export default function SelectPrizePage({setStep, step, selectedEventId}: SelectPrizePageProps): JSX.Element {
    const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
    const [prizes, setPrizes] = useState<Prize[]>([]);

    useEffect(() => {
      fetchAPI(`/events/${selectedEventId}`)
      .then((data) => {
        setPrizes(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }, [selectedEventId]);

    return (
        <div className="p-6 space-y-6 flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-[#000072]">
            Jalan Sehat 17 Agustus
          </h1>

          <div className="space-y-4 flex-1">
            <h2 className="text-xl font-semibold">Select Prize</h2>
            {prizes.length > 0 ? (
              <CustomCarousel prizes={prizes} setSelectedPrize={setSelectedPrize}/>
            ) : (
              <p className="text-gray-500">No prizes available for this event.</p>
            )}
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
            <Button className="bg-[#000072] hover:bg-[#000072]/90 text-white">
              Next
            </Button>
          </div>
        </div>
    )
}