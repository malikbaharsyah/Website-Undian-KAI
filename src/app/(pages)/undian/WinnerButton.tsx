"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/app/components/ui/button"
import {
  Popover,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { CheckIcon, RefreshCwIcon } from 'lucide-react'
import { useLottery } from './LotteryContext'
import useFetchAPI from '../../components/hooks/fetchAPI'

interface EmployeeButtonProps {
  initialId: string | null
  name: string
  position: string
  isShuffling: boolean
  updateHandledStatus: (isHandled: boolean) => void
}

export default function WinnerButton({ initialId = null, name, position, isShuffling, updateHandledStatus }: EmployeeButtonProps) {
  const [employeeId, setEmployeeId] = useState<string | null>(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isHandled, setIsHandled] = useState(false)
  // const [isRetrying, setIsRetrying] = useState(false)
  const fetchAPI = useFetchAPI();
  const { selectedPrize, selectedEvent } = useLottery()

  const handleCheck = () => {
    try {
      fetchAPI(`/winner-histories`, {
        method: 'POST',
        body: JSON.stringify({
          event_id: selectedEvent?.event_id,
          prize_id: selectedPrize?.prize_id,
          nipp: employeeId
        }),
      })
      setIsDisabled(true)
      setIsHovered(false)
      setIsHandled(true)
      // setIsRetrying(false)
      updateHandledStatus(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRetry = () => {
    setEmployeeId(null)
    setIsDisabled(false)
    setIsHovered(false)
    setIsHandled(true)
    // setIsRetrying(true)
    updateHandledStatus(true)
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
      // setIsRetrying(false)
    }
  }, [initialId, isShuffling, isDisabled, isHandled])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-[280px] h-[72px] font-bold text-3xl border-[#000072] text-[#000072] tracking-widest
            ${isDisabled ? "bg-[#23C552] text-white border-none" : "hover:bg-gray-100"}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered && employeeId && !isShuffling ? (
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
            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-3xl">{employeeId || ''}</span>
              {!isShuffling && (
                <div className="text-sm mt-1">
                  <span className="font-normal">{name}</span> - <span className="font-normal">{position}</span>
                </div>
              )}
            </div>
          )}
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}
