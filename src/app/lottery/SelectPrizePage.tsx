import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Prize from "../components/interfaces/Prize"
import CustomCarousel from "../components/CustomCarousel"
import fetchAPI from "../components/hooks/fetchAPI"
import { Input } from "@/components/ui/input"
import { useLottery } from "./LotteryContext"

export default function SelectPrizePage(): JSX.Element {
    
    const [prizes, setPrizes] = useState<Prize[]>([]);
    const { setStep, step, selectedEvent,
      setSelectedEvent, setQty, qty, selectedPrize, setSelectedPrize
    } = useLottery();

    useEffect(() => {
      fetchAPI(`/events/${selectedEvent?.event_id}`)
        .then((prizesRes) => {
          return fetchAPI(`/winner-histories/${selectedEvent?.event_id}`).then((whRes) => {
            const winnerHistory = whRes.data;
    
            const prizeCount = winnerHistory.reduce((acc: any, curr: any) => {
              acc[curr.prize.prize_id] = (acc[curr.prize.prize_id] || 0) + 1;
              return acc;
            }, {});
    
            const availablePrizes = prizesRes.data
              .map((prize: Prize) => {
                prize.quantity = prize.quantity - (prizeCount[prize.prize_id] || 0);
                return prize;
              })
              .filter((prize: Prize) => prize.quantity > 0);
    
            setPrizes(availablePrizes);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }, [selectedEvent]);
    

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = parseInt(e.target.value);
      if (inputValue < 0) {
        inputValue = 0;
      } else if (selectedPrize && inputValue > selectedPrize.quantity) {
        inputValue = 1;
      }
      setQty(inputValue);
    };

    return (
        <div className="p-6 space-y-6 flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-[#000072]">
            {selectedEvent?.name}
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
              <Input
                type="number"
                defaultValue="0"
                value={qty}
                min={0}
                max={selectedPrize?.quantity}
                onChange={(e) => handleQuantityChange(e)}
                className="border rounded-md px-3 py-2 w-[75px] text-center"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              className="border-[#000072] text-[#000072] hover:bg-[#000072] hover:text-white"
              onClick={() => { setStep(step-1); setSelectedEvent(null); }}
            >
              Back
            </Button>
            <Button 
              className="bg-[#000072] hover:bg-[#000072]/90 text-white"
              onClick={() => setStep(step+1)}
              disabled={
                (step === 2 && qty === 0)
              }
            >
              Next
            </Button>
          </div>
        </div>
    )
}
