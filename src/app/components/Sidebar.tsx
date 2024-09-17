import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HomeIcon, CalendarIcon, UsersIcon, TrophyIcon, LogOutIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isActive, setIsActive] = useState("Lottery")

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} font-poppins h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative`}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-4 bg-white border border-gray-200 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeftIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
      </Button>
      <div className={`p-4 border-b border-gray-200 ${isOpen ? '' : 'justify-center'}`}>
        <div className={`flex items-center ${isOpen ? 'space-x-3' : 'justify-center'}`}>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          {isOpen && <span className="text-lg text-[#333333] font-bold">Admin</span>}
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <NavItem href="/" icon={<HomeIcon className="h-5 w-5" />} text="Lottery" isOpen={isOpen} isActive={isActive==="Lottery"} setIsActive={setIsActive}/>
          <NavItem href="/" icon={<CalendarIcon className="h-5 w-5" />} text="Events" isOpen={isOpen} isActive={isActive==="Events"} setIsActive={setIsActive}/>
          <NavItem href="/" icon={<UsersIcon className="h-5 w-5" />} text="Participants" isOpen={isOpen} isActive={isActive==="Participants"} setIsActive={setIsActive}/>
          <NavItem href="/" icon={<TrophyIcon className="h-5 w-5" />} text="Winner History" isOpen={isOpen} isActive={isActive==="Winner History"} setIsActive={setIsActive}/>
        </ul>
      </nav>
      <div className={`p-4 border-t border-gray-200 ${isOpen ? '' : 'flex justify-center'}`}>
        <Button variant="ghost" className={`${isOpen ? 'w-full justify-start' : 'w-auto p-2'} text-gray-700 hover:bg-gray-100`} asChild>
          <Link href="/logout" className="flex items-center space-x-3">
            <LogOutIcon className="h-5 w-5" />
            {isOpen && <span>Logout</span>}
          </Link>
        </Button>
      </div>
    </div>
  )
}

function NavItem({ href, icon, text, isOpen, isActive = false, setIsActive }) {
  return (
      <Link 
        href={href} 
        className={`flex items-center ${isOpen ? 'space-x-3' : 'justify-center'} ${
          isActive ? 'text-[#000072] font-bold' : 'text-gray-700 hover:bg-gray-100 hover:font-bold'
        } rounded-lg p-2`}
        onClick={() => setIsActive(text)}
      >
        {icon}
        {isOpen && <span>{text}</span>}
      </Link>
  )
}