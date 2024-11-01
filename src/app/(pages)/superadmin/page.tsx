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
DialogDescription,
DialogFooter,
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
import { 
    Search,
    Eye,
    EyeOff,
    UserPenIcon,
    TrashIcon,
    UserPlusIcon
} from "lucide-react"
import Sidebar from "@/app/components/Sidebar"

const userFormSchema = z.object({
    email: z.string().email(),
    nipp: z.string().min(1, "NIPP is required"),
    nama: z.string().min(1, "Name is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["Superadmin", "User"])
})

type UserFormValues = z.infer<typeof userFormSchema>

interface User {
    id: string
    nipp: string
    name: string
    email: string
    password: string
    role: string
}

export default function SuperadminPage() {
    const [users] = useState<User[]>([
    { id: "1", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" , password: "123456", role: "Superadmin"},
    { id: "2", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" , password: "123456", role: "User"},
    { id: "3", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" , password: "123456", role: "User"},
    { id: "4", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" , password: "123456", role: "User"},
    { id: "5", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" , password: "123456", role: "User"},
    { id: "6", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" , password: "123456", role: "User"},
    { id: "7", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" , password: "123456", role: "User"},
    { id: "7", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" , password: "123456", role: "User"},
    { id: "7", nipp: "13510", name: "Hakim", email: "Hakim@kai.id" , password: "123456", role: "User"},
    ])
    const [searchQuery, setSearchQuery] = useState("")
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [showPassword, setShowPassword] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [userToDelete, setUserToDelete] = useState<string | null>(null)
    const itemsPerPage = 9

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
        password: user.password,
        role: user.role as "Superadmin" | "User"
    })
    setShowEditModal(true)
    }

    const handlePageChange = (page: number) => {
    setCurrentPage(page);
    };

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };

    const handleDeleteClick = (userId: string) => {
        setUserToDelete(userId)
        setShowDeleteDialog(true)
    }
    
    const handleConfirmDelete = () => {
        if (userToDelete) {
        console.log("Deleting user:", userToDelete)
        setShowDeleteDialog(false)
        setUserToDelete(null)
        }
    }

    return (
        <div className="flex h-screen font-poppins bg-white text-black">
        <Sidebar />
        <div className="flex flex-col flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#000072]">Superadmin</h1>
            <Button 
                onClick={() => setShowAddModal(true)}
                className="bg-[#000072] hover:bg-[#000072]/90 text-white"
            >
                <UserPlusIcon className="h-5 w-5" />
            </Button>
            </div>
    
            <div className="relative mb-4 w-1/4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Input Name Here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
            />
            </div>
    
            <div className="flex-1 flex flex-col min-h-0">
            <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                <Table>
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
                        <TableRow key={user.id} className="h-12">
                        <TableCell className="py-2">{user.nipp}</TableCell>
                        <TableCell className="py-2">{user.name}</TableCell>
                        <TableCell className="py-2">{user.email}</TableCell>
                        <TableCell className="py-2">
                            <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                className="text-blue-600 hover:text-blue-800 h-8 w-8 p-0"
                                onClick={() => handleEdit(user)}
                            >
                                <UserPenIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-red-600 hover:text-red-800 h-8 w-8 p-0"
                                onClick={() => handleDeleteClick(user.id)}
                            >
                                <TrashIcon className="h-4 w-4" />
                            </Button>
                            </div>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </div> 
            <div className="mt-auto py-2">
                <p className="text-xs text-muted-foreground text-center mb-2">
                    Showing {currentPage} of {totalPages} pages
                </p>
                <Pagination>
                    <PaginationContent className="flex items-center justify-center gap-1">
                        <PaginationItem>
                            <PaginationPrevious
                                className="cursor-pointer px-2 py-1 text-xs rounded-md"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            >
                            </PaginationPrevious>
                        </PaginationItem>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    className={`${
                                        index + 1 === currentPage
                                            ? "text-[#000072] bg-[#e0e0f7]"
                                            : "text-[#6666A3] bg-white"
                                    } hover:bg-[#e0e0f7] cursor-pointer px-2 py-1 text-xs rounded-md`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                className="cursor-pointer px-2 py-1 text-xs rounded-md"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            >
                            </PaginationNext>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
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
                        <div className="relative">
                            <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Input Password"
                            {...field}
                            />
                            <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={togglePasswordVisibility}
                            >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="sr-only">
                                {showPassword ? "Hide password" : "Show password"}
                            </span>
                            </Button>
                        </div>
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
                        <div  className="relative">
                            <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Input Password"
                            {...field}
                            />
                            <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={togglePasswordVisibility}
                            >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="sr-only">
                                {showPassword ? "Hide password" : "Show password"}
                            </span>
                            </Button>
                        </div>
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
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
            <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
                Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
            >
                Cancel
            </Button>
            <Button
                type="button"
                variant="destructive"
                onClick={handleConfirmDelete}
            >
                Delete
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
        </div>
    </div>
    )
}