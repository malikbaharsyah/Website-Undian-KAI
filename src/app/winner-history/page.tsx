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

interface Event {
id: number
name: string
}

interface Show {
id: number
nipp: string
participant: string
prize: string
}

const events: Event[] = [
{ id: 1, name: "Jalan Sehat 17 Agustus" },
{ id: 2, name: "Jalan Sehat 17 Agustus" },
{ id: 3, name: "Jalan Sehat 17 Agustus" },
{ id: 4, name: "Jalan Sehat 17 Agustus" },
{ id: 5, name: "Jalan Sehat 17 Agustus" },
{ id: 6, name: "Jalan Sehat 17 Agustus" },
]

const show: Show[] = [
{ id: 1, nipp: "13510", participant: "Hakim", prize: "Mobil" },
{ id: 2, nipp: "13510", participant: "Hakim", prize: "Motor" },
{ id: 3, nipp: "13510", participant: "Hakim", prize: "TV" },
]

export default function () {
const [selectedHistory, setSelectedHistory] = useState<Event | null>(null)

return (
    <div className="flex font-poppins bg-white text-black">
    <Sidebar />
    <main className="flex-1">
        <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#000072]">Winner History</h1>
            {/* <Button className="bg-[#000072] hover:bg-[#000072]/90 text-white">
            <Link href="/events/add">Add Event</Link>
            </Button> */}
        </div>
        <p className="text-muted-foreground">Lorem ipsum dolor sit amet</p>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Event</TableHead>
                <TableHead className="text-right">Winner</TableHead>
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
                            onClick={() => setSelectedHistory(event)}
                        >
                            Show
                        </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px] bg-white text-black font-poppins">
                        <DialogHeader>
                            <DialogTitle className="font-medium">{selectedHistory?.name}</DialogTitle>
                        </DialogHeader>
                        <Table>
                        <ScrollArea className="h-[475px] w-full rounded-md border p-4">
                            <TableHeader>
                            <TableRow>
                                <TableHead>NIPP</TableHead>
                                <TableHead>Participant</TableHead>
                                <TableHead>Prize</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {show.map((show) => (
                                <TableRow key={show.id}>
                                <TableCell>{show.nipp}</TableCell>
                                <TableCell>{show.participant}</TableCell>
                                <TableCell>{show.prize}</TableCell>
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