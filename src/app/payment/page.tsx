import movies from "@/data/movies.json";

type Props = {
    searchParams: Promise<{
        movieId?: string;
        seats?: string;
    }>;
}

export default async function PaymentPage( { searchParams }: Props) {
    const params = await searchParams;
    const movieId = Number(params.movieId);
    const seats = params.seats?.split(",").map(Number) || [];
    const movie = movies.find((m) => m.id === movieId);

    return (
        <main className="py-15 bg-black px-20 flex flex-col items-center min-h-screen border-t border-red-500/20">
            
            <h1 className="text-3xl text-white font-bold mb-15">TICKET</h1>
            
            {movie ? (
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                    <img src={movie.img} alt={movie.title} className="w-full h-90 object-contain mb-10" />
                    <h2 className="text-2xl font-semibold mb-2">{movie.title}</h2>
                    <h2 className="text-xl font-semibold mb-2">Duration: {movie.duration} minutes</h2>
                    <h2 className="text-xl font-semibold mb-4">Genre: {movie.genre.join(", ")}</h2>
                    <p className="mb-2">Selected Seats: <span className="font-semibold">{seats.join(", ")}</span></p>
                    <p className="mb-4">Total: Rp. <span className="font-semibold">{seats.length * movie.price}</span></p>


                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Confirm
                    </button>
                </div>
            ) : (
                <p className="text-red-500">Movie not found.</p>
            )}
        </main>
    );
}