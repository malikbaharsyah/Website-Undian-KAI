"use client";

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
import Sidebar from "../components/Sidebar";
import ComboBox from "../components/ComboBox";

interface Participant {
  id: number
  nipp: number
  participant: string
  operating_area: string
}

const participants: Participant[] = [
  { id: 1, nipp: 13510, participant: "Hakim", operating_area:"Pusat" },
  { id: 2, nipp: 13510, participant: "Hakim", operating_area:"Pusat" },
  { id: 3, nipp: 13510, participant: "Hakim", operating_area:"Pusat" },
  { id: 4, nipp: 13510, participant: "Hakim", operating_area:"Pusat" },
  { id: 5, nipp: 13510, participant: "Hakim", operating_area:"Pusat" },
  { id: 6, nipp: 13510, participant: "Hakim", operating_area:"Pusat" },
]

const eventOptions = [
  { value: "1", label: "Jalan Sehat 17 Agustus" },
  { value: "2", label: "Jalan Sehat 18 Agustus" },
]



export default function Participants() {
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
            <ComboBox name="Event" comboBoxContents={eventOptions} />
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
                {participants.map((Participant) => (
                  <TableRow key={Participant.id}>
                    <TableCell>{Participant.nipp}</TableCell>
                    <TableCell>{Participant.participant}</TableCell>
                    <TableCell>{Participant.operating_area}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          <p className="text-sm text-muted-foreground text-center">
            Showing 8-16 categories of total 17 categories
          </p>
          <div className="p-4 border-t border-gray-200">
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
        </div>
      </main>
    </div>
  )
}