'use client'

import { createMovie } from "../../lib/api";
import { useRouter } from "next/navigation";
import { useEffect } from 'react'

export default function CreateMoviePage(){
    const router = useRouter();

    async function fetchMovies(){
            
        const role = localStorage.getItem('role');
        if (role !== 'admin')
            router.push('/login');
        }

    useEffect(() => {
        fetchMovies();
    }, []);

    async function handleSubmit(e: any){
        e.preventDefault();

        const form = e.target;

        await createMovie({
            title: form.title.value,
            year: Number(form.year.value),
            director: form.director.value,
            duration: Number(form.duration.value),
            genre: form.genre.value.split(",").map(e => e.trim()),
            description: form.description.value,
            img: form.img.value,
        });

        alert('Movie created')
        form.reset();

        router.push('/admin');
        router.refresh();
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Add New Movie</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input name="title" placeholder="Movie Title" className="border px-3 py-2 rounded-md"/>
                <input name="year" placeholder="Year" type="number" className="border px-3 py-2 rounded-md"/>
                <input name="director" placeholder="Director" className="border px-3 py-2 rounded-md"/>
                <input name="duration" placeholder="Duration (minutes)" type="number" className="border px-3 py-2 rounded-md"/>
                <input name="genre" placeholder="Genre" className="border px-3 py-2 rounded-md"/>
                <input name="img" placeholder="Poster URL" className="border px-3 py-2 rounded-md"/>
                <textarea name="description" placeholder="Synopsis" className="border px-3 py-2 rounded-md resize-none h-24"/>
                
                <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                    Create
                </button>
            </form>
        </div>
    );
}
