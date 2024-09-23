"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon, RefreshCwIcon } from 'lucide-react'

interface EmployeeButtonProps {
  initialId: string | null
}

export default function Component({ initialId = null }: EmployeeButtonProps) {
  const [employeeId, setEmployeeId] = useState<string | null>(initialId)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleCheck = () => {
    setIsDisabled(true)
    setIsHovered(false) // Close hover state when checking
  }

  const handleRetry = () => {
    setEmployeeId(null)
    setIsDisabled(false)
    setIsHovered(false) // Close hover state when retrying
  }

  const handleMouseEnter = () => {
    if (!isDisabled) setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[280px] h-[72px] border-[#000072]"
          disabled={isDisabled}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered && employeeId ? (
            // Replace button content with Retry and Check when hovered
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
