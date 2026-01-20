"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { setCookie, isAuthenticated } from "../../lib/auth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { login, getMovies } from "../../lib/api"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // check if already logged in
    useEffect(() => {
        if (isAuthenticated()) {
        router.push("/movies");
        }
    }, [router]);

    const params = useSearchParams();
    const redirect = params.get("redirect");

    useEffect(() => {
        if (redirect) {
          alert(`Please login to access`);
        }
      }, [redirect]);

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
          if (data.user.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/movies');
          }
      
        } catch (error) {
          alert('Login failed');
        }
      };

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

    <div>
        
    <main className="bg-black min-h-screen">
        
        <section className="relative h-[70vh] w-full">
            
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
                
                <h1 className="text-4xl md:text-4xl font-bold text-white drop-shadow-lg">
                Easier Movie Booking Experience
                </h1>

                <form onSubmit={handleLogin} className="mt-8 p-8">
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

                    <button
                        type="submit"
                        className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-800 text-white font-semibold rounded-full shadow-lg transition">
                            Login
                    </button>

                    <Link href="/register">
                        <p className="mt-8 text-gray-500 hover:text-white underline cursor-pointer">
                            Don't have an account? Register here.
                        </p>
                    </Link>

                </form>
            </div>
        </section>

        <section className="pt-20 pb-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-10">NOW SHOWING</h2>

            <div className="mb-5 flex flex-wrap justify-center gap-6 px-4">

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation = {false}
                autoplay={{ delay: 3000 }}
                slidesOffsetBefore={100}
                slidesPerView={3}
                spaceBetween={10}
                loop={true}
                >
                
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                    <Link href={`/movies/${movie.id}`} key={movie.id}>
                    <div key={movie.id} className="m-4 rounded-lg w-55 hover:scale-105 transition-transform">
                        <img src={movie.img} alt={movie.title} className="bg-white p-0.5 rounded-md mb-3 w-full h-80 object-cover" />
                    </div>
                    </Link>
                    </SwiperSlide>
                ))}
                    
                </Swiper>
            </div>
        </section>

    </main>
  
    </div> // closes all html
  );
}  