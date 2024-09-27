"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "../components/Sidebar";

interface Event {
    event_id: number;
    name: string;
}

interface Show {
    nipp: string;
    participant: string;
    prize: string;
}

export default function WinnerHistory() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedHistory, setSelectedHistory] = useState<Event | null>(null);
    const [show, setShow] = useState<Show[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchEvents = async (page: number) => {
        try {
            const res = await fetch(`/api/winner-histories?page=${page}`);
            const data = await res.json();
            setEvents(data.data);
            setTotalPages(data.meta.totalPage);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const fetchWinnerHistory = async (eventId: number) => {
        try {
            const res = await fetch(`/api/detail-winner-history?event_id=${eventId}`);
            const data = await res.json();
            
            // Ensure that the response is an array or set to an empty array
            setShow(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching winner history:", error);
            setShow([]); // Fallback to empty array in case of an error
        }
    };

    useEffect(() => {
        fetchEvents(page);
    }, [page]);

    return (
        <div className="flex font-poppins bg-white text-black">
            <Sidebar />
            <main className="flex-1">
                <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-[#000072]">Winner History</h1>
                    </div>
                    <p className="text-muted-foreground">Event winner histories</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead className="text-right">Winner</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.event_id}>
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-[#000072] text-[#000072] hover:bg-[#000072] hover:text-white"
                                                    onClick={() => {
                                                        setSelectedHistory(event);
                                                        fetchWinnerHistory(event.event_id);
                                                    }}
                                                >
                                                    Show
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[700px] bg-white text-black font-poppins">
                                                <DialogHeader>
                                                    <DialogTitle className="font-medium">
                                                        {selectedHistory?.name}
                                                    </DialogTitle>
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
                                                            {show.length === 0 ? (
                                                                <TableRow>
                                                                    <TableCell colSpan={3} className="text-center">
                                                                        No winner history available for this event.
                                                                    </TableCell>
                                                                </TableRow>
                                                            ) : (
                                                                show.map((showItem, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell>{showItem.nipp}</TableCell>
                                                                        <TableCell>{showItem.participant}</TableCell>
                                                                        <TableCell>{showItem.prize}</TableCell>
                                                                    </TableRow>
                                                                ))
                                                            )}
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
                        Showing page {page} of {totalPages}
                    </p>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() => setPage(index + 1)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </main>
        </div>
    );
}
