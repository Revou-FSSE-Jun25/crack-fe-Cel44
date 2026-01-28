const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  return res.json();
}


export async function getMovies(){
    console.log("API URL:", BASE_URL);

    try {
        const res = await fetch (`${BASE_URL}/movies`);
        const data = await res.json()

        if (Array.isArray(data)) return data;
        if (data)return [data];

        return []

    } catch (error){
        console.error(error);
        return []
    }
}

export async function createMovie(data: any) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) throw new Error("Failed to create movie");
    return await res.json();
}
  

export async function updateMovie(id: string, data: any) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");
  
    const res = await fetch(`${BASE_URL}/movies/${id}`, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
  
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update movie");
    }
  
    return res.json();
}
  

export async function getMovieById(id: string, token: string) {
    const res = await fetch(`${BASE_URL}/movies/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
  
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch movie");
    }
  
    return await res.json();
}
  

export async function deleteMovie(id: number) {
    const res = await fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        const message = await res.text();
        throw new Error(message || 'Delete failed');
    }

    return true;
}

// --------------------- REGISTER

export async function registerUser(user: { email: string; password: string }) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    let errorMsg = 'Register failed';
    try {
      const errorData = await res.json();
      if (errorData?.message) errorMsg = errorData.message;

    } catch (err) {
      console.warn('Cannot parse error JSON:', err);

    }
    throw new Error(errorMsg);
  }

  return await res.json();
}

// --------------------- SHOWTIME

export async function createShowtime(data: { time: string; movieId: number; price: number }, token: string) {
    const res = await fetch(`${BASE_URL}/showtimes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) throw new Error("Failed to create showtime");
    return res.json();
}

export async function updateShowtime(id: number, data: { time?: string; movieId?: number; price?: number }, token: string) {
    const res = await fetch(`${BASE_URL}/showtimes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) throw new Error("Failed to update showtime");
    return res.json();
}

export async function getShowtimeById(id: number, token: string) {
    const res = await fetch(`${BASE_URL}/showtimes/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error("Failed to fetch showtime");
  
    return res.json();
}

export async function getAllShowtimes(token: string) {
    if (!token) throw new Error("Not authenticated");
  
    const res = await fetch(`${BASE_URL}/showtimes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error("Failed to fetch showtimes");
  
    return res.json();
}

export async function deleteShowtime(id: number, token: string) {
    const res = await fetch(`${BASE_URL}/showtimes/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Failed to delete showtime");
    return res.json();
}

export async function getShowtimeSeats(showtimeId: number, token: string) {
    const res = await fetch(`${BASE_URL}/showtimes/${showtimeId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to fetch seats");
    }

    return res.json();
}

// --------------------- BOOKING

export async function createBooking(token: string, data: { showtimeId: number; seatIds: number[] }) {
    const res = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
  
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create booking");
    }
  
    return res.json();
}

export async function getMyBookings(token: string) {
    const res = await fetch(`${BASE_URL}/bookings/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error("Failed to fetch history");
    return res.json();
}  
  