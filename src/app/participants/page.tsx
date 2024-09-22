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
import Sidebar from "../components/Sidebar";

interface Participant {
  id: number
  nipp: number
  participant: string
  unit: string
}

const participants: Participant[] = [
  { id: 1, nipp: 13510, participant: "Hakim", unit:"Pusat" },
  { id: 2, nipp: 13510, participant: "Hakim", unit:"Pusat" },
  { id: 3, nipp: 13510, participant: "Hakim", unit:"Pusat" },
  { id: 4, nipp: 13510, participant: "Hakim", unit:"Pusat" },
  { id: 5, nipp: 13510, participant: "Hakim", unit:"Pusat" },
  { id: 6, nipp: 13510, participant: "Hakim", unit:"Pusat" },
]

export default function Participants() {
  return (
    <div className="flex font-poppins bg-white text-black">
      <Sidebar />
      <main className="flex-1">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#000072]">Participants</h1>
            <Button className="bg-[#000072] hover:bg-[#000072]/90 text-white">Add Participant</Button>
          </div>
          <p className="text-muted-foreground">Lorem ipsum dolor sit amet</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NIPP</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead>Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((Participant) => (
                  <TableRow key={Participant.id}>
                    <TableCell>{Participant.nipp}</TableCell>
                    <TableCell>{Participant.participant}</TableCell>
                    <TableCell>{Participant.unit}</TableCell>
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