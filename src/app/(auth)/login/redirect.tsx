"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation";

export default function RedirectPage(){
    const params = useSearchParams();
    const redirect = params.get("redirect");

    useEffect(() => {
        if (redirect) {
          alert(`Please login to access`);
        }
      }, [redirect]);
}