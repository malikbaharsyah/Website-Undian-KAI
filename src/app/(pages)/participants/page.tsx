"use client";

import { useEffect, useState } from "react";
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
import { Skeleton } from "@/app/components/ui/skeleton";
import Sidebar from "../../components/Sidebar";
import ComboBox from "../../components/ComboBox";

interface Participant {
id: number;
nipp: number;
name: string;
operating_area: string;
}

interface Event {
id: string;
name: string;
}

export default function Participants() {
const [participants, setParticipants] = useState<Participant[]>([]);
const [events, setEvents] = useState<Event[]>([]);
const [, setTotalRecords] = useState(0);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(true);

const fetchEvents = async () => {
    try {
    const res = await fetch("/api/combobox-event");
    const data = await res.json();
    if (Array.isArray(data)) {
        setEvents(
        data.map((ev: { event_id: string; name: string }) => ({
            id: ev.event_id.toString(),
            name: ev.name,
        }))
        );
    }
    } catch (error) {
    console.error("Error fetching events:", error);
    }
};

const fetchParticipants = async (page: number, eventId: string | null) => {
    if (!eventId) {
        setParticipants([]);
        setTotalPages(1);
        return;
      }
    setIsLoading(true);
    try {
    const res = await fetch(`/api/participants?page=${page}&event_id=${eventId || ""}`);
    const data = await res.json();
    if (data && Array.isArray(data.data)) {
        setParticipants(data.data);
        setTotalRecords(data.meta.totalRecords);
        setTotalPages(data.meta.totalPages);
    } else {
        setParticipants([]);
    }
    } catch (error) {
    console.error("Error fetching participants:", error);
    } finally {
    setIsLoading(false);
    }
};

useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchParticipants(currentPage, selectedEventId);
  }, [currentPage, selectedEventId]);

const handleEventChange = (value: number | null) => {
    setSelectedEventId(value ? value.toString() : null);
    setCurrentPage(1);
};

return (
    <div className="flex font-poppins bg-white text-black">
    <Sidebar />
    <main className="flex flex-1 flex-col">
        <div className="p-6 space-y-6 flex flex-1 flex-col">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#000072]">Participants</h1>
        </div>
        <div className="flex justify-end">
            {events.length > 0 ? (
            <ComboBox
                name="Event"
                comboBoxContents={events.map((event) => ({
                value: event.id,
                label: event.name,
                }))}
                onChange={handleEventChange}
            />
            ) : (
            <Skeleton className="h-8 w-[150px]" />
            )}
        </div>
        <div className="flex-1">
        { !isLoading &&
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>NIPP</TableHead>
                <TableHead>Participant</TableHead>
                <TableHead>Operating Area</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {isLoading ? (
                Array.from({ length: 9 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                    <Skeleton className="h-4 w-8 p-2" />
                    </TableCell>
                    <TableCell>
                    <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                    <Skeleton className="h-4 w-24" />
                    </TableCell>
                </TableRow>
                ))
            ) : participants.length > 0 ? (
                participants.map((participant) => (
                <TableRow key={`participant-${participant.id}-${participant.nipp}`}>
                    <TableCell>{participant.nipp}</TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell>{participant.operating_area}</TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={3} className="text-center">
                    No participants found
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        }
        </div>
        <div className="flex flex-col justify-end">
        <p className="text-sm text-muted-foreground text-center mb-4">
            Showing {currentPage} of {totalPages} pages
        </p>
        <Pagination>
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="cursor-pointer"
            />
            </PaginationItem>
            {Array.from({ length: 3 }).map((_, index) => {
            const startPage = Math.max(1, currentPage - 1);
            const pageNumber = startPage + index;

            if (pageNumber > totalPages) return null;

            return (
                <PaginationItem key={`page-${pageNumber}`}>
                <PaginationLink
                    className={`${
                    pageNumber === currentPage
                        ? "text-[#000072] bg-[#e0e0f7]"
                        : "text-[#6666A3] bg-white"
                    } hover:bg-[#e0e0f7] cursor-pointer`}
                    onClick={() => setCurrentPage(pageNumber)}
                >
                    {pageNumber}
                </PaginationLink>
                </PaginationItem>
            );
            })}
            <PaginationItem>
            <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="cursor-pointer"
            />
            </PaginationItem>
        </PaginationContent>
        </Pagination>
        </div>
        </div>
    </main>
    </div>
);
}