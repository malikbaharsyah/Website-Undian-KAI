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
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Event {
  id: number
  name: string
}

const events: Event[] = [
  { id: 1, name: "Jalan Sehat 17 Agustus" },
  { id: 2, name: "Jalan Sehat 17 Agustus" },
  { id: 3, name: "Jalan Sehat 17 Agustus" },
  { id: 4, name: "Jalan Sehat 17 Agustus" },
  { id: 5, name: "Jalan Sehat 17 Agustus" },
  { id: 6, name: "Jalan Sehat 17 Agustus" },
]

export default function EventsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button>Add Event</Button>
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
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 8-16 categories of total 17 categories
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}