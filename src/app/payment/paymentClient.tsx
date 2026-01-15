"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function PaymentClient() {

    const searchParams = useSearchParams();

    useEffect(() => {
        const movieId = searchParams.get("movieId");
        const seats = searchParams.get("seats");

    }, [searchParams]);

    return null;
}