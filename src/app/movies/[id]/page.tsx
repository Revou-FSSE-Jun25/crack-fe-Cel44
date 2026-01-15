import movies from "@/data/movies.json";
import ChooseSeatButton from "../../component/chooseseatbutton";

export default async function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

   const movieDetail = movies.find((movie) => movie.id === Number(id));
        if (!movieDetail) {
            return <div>Movie not found</div>;
        }

    return (
        <main className="py-20 px-20 flex gap-20 justify-center">
            <div className="flex gap-12">
                <img src={movieDetail?.img} alt={movieDetail?.title} width={600} height={1000} className="w-80 rounded-xl" />
            </div>
            
            <div>
                <h1 className= "text-2xl font-bold mb-4">{movieDetail?.title}</h1>
                <p className="text-gray-700 mb-2">Genre: {movieDetail?.genre.join(", ")}</p>
                <p className="text-gray-700 mb-2">Rating: {movieDetail?.rating}</p>
                <p className="text-gray-700 mb-4">Duration: {movieDetail?.duration} minutes</p>
                <p className="text-gray-700 mb-4">{movieDetail?.description}</p>
                <p className="text-gray-700 mb-4">Price: Rp.{movieDetail?.price}</p>

                <ChooseSeatButton 
                    movieId={movieDetail.id}
                    showtimes={movieDetail.showtimes}
                />

            </div>


        </main>
    );
}