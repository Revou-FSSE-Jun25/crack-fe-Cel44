"use client";

import { Suspense } from "react";
import PaymentClient from "./paymentClient";

export default function PaymentPage() {
   return (
    <Suspense>
        <PaymentClient />
    </Suspense>
   );
}
