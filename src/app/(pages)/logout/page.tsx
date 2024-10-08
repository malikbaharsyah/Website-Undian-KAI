"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useFetchAPI from "../../components/hooks/fetchAPI";

export default function LogoutPage() {
    const router = useRouter();
    const fetchAPI = useFetchAPI();

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
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen w-screen font-poppins">
            Logging out...
        </div>
    );
}
