"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import fetchAPI from "../components/hooks/fetchAPI";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        fetchAPI("/logout", {
            method: "GET",
            credentials: "include",
        })
            .then(() => {
                localStorage.removeItem("username");
                router.push("/login");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    }, []);

    return (
        <div className="flex items-center justify-center h-screen w-screen font-poppins">
            Logging out...
        </div>
    );
}
