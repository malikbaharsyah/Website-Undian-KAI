"use client";

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
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Link from "next/link";

interface Event {
  id: number
  name: string
}

interface Detail {
  id: number
  prize: string
  qty: number
}

const events: Event[] = [
  { id: 1, name: "Jalan Sehat 17 Agustus" },
  { id: 2, name: "Jalan Sehat 17 Agustus" },
  { id: 3, name: "Jalan Sehat 17 Agustus" },
  { id: 4, name: "Jalan Sehat 17 Agustus" },
  { id: 5, name: "Jalan Sehat 17 Agustus" },
  { id: 6, name: "Jalan Sehat 17 Agustus" },
]

const details: Detail[] = [
  { id: 1, prize: "Mobil", qty: 1 },
  { id: 2, prize: "Motor", qty: 2 },
  { id: 3, prize: "TV", qty: 3 },
  { id: 4, prize: "Kulkas", qty: 4 },
  { id: 5, prize: "AC", qty: 5 },
  { id: 6, prize: "Kipas Angin", qty: 6 },
  { id: 1, prize: "Mobil", qty: 1 },
  { id: 2, prize: "Motor", qty: 2 },
  { id: 3, prize: "TV", qty: 3 },
  { id: 4, prize: "Kulkas", qty: 4 },
  { id: 5, prize: "AC", qty: 5 },
  { id: 6, prize: "Kipas Angin", qty: 6 },
]

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  
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
                  <TableHead>Event</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-[#000072] text-[#000072] hover:bg-[#000072] hover:text-white"
                            onClick={() => setSelectedEvent(event)}
                          >
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px] bg-white text-black font-poppins">
                          <DialogHeader>
                            <DialogTitle className="font-medium">{selectedEvent?.name}</DialogTitle>
                          </DialogHeader>
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
                                <TableRow key={detail.id}>
                                  <TableCell>{detail.prize}</TableCell>
                                  <TableCell className="text-right">{detail.qty}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                        </ScrollArea>
                          </Table>
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