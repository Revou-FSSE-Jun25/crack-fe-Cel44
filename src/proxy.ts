import { NextResponse, NextRequest } from 'next/server';

interface JWTPayload {
    id: number;
    username: string;
    exp?: number;
}

function getUserRole(username?: string): "admin" | "user" {
    return username === "admin" ? "admin" : "user";
}

export function proxy(request: NextRequest) {
    
    const { pathname } = request.nextUrl;

    //public pages
    if (pathname === "/login" || pathname === "/faq" || pathname === "/register") { 
        return NextResponse.next()
    };

    const publicRoutes = ["/login", "/faq"];

    if (publicRoutes.includes(pathname)){
        return NextResponse.next()};
    
    //get token and username from cookies
    const token = request.cookies.get("auth-token")?.value;
    const username = request.cookies.get("username")?.value;

    // If not logged in (have no token), redirect to login
    if (!token || !username) {
        const loginURL = new URL("/login", request.url);
        loginURL.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginURL);
    }

    // decided expired date
    let decoded: JWTPayload = { id: 1, username, exp: Date.now() / 1000 + 60 * 30 };

    // check if token expired
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        const loginURL = new URL("/login", request.url);
        const response = NextResponse.redirect(loginURL);
        response.cookies.delete("auth-token");
        response.cookies.delete("username");
        response.cookies.delete("user-role");
        return response;
    }

    try {
        const userRole = getUserRole(username);

            // Role-based access control
        if (pathname.startsWith("/admin") && userRole !== "admin") {
            const accessDeniedUrl = new URL ("/login", request.url);
            accessDeniedUrl.searchParams.set("error", "Access Denied");
            return NextResponse.redirect(accessDeniedUrl);
        }

        if (pathname.startsWith("/store") && userRole === "admin") {
            const accessDeniedUrl = new URL ("/admin", request.url);
            accessDeniedUrl.searchParams.set("error", "Go back to admin");
            return NextResponse.redirect(accessDeniedUrl);
        }

        // DENY ACCESS TO CART FOR ADMINS
        if (pathname.startsWith("/cart") && userRole !== "user") {
            const accessDeniedUrl = new URL ("/login", request.url);
            accessDeniedUrl.searchParams.set("error", "Access Denied");
            return NextResponse.redirect(accessDeniedUrl);
        }

        //add user info to header for use
        const response = NextResponse.next();
        response.headers.set("x-user-username", username);
        response.headers.set("x-user-role", userRole);

        return response;
        
    } catch (error) {
        const loginURL = new URL("/login", request.url);
        const response = NextResponse.redirect(loginURL);
        response.cookies.delete("auth-token");
        response.cookies.delete("username");
        return response;
    }
}

export const config = {
    matcher: [
      "/((?!_next/static|_next/image|favicon.ico|.*\\.jpg|.*\\.jpeg|.*\\.png|.*\\.svg|.*\\.gif).*)",
    ],
};
  