'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert'
import { motion, AnimatePresence } from 'framer-motion'

type AlertType = 'loading' | 'error' | 'success' | null

interface AlertContextType {
  showAlert: (type: AlertType, message: string | null) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alertType, setAlertType] = useState<AlertType>(null)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)

  useEffect(() => {
    const storedAlert = localStorage.getItem('alert')
    if (storedAlert) {
      const { type, message, timestamp } = JSON.parse(storedAlert)
      const currentTime = new Date().getTime()
      if (currentTime - timestamp < 5000) {
        setAlertType(type as AlertType)
        setAlertMessage(message)
        setTimeout(() => {
          setAlertType(null)
          setAlertMessage(null)
          localStorage.removeItem('alert')
        }, 5000 - (currentTime - timestamp))
      } else {
        localStorage.removeItem('alert')
      }
    }
  }, [])

  const showAlert = (type: AlertType, message: string | null) => {
    setAlertType(type)
    setAlertMessage(message)

    if (type === 'error' || type === 'success') {
      const alertData = {
        type,
        message,
        timestamp: new Date().getTime(),
      }
      localStorage.setItem('alert', JSON.stringify(alertData))

      setTimeout(() => {
        setAlertType(null)
        setAlertMessage(null)
        localStorage.removeItem('alert')
      }, 5000)
    }
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="fixed top-4 right-4 z-50">
        <AnimatePresence>
          {alertType === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive" className="mb-4 bg-[#F84F31] text-white">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{alertMessage}</AlertDescription>
              </Alert>
            </motion.div>
          )}
          {alertType === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="default" className="mb-4 bg-[#23C552] text-white">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{alertMessage}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AlertContext.Provider>
  )
}

export function useAlert() {
  const context = useContext(AlertContext)
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}