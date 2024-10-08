"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/app/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

type AlertType = 'loading' | 'error' | 'success' | null;

export default function useAlert() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const showAlert = (type: AlertType, message: string | null) => {
    setLoading(type === 'loading')
    setError(type === 'error' ? message : null)
    setSuccess(type === 'success' ? message : null)

    if (type === 'error' || type === 'success') {
      setTimeout(() => {
        setError(null)
        setSuccess(null)
      }, 5000)
    }
  }

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null)
        setSuccess(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error, success])

  const AlertComponent = () => (
    <div className="absolute items-center justify-center min-h-screen p-4">
      <Dialog open={loading} onOpenChange={() => showAlert(null, null)}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-black">Loading</DialogTitle>
            <DialogDescription>Please wait while we fetch the data...</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center p-4">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto"
          >
            <Alert variant="destructive" className="mt-4 bg-[#F84F31] text-white">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto"
          >
            <Alert variant="default" className="mt-4 bg-[#23C552] text-white">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return { showAlert, AlertComponent }
}