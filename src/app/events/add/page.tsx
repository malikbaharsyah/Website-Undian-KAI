"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PencilIcon, UploadIcon, XIcon } from "lucide-react"
import Sidebar from "@/app/components/Sidebar"

interface Prize {
id: number
name: string
quantity: string
}

export default function Component() {
const [eventName, setEventName] = useState("Untitled Event")
const [isEditing, setIsEditing] = useState(false)
const [prizes, setPrizes] = useState<Prize[]>([{ id: 1, name: "", quantity: "" }])

const handleRename = () => {
    setIsEditing(true)
}

const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value)
}

const handleNameBlur = () => {
    setIsEditing(false)
}

const addPrize = () => {
    setPrizes([...prizes, { id: Date.now(), name: "", quantity: "" }])
}

const removePrize = (id: number) => {
    setPrizes(prizes.filter(prize => prize.id !== id))
}

const updatePrize = (id: number, field: 'name' | 'quantity', value: string) => {
    setPrizes(prizes.map(prize => 
    prize.id === id ? { ...prize, [field]: value } : prize
    ))
}

return (
    <div className="flex h-screen font-poppins bg-white text-black">
    <Sidebar />
    <main className="flex-1 flex flex-col overflow-hidden">
        <div className="container mx-auto p-4 border-0">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between content-center text-[#000072]">
            {isEditing ? (
                <Input
                value={eventName}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                className="text-3xl font-bold p-0 border-0"
                autoFocus
                />
            ) : (
                <CardTitle className="text-3xl font-bold">{eventName}</CardTitle>
            )}
            <Button variant="ghost" size="icon" onClick={handleRename} className="hover:bg-white">
                <PencilIcon className="h-6 w-6 text-[#000072]" />
            </Button>
            </CardHeader>
        </Card>
        </div>
        <div className="flex-1 overflow-auto border-y">
        <div className="container mx-auto px-4">
            <Card className="mb-6">
                <CardHeader className="pt-4 pl-6">
                    <CardTitle>Background Picture</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Card className="border shadow-sm">
                        <CardContent className="pt-3 space-y-4 relative">
                            <Button
                            variant="outline"
                            className="w-full h-40 border-dashed mt-2"
                            >
                            <UploadIcon className="mr-2 h-4 w-4" />
                            Upload
                            </Button>
                        </CardContent>
                    </Card>
                </CardContent>
            <CardHeader className="pt-0 pl-6">
                <CardTitle>Prizes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {prizes.map((prize, index) => (
                <Card key={prize.id} className="border shadow-sm">
                    <CardContent className="pt-6 space-y-4 relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removePrize(prize.id)}
                    >
                        <XIcon className="h-4 w-4" />
                    </Button>
                    <div>
                        <Label htmlFor={`prize-name-${prize.id}`}>Name of prize</Label>
                        <Input
                        id={`prize-name-${prize.id}`}
                        value={prize.name}
                        onChange={(e) => updatePrize(prize.id, 'name', e.target.value)}
                        placeholder="Input Prize Name Here"
                        className="mt-2"
                        />
                    </div>
                    <div>
                        <Label htmlFor={`quantity-${prize.id}`}>Quantity(s)</Label>
                        <Input
                        id={`quantity-${prize.id}`}
                        value={prize.quantity}
                        onChange={(e) => updatePrize(prize.id, 'quantity', e.target.value)}
                        placeholder="Input Prize Quantity Here"
                        className="mt-2"
                        />
                    </div>
                    <div>
                        <Label htmlFor={`prize-picture-${prize.id}`}>Picture</Label>
                        <Button variant="outline" className="w-full h-40 border-dashed mt-2">
                        <UploadIcon className="mr-2 h-4 w-4" />
                        Upload
                        </Button>
                    </div>
                    </CardContent>
                </Card>
                ))}
                <div className="flex justify-center w-full">
                <Button
                    type="button"
                    onClick={addPrize}
                    className="bg-[#000072] text-white hover:bg-blue-700 w-max-self"
                >
                    + Prize
                </Button>
                </div>
            </CardContent>
            </Card>
        </div>
        </div>
        <div className="flex justify-end p-6">
        <Button className="bg-[#000072] text-white hover:bg-blue-700">
            Save
        </Button>
        </div>
    </main>
    </div>
)
}