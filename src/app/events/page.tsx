'use client'

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from "react"
import Link from "next/link"
import fetchAPI from "../components/hooks/fetchAPI"
import { format } from "date-fns"
import Event from "../components/interfaces/Event"

// interface Event {
//   event_id: number
//   name: string
// }

interface Detail {
  prize_id: number
  name: string
  quantity: number
}

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [details, setDetails] = useState<Detail[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchAPI('/events')
      .then((data) => {
        setEvents(data.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }, [])

  const handleShowDetails = async (event: Event) => {
    setSelectedEvent(event)
    setIsLoadingDetails(true)
    if (event) {
      try {
        const data = await fetchAPI(`/events/${event.event_id}`)
        setDetails(data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingDetails(false)
      }
    }
  }

  const TableRowSkeleton = () => (
    <TableRow>
      <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
      <TableCell className="text-right"><Skeleton className="h-8 w-[100px] ml-auto" /></TableCell>
    </TableRow>
  )

  const DialogContentSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-4 w-[200px]" />
      <div className="space-y-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex justify-between">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
        ))}
      </div>
    </div>
  )
  
  return (
    <div className="flex font-poppins bg-white text-black">
      <Sidebar />
      <main className="flex-1">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#000072]">Events</h1>
            <Button className="bg-[#000072] hover:bg-[#000072]/90 text-white">
              <Link href="/events/add">Add Event</Link>
            </Button>
          </div>
          <p className="text-muted-foreground">Lorem ipsum dolor sit amet</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Event</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? [...Array(6)].map((_, index) => <TableRowSkeleton key={index} />)
                : events.map((event) => (
                    <TableRow key={event.event_id}>
                      <TableCell>{event.name}</TableCell>
                      <TableCell>{format(new Date(event.start_date).toLocaleDateString(), "MMMM dd, yyyy")}</TableCell>
                      <TableCell>{format(new Date(event.end_date).toLocaleDateString(), "MMMM dd, yyyy")}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-[#000072] text-[#000072] hover:bg-[#000072] hover:text-white"
                              onClick={() => handleShowDetails(event)}
                            >
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[700px] bg-white text-black font-poppins">
                            <DialogHeader>
                              <DialogTitle className="font-medium">{selectedEvent?.name}</DialogTitle>
                            </DialogHeader>
                            {isLoadingDetails ? (
                              <DialogContentSkeleton />
                            ) : (
                              <Table>
                                <ScrollArea className="h-[475px] w-full rounded-md border p-4">
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Prize</TableHead>
                                      <TableHead className="text-right">Quantity</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {details.map((detail) => (
                                      <TableRow key={detail.prize_id}>
                                        <TableCell>{detail.name}</TableCell>
                                        <TableCell className="text-right">{detail.quantity}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </ScrollArea>
                              </Table>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <p className="text-sm text-muted-foreground text-center">
            Showing 8-16 categories of total 17 categories
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  )
}