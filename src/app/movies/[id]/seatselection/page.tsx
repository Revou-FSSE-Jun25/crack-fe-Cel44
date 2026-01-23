import SeatSelectionClient from "./seatSelectionClient";
import { Suspense } from "react";

export default function SeatSelectionPage(){
    return (
        <Suspense>
            <SeatSelectionClient />
        </Suspense>
    ); 
}