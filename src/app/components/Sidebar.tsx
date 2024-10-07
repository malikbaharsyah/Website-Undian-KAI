"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  TrophyIcon,
  LogOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } font-poppins h-screen bg-[#F3F3F3] border-r border-gray-200 flex flex-col transition-all duration-500 ease-in-out relative`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-4 bg-white border border-gray-200 rounded-full transition-all duration-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronLeftIcon className="h-4 w-4 transition-transform duration-500" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 transition-transform duration-500" />
        )}
      </Button>
      <div className={`p-4 ${isOpen ? "" : "justify-center"}`}>
        <div
          className={`flex items-center ${
            isOpen ? "space-x-3" : "justify-center"
          }`}
        >
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          {isOpen && (
            <span className="text-lg text-[#333333] font-bold">Admin</span>
          )}
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <NavItem
            href="/lottery"
            icon={<HomeIcon className="h-5 w-5" />}
            text="Lottery"
            isOpen={isOpen}
            isActive={pathname === "/lottery"}
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
        <Button
          variant="ghost"
          className={`${
            isOpen ? "w-full justify-start" : "w-auto p-2"
          } text-gray-700 hover:bg-gray-100`}
          asChild
        >
          <Link href="/logout" className="flex items-center space-x-3">
            <LogOutIcon className="h-5 w-5" />
            {isOpen && <span>Logout</span>}
          </Link>
        </Button>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  text,
  isOpen,
  isActive = false,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center ${
        isOpen ? "space-x-3" : "justify-center"
      } ${
        isActive
          ? "text-[#000072] font-bold"
          : "text-[#333333]/[0.6] hover:text-[#333333] hover:font-bold"
      } rounded-lg p-2 transition-colors duration-300`}
    >
      {icon}
      {isOpen && <span>{text}</span>}
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
