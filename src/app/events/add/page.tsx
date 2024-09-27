"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PencilIcon, UploadIcon, XIcon, FileSpreadsheet } from "lucide-react"
import Sidebar from "@/app/components/Sidebar"
import { DatePicker } from "@/components/ui/date-picker"
import { DateRange } from "react-day-picker"
import { FILE } from "dns"

interface Prize {
id: number
name: string
quantity: string
image: string | null
}

export default function Component() {
const [step, setStep] = useState(1)
const [eventName, setEventName] = useState("Untitled Event")
const [isEditing, setIsEditing] = useState(false)
const [prizes, setPrizes] = useState<Prize[]>([{ id: 1, name: "", quantity: "", image: null }])
const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
const [dateRange, setDateRange] = useState<DateRange | undefined>()
const [participantFile, setParticipantFile] = useState<File | null>(null)
const fileInputRef = useRef<HTMLInputElement>(null)
const participantFileInputRef = useRef<HTMLInputElement>(null)

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
    setPrizes([...prizes, { id: Date.now(), name: "", quantity: "", image: null }])
}

const removePrize = (id: number) => {
    setPrizes(prizes.filter(prize => prize.id !== id))
}

const updatePrize = (id: number, field: 'name' | 'quantity' | 'image', value: string | null) => {
    setPrizes(prizes.map(prize => 
    prize.id === id ? { ...prize, [field]: value } : prize
    ))
}

const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, id?: number) => {
    const file = event.target.files?.[0]
    if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
        if (id) {
        updatePrize(id, 'image', reader.result as string)
        } else {
        setBackgroundImage(reader.result as string)
        }
    }
    reader.readAsDataURL(file)
    }
}

const removeImage = (id?: number) => {
    if (id) {
    updatePrize(id, 'image', null)
    } else {
    setBackgroundImage(null)
    }
}

const handleParticipantFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
    setParticipantFile(file)
    }
}

const removeParticipantFile = () => {
    setParticipantFile(null)
    if (participantFileInputRef.current) {
    participantFileInputRef.current.value = ''
    }
}

const handleNext = () => {
    setStep(2)
}

const handleBack = () => {
    setStep(1)
}

const handleSave = () => {
    console.log("Saving event...")
}

return (
    <div className="flex h-screen font-poppins bg-white text-black">
    <Sidebar />
    <main className="flex-1 flex flex-col overflow-hidden">
        <div className="container mx-auto py-1.5 px-7 border-0">
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
            {step === 1 && (
            <Card className="mb-6">
                <CardHeader className="pt-4 pl-6">
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
                        <Label htmlFor={`prize-name-${prize.id}`}>Name of prize {index+1}</Label>
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
                        {prize.image ? (
                            <div className="relative h-40 w-full">
                            <img
                                src={prize.image}
                                alt={`Prize ${prize.name}`}
                                className="h-full w-auto max-w-full object-contain mx-auto"
                            />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={() => removeImage(prize.id)}
                            >
                                <XIcon className="h-4 w-4" />
                            </Button>
                            </div>
                        ) : (
                            <Button
                            variant="outline"
                            className="w-full h-40 border-dashed mt-2"
                            onClick={() => document.getElementById(`prize-picture-${prize.id}`)?.click()}
                            >
                            <UploadIcon className="mr-2 h-4 w-4" />
                            Upload
                            </Button>
                        )}
                        <input
                            type="file"
                            id={`prize-picture-${prize.id}`}
                            className="hidden"
                            accept="image/jpeg,image/png,image/jpg"
                            onChange={(e) => handleImageUpload(e, prize.id)}
                        />
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
            )}
            {step === 2 && (
            <Card className="mb-4">
                <CardHeader className="pt-4 pl-6">
                <CardTitle>Background Picture</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                <Card className="border shadow-sm">
                    <CardContent className="pt-3 space-y-4 relative">
                    {backgroundImage ? (
                        <div className="relative h-40 w-full">
                        <img
                            src={backgroundImage}
                            alt="Background"
                            className="h-full w-auto max-w-full object-contain mx-auto"
                        />
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => removeImage()}
                        >
                            <XIcon className="h-4 w-4" />
                        </Button>
                        </div>
                    ) : (
                        <Button
                        variant="outline"
                        className="w-full h-40 border-dashed mt-2"
                        onClick={() => fileInputRef.current?.click()}
                        >
                        <UploadIcon className="mr-2 h-4 w-4" />
                        Upload
                        </Button>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={handleImageUpload}
                    />
                    </CardContent>
                </Card>
                </CardContent>
                <CardHeader className="pt-0 pl-6">
                <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                <Card className="border shadow-sm">
                <CardContent className="pt-3 space-y-2 relative">
                <Label htmlFor="date-range">Start Date - End Date</Label>
                    <DatePicker
                    date={dateRange}
                    setDate={setDateRange}
                    />
                </CardContent>
                </Card>
                </CardContent>
                <CardHeader className="pt-0 pl-6">
                <CardTitle>Participants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                <Card className="border shadow-sm">
                <CardContent className="pt-3 space-y-2 relative">
                    {participantFile ? (
                    <div className="flex flex-col h-40 items-center justify-center mt-2 p-2 border rounded space-x-3">
                        <FileSpreadsheet strokeWidth={0.5} className="h-20 w-20" />
                        <div className="flex items-center space-x-2">
                        <span>{participantFile.name}</span>
                        <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeParticipantFile}
                        >
                        <XIcon className="h-4 w-4 text-red-500" />
                        </Button>
                        </div>
                    </div>
                    ) : (
                    <Button
                        variant="outline"
                        className="w-full h-40 mt-2 border-dashed"
                        onClick={() => participantFileInputRef.current?.click()}
                    >
                        <UploadIcon className="mr-2 h-4 w-4" />
                        Upload (.xlsx, .xls)
                    </Button>
                    )}
                    <input
                    type="file"
                    id="participant-file"
                    ref={participantFileInputRef}
                    className="hidden"
                    accept=".xlsx,.xls"
                    onChange={handleParticipantFileUpload}
                    />
                </CardContent>
                </Card>
                </CardContent>
            </Card>
            )}
        </div>
        </div>
        <div className="flex justify-between px-6 mx-4 py-4">
        {step === 2 && (
            <Button onClick={handleBack} className="bg-gray-200 text-black hover:bg-gray-300">
            Back
            </Button>
        )}
        {step === 1 ? (
            <Button onClick={handleNext} className="bg-[#000072] text-white hover:bg-blue-700 ml-auto">
            Next
            </Button>
        ) : (
            <Button onClick={handleSave} className="bg-[#000072] text-white hover:bg-blue-700 ml-auto">
            Save
            </Button>
        )}
        </div>
    </main>
    </div>
)
}