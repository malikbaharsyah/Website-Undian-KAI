"use client";

import { useEffect, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import Sidebar from "../components/Sidebar";
import ComboBox from "../components/ComboBox";

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
const [totalRecords, setTotalRecords] = useState(0);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(true);

const fetchEvents = async () => {
    try {
    const res = await fetch("/api/combobox-event");
    const data = await res.json();
    data.map((ev: { event_id: { toString: () => any; }; }) => ev.event_id = ev.event_id.toString());
    setEvents(
        data.map((ev: { event_id: string; name: string; }) => ({
        id: ev.event_id,
        name: ev.name,
        }))
    )
    } catch (error) {
    console.error("Error fetching events:", error);
    }
};

const fetchParticipants = async (page: number, eventId: string | null) => {
    setIsLoading(true);
    try {
    const res = await fetch(`/api/participants?page=${page}&event_id=${eventId || ""}`);
    const data = await res.json();
    setParticipants(data.data);
    setTotalRecords(data.meta.totalRecords);
    setTotalPages(data.meta.totalPages);
    } catch (error) {
    console.error("Error fetching participants:", error);
    } finally {
    setIsLoading(false);
    }
};

useEffect(() => {
    fetchEvents();
    fetchParticipants(currentPage, selectedEventId);
}, [currentPage, selectedEventId]);

const handleEventChange = (value: number | null) => {
    setSelectedEventId(value ? value.toString() : null);
    setCurrentPage(1);
};

return (
    <div className="flex font-poppins bg-white text-black">
    <Sidebar />
    <main className="flex-1">
        <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#000072]">Participants</h1>
        </div>
        <p className="text-muted-foreground">Lorem ipsum dolor sit amet</p>
        <div className="flex justify-end">
            <ComboBox
            name="Event"
            comboBoxContents={events.map((event) => ({
                value: event.id,
                label: event.name,
            }))}
            onChange={handleEventChange}
            />
        </div>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>NIPP</TableHead>
                <TableHead>Participant</TableHead>
                <TableHead>Operating Area</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {isLoading
                ? Array.from({ length: 9 }).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    </TableRow>
                ))
                : participants.map((participant) => (
                    <TableRow key={`participant-${participant.id}-${participant.nipp}`}>
                    <TableCell>{participant.nipp}</TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell>{participant.operating_area}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <p className="text-sm text-muted-foreground text-center">
            Showing {currentPage} of {totalPages} pages
        </p>
        <Pagination>
            <PaginationContent>
            <PaginationItem>
                <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={`page-${index + 1}`}>
                <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(index + 1)}
                >
                    {index + 1}
                </PaginationLink>
                </PaginationItem>
            ))}
            <PaginationItem>
                <PaginationNext
                href="#"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                />
            </PaginationItem>
            </PaginationContent>
        </Pagination>
        </div>
    </main>
    </div>
);
}