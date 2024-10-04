"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon, RefreshCwIcon } from 'lucide-react'
import { useLottery } from './LotteryContext'
import fetchAPI from '../components/hooks/fetchAPI'

interface EmployeeButtonProps {
  initialId: string | null
  isShuffling: boolean
}

export default function WinnerButton({ initialId = null, isShuffling }: EmployeeButtonProps) {
  const [employeeId, setEmployeeId] = useState<string | null>(initialId)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const { selectedPrize, selectedEvent } = useLottery()

  const handleCheck = () => {
    try {
      fetchAPI(`/winner-histories`,
        {
          method : 'POST',
          body : JSON.stringify({
            event_id: selectedEvent?.event_id,
            prize_id: selectedPrize?.prize_id,
            nipp: employeeId
          }),
        }
      )
      setIsDisabled(true)
      setIsHovered(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRetry = () => {
    setEmployeeId(null)
    setIsDisabled(false)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    if (!isDisabled) setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  useEffect(() => {
    if (!isDisabled && isShuffling) {
      setEmployeeId(initialId)
    }
  }, [initialId, isShuffling, isDisabled])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          // className={"w-[280px] h-[72px] font-bold text-2xl" + (isDisabled ? "" : "border-[#000072] text-[#000072]")}
          className={`w-[280px] h-[72px] font-bold text-2xl border-[#000072] text-[#000072] 
            ${isDisabled ? "bg-[#23C552] text-white border-none" : "hover:bg-gray-100"}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered && employeeId ? (
            <div className="flex w-full justify-between">
              <Button 
                className="flex-1 rounded-none hover:text-red-500" 
                variant="ghost" 
                onClick={handleRetry}
              >
                <RefreshCwIcon className="mr-2 h-6 w-6" />
              </Button>
              <Button 
                className="flex-1 rounded-none hover:text-green-500" 
                variant="ghost"
                onClick={handleCheck}
              >
                <CheckIcon className="mr-2 h-6 w-6" />
              </Button>
            </div>
          ) : (
            employeeId ? `${employeeId}` : ''
          )}
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}
