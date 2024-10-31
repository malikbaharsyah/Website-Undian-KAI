"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
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
} from "@/app/components/ui/dialog"
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/app/components/ui/form"
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/app/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Search } from "lucide-react"
import Sidebar from "@/app/components/Sidebar"

const userFormSchema = z.object({
email: z.string().email(),
nipp: z.string().min(1, "NIPP is required"),
nama: z.string().min(1, "Name is required"),
password: z.string().min(6, "Password must be at least 6 characters"),
role: z.enum(["Superadmin", "User"])
})

type UserFormValues = z.infer<typeof userFormSchema>

interface User {
id: string
nipp: string
name: string
email: string
}

export default function SuperadminPage() {
const [users] = useState<User[]>([
    { id: "1", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" },
    { id: "2", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" },
    { id: "3", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" },
    { id: "4", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" },
    { id: "5", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" },
    { id: "6", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" },
    { id: "7", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" },
    { id: "8", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" },
])
const [searchQuery, setSearchQuery] = useState("")
const [showAddModal, setShowAddModal] = useState(false)
const [showEditModal, setShowEditModal] = useState(false)
const [selectedUser, setSelectedUser] = useState<User | null>(null)
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 8

const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
    email: "",
    nipp: "",
    nama: "",
    password: "",
    role: "User"
    }
})

const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.nipp.includes(searchQuery) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
)

const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
const startIndex = (currentPage - 1) * itemsPerPage
const endIndex = startIndex + itemsPerPage
const currentUsers = filteredUsers.slice(startIndex, endIndex)

const handleAddUser = (data: UserFormValues) => {
    console.log("Adding user:", data)
    setShowAddModal(false)
    form.reset()
}

const handleEditUser = (data: UserFormValues) => {
    console.log("Editing user:", data)
    setShowEditModal(false)
    form.reset()
}

const handleEdit = (user: User) => {
    setSelectedUser(user)
    form.reset({
    email: user.email,
    nipp: user.nipp,
    nama: user.name,
    password: "",
    role: "User"
    })
    setShowEditModal(true)
}

const handleDelete = (userId: string) => {
    console.log("Deleting user:", userId)
}

const handlePageChange = (page: number) => {
    setCurrentPage(page);
};

return (
    <div className="flex h-screen font-poppins bg-white text-black">
    <Sidebar />
    <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#000072]">Superadmin</h1>
        <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#000072] hover:bg-[#000072]/90 text-white"
        >
            Add User
        </Button>
        </div>

        <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
            placeholder="Input Name Here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
        />
        </div>

        <div className="border rounded-lg overflow-x-auto">
        <Table className="min-w-full">
            <TableHeader>
            <TableRow>
                <TableHead className="w-1/4">NIPP</TableHead>
                <TableHead className="w-1/4">Name</TableHead>
                <TableHead className="w-1/4">Email</TableHead>
                <TableHead className="w-1/4">Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {currentUsers.map((user) => (
                <TableRow key={user.id}>
                <TableCell className="py-2.5">{user.nipp}</TableCell>
                <TableCell className="py-2.5">{user.name}</TableCell>
                <TableCell className="py-2.5">{user.email}</TableCell>
                <TableCell className="py-2.5">
                    <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEdit(user)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="ghost"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(user.id)}
                    >
                        Hapus
                    </Button>
                    </div>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </div>

        <div className="flex flex-col justify-end pb-6 pt-6">
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

    <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddUser)} className="space-y-4">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input placeholder="Input Email" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="nipp"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>NIPP</FormLabel>
                    <FormControl>
                    <Input placeholder="Input NIPP" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                    <Input placeholder="Input Nama" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input type="password" placeholder="Input Password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Superadmin">Superadmin</SelectItem>
                        <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
                </Button>
                <Button type="submit" className="bg-[#000072] hover:bg-[#000072]/90 text-white">
                Save
                </Button>
            </div>
            </form>
        </Form>
        </DialogContent>
    </Dialog>

    <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditUser)} className="space-y-4">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input placeholder="Input Email" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="nipp"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>NIPP</FormLabel>
                    <FormControl>
                    <Input placeholder="Input NIPP" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                    <Input placeholder="Input Nama" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input type="password" placeholder="Input Password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Superadmin">Superadmin</SelectItem>
                        <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
                </Button>
                <Button type="submit" className="bg-[#000072] hover:bg-[#000072]/90 text-white">
                Save
                </Button>
            </div>
            </form>
        </Form>
        </DialogContent>
    </Dialog>
    </div>
    </div>
)
}