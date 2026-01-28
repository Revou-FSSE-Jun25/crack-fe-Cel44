'use client'

import DeleteButton from './deletebutton';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"
import { getMovies, deleteMovie } from '../lib/api'

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const router = useRouter()
  const [loading, setLoading] = useState(true);

    // Fetch list movies + role check access
    async function fetchMovies(){
        
        const role = localStorage.getItem('role');
        if (role !== 'ADMIN')
            router.push('/login');

        const data = await getMovies();
        setMovies(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    async function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this movie?'))
            return;
    
        try {
            await deleteMovie(id);
            fetchMovies(); // refresh list setelah delete
            setMovies(prev => prev.filter(movie => movie.id !== id));

        } catch (error) {
            console.error(error);
            alert('Delete failed');
        }
    }

    return (
    <div className='px-8 pt-5 min-h-screen'>
        <main className="p-6">

        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-5">ADMIN</h2>
            <button
                onClick={() => router.push("/admin/create")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Add Movie
            </button>
        </div>

        <h2 className='mb-10 flex justify-center font-bold text-2xl'> 
            LIST OF MOVIES
        </h2>

        {/* List of Movies */}
        <div className="grid grid-cols-1 grid-cols-3 gap-6">
            {movies.map((movie) => (
                <div key={movie.id} className="rounded shadow p-4 flex flex-col items-center">
                    <img
                        src={movie.img}
                        alt={movie.title}
                        className="rounded mb-3 w-1/2 h-64 object-cover"
                    />
                    <div className=''>
                        <h3 className="font-bold text-lg">{movie.title}</h3>
                        <p className="text-gray-600">{movie.genre.join(", ")}</p>
                        <p className="text-gray-600">{movie.year}</p>
                    </div>
                    
                    <div className="mt-2 flex gap-2">

                    <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => router.push(`/admin/${movie.id}/showtime`)}
                    > 
                    Manage Showtime
                    </button>

                    <button
                        onClick={() => router.push(`/admin/${movie.id}/edit`)}
                        className="m-1 bg-green-500 px-2 rounded hover:bg-green-700"
                    >
                        Edit
                    </button>

                        <DeleteButton id={movie.id}/>
                        
                    </div>
                </div>
            ))}
            </div>
    </main>
        </div>
    );
}
