"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "@/app/components/ui/avatar";
import { CircleUser } from "lucide-react";
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  TrophyIcon,
  LogOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon
} from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/app/components/ui/dropdown-menu";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        const storedSidebarState = localStorage.getItem("isSidebarOpen");
        setIsOpen(storedSidebarState === "true");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("isSidebarOpen", newState.toString());
  };

  const sidebarClassName = `${isOpen ? "w-64" : "w-20"} font-poppins min-h-screen bg-[#F3F3F3] border-r border-gray-200 flex flex-col transition-all duration-500 ease-in-out relative`;

  return (
    <div className={isFirstRender.current ? "font-poppins min-h-screen bg-[#F3F3F3] border-r border-gray-200 flex flex-col relative" : sidebarClassName}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-5 top-4 bg-white border border-gray-200 rounded-full transition-all duration-500 h-9 w-9 mt-1"
        onClick={() => {
          isFirstRender.current = false;
          toggleSidebar();
        }}
      >
        {isOpen ? (
          <ChevronLeftIcon className="h-4 w-4 transition-transform duration-500" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 transition-transform duration-500" />
        )}
      </Button>
      <div className={`p-4 ${isOpen ? "" : "justify-center"}`}>
        <div
          className={`flex items-center ${isOpen ? "space-x-3" : "justify-center"}`}
        >
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={120}
            height={50}
            className="p-2"
          />
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <NavItem
            href="/undian"
            icon={<HomeIcon className="h-5 w-5" />}
            text="Undian"
            isOpen={isOpen}
            isActive={pathname === "/undian"}
          />
          <NavItem
            href="/events"
            icon={<CalendarIcon className="h-5 w-5" />}
            text="Events"
            isOpen={isOpen}
            isActive={pathname === "/events" || pathname === "/events/add"}
          />
          <NavItem
            href="/participants"
            icon={<UsersIcon className="h-5 w-5" />}
            text="Participants"
            isOpen={isOpen}
            isActive={pathname === "/participants"}
          />
          <NavItem
            href="/winner-history"
            icon={<TrophyIcon className="h-5 w-5" />}
            text="Winner History"
            isOpen={isOpen}
            isActive={pathname === "/winner-history"}
          />
        </ul>
      </nav>
      <div className={`p-4 ${isOpen ? "" : "flex justify-center"}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
              <Avatar className="items-center justify-center">
                <CircleUser strokeWidth={1.2} size={32} color="#374151" />
              </Avatar>
              {isOpen && (
                <span className="text-lg text-gray-700 font-medium pl-2">{username}</span>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white border rounded-md p-1 shadow-lg">
            <DropdownMenuItem asChild>
              <Link href="/logout" className="flex items-centerp-2 rounded-md">
                <LogOutIcon className="h-5 w-5"
                color="#ef4444"
                />
                <span className="pl-2 text-red-600">Logout</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function NavItem({ href, icon, text, isOpen, isActive = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center ${isOpen ? "space-x-3" : "justify-center"} ${
        isActive ? "text-[#000072] font-medium" : "text-[#333333]/[0.6] hover:text-[#333333] hover:font-medium"
      } rounded-lg p-2 transition-colors duration-300`}
    >
      {icon}
      {isOpen && (
        <span className="w-36 overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
      )}
    </Link>
  );
}

interface NavItemProps {
  href: string;
  icon: JSX.Element;
  text: string;
  isOpen: boolean;
  isActive?: boolean;
}
