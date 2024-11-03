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

export interface WinnerDetail {
  nipp: string;
  name: string;
  operating_area: string;
}

interface EmployeeButtonProps {
  initialId: string | null
  isShuffling: boolean
  updateHandledStatus: (isHandled: boolean) => void
  winnerDetail: WinnerDetail | null
  setWinnerDetail: (winnerDetail: WinnerDetail) => void
}

export default function WinnerButton({ initialId = null, isShuffling, updateHandledStatus, winnerDetail, setWinnerDetail }: EmployeeButtonProps) {
  const [employeeId, setEmployeeId] = useState<string | null>(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isHandled, setIsHandled] = useState(false)
  const fetchAPI = useFetchAPI();
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
      setIsHandled(true)
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
    setWinnerDetail({ nipp: '', name: '', operating_area: '' })
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
    }
    if (isDisabled && isHandled) {
      updateHandledStatus(true)
    }
  }, [initialId, isShuffling, isDisabled, isHandled, winnerDetail])

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
                  <span className="font-normal">{winnerDetail?.name}</span> - <span className="font-normal">{winnerDetail?.operating_area}</span>
                </div>
              )}
            </div>
          )}
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}