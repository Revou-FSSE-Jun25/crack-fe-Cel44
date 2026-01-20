'use client'

import { useRouter } from "next/navigation";
import { deleteMovie } from "@/src/app/lib/api";

export default function DeleteButton ({ id}: {id:number}){
    const router = useRouter();

    async function handleDelete(){
        if (!confirm('Delete this movie? (this cannot be undone)'))
            return;

        try {
            await deleteMovie(id);
            router.refresh();

        } catch (error) {
            alert((error as Error).message);
        }

    }

    return( 
        <button
        className="m-1 px-2 bg-red-500 hover:bg-red-700 rounded"
        onClick={handleDelete}
        >
            Delete
        </button>
    )

}