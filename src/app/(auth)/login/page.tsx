"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { isAuthenticated } from "../../lib/auth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { login, getMovies } from "../../lib/api"
import RedirectPage from "./redirect";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    //handle Login untuk frontend only
    // const handleLogin = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setError("");
    //     setIsLoading(true);

    // try {
    //     const data = {accessToken: "mock-access-token-123",
    //     refreshToken: "mock-refresh-token-xyz",
    //     username: username
    //     };

    //     // login data from API
    //     // const data = await api.login(username, password);
    //     // console.log("Login successful:", data);

    //     // manually set cookies data
    //     setCookie('auth-token', data.accessToken, 30);
    //     setCookie("refreshToken", data.refreshToken, 30);
    //     setCookie('username', data.username, 30);

    //     alert(`Welcome ${data.username}!`);

    //     if (username === "admin") {
    //         router.push("/admin");
    //       } else {
    //         router.push("/movies");
    //       }

    //     alert("Login successful!");

    // } catch (error) {
    //     setError("Invalid username and password");
    // } finally {
    //     setIsLoading(false);
    // }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
      
        try {
            const data = await login(email, password);
        
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('role', data.user.role);
        
            // redirect sesuai role
            if (data.user.role === 'ADMIN') {
                router.replace('/admin');
            } else {
                router.replace('/movies');
            }
      
        } catch (error) {
            setError("Invalid email or password");
        }
    }

    useEffect(() => {
        async function fetchMovies() {
            try {
            const data = await getMovies();
            setMovies(data); // hanya movie dari database
            } catch (err) {
            console.error(err);
            alert("Failed to load movies");
            } finally {
            setLoading(false);
            }
        }

        fetchMovies();
    }, [router]);

    return (
    
    <Suspense fallback={<>...</>}>
        <RedirectPage />
    
        <div>
            
        <main className="bg-black min-h-screen">
            
        <section className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] w-full">
                
                {/* ----------------------- Background Image ----------------------- */}
                <Image
                    src="/heronew.jpg"
                    alt="Cinema background"
                    fill
                    className="object-cover brightness-50"
                    loading="eager"
                />

                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    
                    <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                    Easier Movie Booking Experience
                    </h1>

                    <form onSubmit={handleLogin} className="mt-8 p-4 sm:p-6 w-full max-w-sm sm:max-w-md">
                        <div>
                            <input
                                id = "email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border bg-white rounded-full px-10 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-center"
                                placeholder="Username/Email"
                            />
                        </div>

                        <div>
                            <input
                                id = "password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-2 w-full border bg-white rounded-full px-10 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 text-center"
                                placeholder="Password"
                            />
                        </div>
                        

                        {error && (
                            <p className="mt-4 text-red-500 text-sm">
                                {error}
                            </p>
                        )}

                        <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-800 text-white font-semibold rounded-full shadow-lg transition disabled:opacity-50"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>


                        <Link href="/register">
                            <p className="mt-8 text-gray-500 hover:text-white underline cursor-pointer">
                                Don't have an account? Register here.
                            </p>
                        </Link>

                    </form>
                </div>
            </section>

            {/*    -------------------------- LOGIN SAMPAI DI SINI -------------------- */}

            <section className="pt-20 pb-10 text-center">
                <h2 className="text-2xl font-bold text-white mb-10">NOW SHOWING</h2>

                <div className="mb-5 px-4 flex justify-center">
                    {movies.length > 0 && (
                        <Swiper
                        key={movies.length}
                        className="w-full"
                        modules={[Navigation, Autoplay]}
                        autoplay={{ delay: 3000 }}
                        slidesPerView={5}
                        spaceBetween={20}
                        breakpoints={{
                            0: {slidesPerView: 1.2,},
                            640: {slidesPerView: 2,},
                            768: {slidesPerView: 3,},
                            1024: {slidesPerView: 4,},
                            1280: {slidesPerView: 5,},
                          }}
                        loop
                        >
                        {movies.map((movie) => (
                            <SwiperSlide key={movie.id}>
                            <Link href={`/movies/${movie.id}`}>
                                <div className="rounded-lg hover:scale-105 transition-transform">
                                <img
                                    src={movie.img}
                                    alt={movie.title}
                                    className="bg-white p-0.5 rounded-md w-56 h-56 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg-w-80 object-cover"
                                />
                                </div>
                            </Link>
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    )}
                </div>

            </section>

        </main>
    
        </div> 
    </Suspense>
  );
}  