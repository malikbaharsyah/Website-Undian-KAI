'use client'

import { Button } from "@/app/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Skeleton } from "@/app/components/ui/skeleton"
import Sidebar from "../../components/Sidebar"
import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import Event from "../../components/interfaces/Event"
import useFetchAPI from "../../components/hooks/fetchAPI"

interface Detail {
  prize_id: number;
  name: string;
  quantity: number;
}

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [details, setDetails] = useState<Detail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchAPI = useFetchAPI();

  useEffect(() => {
    setIsLoading(true);
    fetchAPI(`/events?page=${currentPage}`, {
      headers: {
        'x-page': '/events'
      }
    })
      .then((data) => {
        setEvents(data.data);
        setTotalPages(data.meta.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [currentPage]);

  const handleShowDetails = async (event: Event) => {
    setSelectedEvent(event);
    setIsLoadingDetails(true);
    try {
      const data = await fetchAPI(`/events/${event.event_id}`);
      setDetails(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const TableRowSkeleton = () => (
    <TableRow>
      <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
      <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
      <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
      <TableCell className="text-right"><Skeleton className="h-8 w-[100px]" /></TableCell>
    </TableRow>
  );

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
  );

  return (
    <div className="flex font-poppins bg-white text-black h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="p-6 space-y-6 flex-1 flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#000072]">Events</h1>
            <Button className="bg-[#000072] hover:bg-[#000072]/90 text-white">
              <Link href="/events/add">Add Event</Link>
            </Button>
          </div>
          <div className="flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
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
                        <TableCell>{format(new Date(event.start_date), "MMMM dd, yyyy")}</TableCell>
                        <TableCell>{format(new Date(event.end_date), "MMMM dd, yyyy")}</TableCell>
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
                            <DialogContent className="sm:max-w-[700px] bg-white text-black">
                              <DialogHeader>
                                <DialogTitle>{selectedEvent?.name}</DialogTitle>
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
          </div>
        </div>
        <div className="flex flex-col justify-end pb-6">
          <p className="text-sm text-muted-foreground text-center mb-4">
            Showing {currentPage} of {totalPages} pages
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    className={`${
                      index + 1 === currentPage
                        ? "text-[#000072] bg-[#e0e0f7]"
                        : "text-[#6666A3] bg-white"
                    } hover:bg-[#e0e0f7] cursor-pointer`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
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
