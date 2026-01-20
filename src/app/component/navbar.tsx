"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAuthenticated, logout } from "../lib/auth";
import { getUserRole } from "./getUserRole";

export default function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === "/login";
    const [role, setRole] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) {
            setIsLoggedIn(true);
        }}, []);

    useEffect(() => {
        setRole(getUserRole());
    }, []);

    

    return (
        <div
        className={`noborder ${isHomePage ? "bg-black" : "bg-black"} flex justify-between`}>

            <h1 className= {`m-4 relative p-2 text-2xl text-red-700 font-bold flex justify-left`} >TiBooth <span className="absolute bottom-10 right-0 w-1/2 h-0.5 bg-red-600"></span>
            <span className="absolute bottom-2 right-10 w-1/2 h-0.5 bg-red-900"></span>
            </h1>

            <nav 
            className = "m-5 flex gap-5 items-center">

                {/* LOGOUT/LOGIN BUTTON
                {isLoggedIn ? (
                    <button
                        onClick={() => { logout(); setIsLoggedIn(false); }}
                        className="bg-transparent text-xl font-semibold text-red-600 hover:text-red-800
                        cursor-pointer"
                    >Logout
                    </button>
                ) : (
                    <Link href="/login" className = {`text-xl font-semibold hover:text-blue-600 ${ isHomePage ? "text-white" : "text-white"}`}>Login</Link>
                )} */}

                <button
                    onClick={() => { logout() }}
                    className="bg-transparent text-xl font-semibold text-red-600 hover:text-red-800
                    cursor-pointer">
                        Logout
                </button>
                <Link href="/movies" className = {`text-xl font-semibold hover:text-blue-600 ${ isHomePage ? "text-white" : "text-white"}`}>Movies</Link>

                {role === "user" && (
                    <Link href="/history" className = {`text-xl font-semibold hover:text-blue-600 ${ isHomePage ? "text-white" : "text-white"}`}>History</Link>
                )}

                <Link href="/faq" className = {`text-xl font-semibold hover:text-blue-600 ${ isHomePage ? "text-white" : "text-white"}`}>FAQ</Link>
            </nav>

        </div>
    );
}