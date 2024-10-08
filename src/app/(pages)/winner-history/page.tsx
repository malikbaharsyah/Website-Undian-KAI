"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/app/components/ui/pagination";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Skeleton } from "@/app/components/ui/skeleton";
import Sidebar from "../../components/Sidebar";

interface Event {
    event_id: number;
    name: string;
}

interface Show {
    nipp: string;
    participant: string;
    prize: string;
}

const SkeletonRow = () => (
    <TableRow>
        <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-8 w-[60px] ml-auto" /></TableCell>
    </TableRow>
);

const SkeletonDialogRow = () => (
    <TableRow>
        <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
    </TableRow>
);

export default function WinnerHistory() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedHistory, setSelectedHistory] = useState<Event | null>(null);
    const [show, setShow] = useState<Show[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogLoading, setIsDialogLoading] = useState(false);

    const fetchEvents = async (page: number) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/winner-histories?page=${page}`);
            const data = await res.json();

            if (Array.isArray(data.data)) {
                setEvents(data.data);
                setTotalPages(data.meta.totalPage);
            } else {
                setEvents([]);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            setEvents([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchWinnerHistory = async (eventId: number) => {
        setIsDialogLoading(true);
        try {
            const res = await fetch(`/api/detail-winner-history?event_id=${eventId}`);
            const data = await res.json();
            const winnerHistory = data.winnerHistory;

            setShow(Array.isArray(winnerHistory) ? winnerHistory : []);
        } catch (error) {
            console.error("Error fetching winner history:", error);
            setShow([]);
        } finally {
            setIsDialogLoading(false);
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead className="text-right">Winner</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 7 }).map((_, index) => (
                                    <SkeletonRow key={index} />
                                ))
                            ) : events && events.length > 0 ? (
                                events.map((event) => (
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
                                                                {isDialogLoading ? (
                                                                    Array.from({ length: 7 }).map((_, index) => (
                                                                        <SkeletonDialogRow key={index} />
                                                                    ))
                                                                ) : show.length === 0 ? (
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
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2} className="text-center">
                                        No events found.
                                    </TableCell>
                                </TableRow>
                            )}
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
                                className="cursor-pointer"
                            />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    className={`${
                                    pageNumber === page
                                        ? "text-[#000072] bg-[#e0e0f7]"
                                        : "text-[#6666A3] bg-white"
                                    } hover:bg-[#e0e0f7] cursor-pointer`}
                                    onClick={() => setPage(pageNumber)}
                                >
                                    {pageNumber}
                                </PaginationLink>
                                </PaginationItem>
                            );
                            })}
                            <PaginationItem>
                            <PaginationNext
                                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                className="cursor-pointer"
                            />
                            </PaginationItem>
                        </PaginationContent>
                        </Pagination>
                </div>
            </main>
        </div>
    );
}