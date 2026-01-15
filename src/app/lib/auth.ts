// Set a cookie with expiration time (default 30 minutes)
export const setCookie = (name: string, value: string, minutes: number = 30) => {
    if (typeof document === "undefined") return;

    const expires = new Date();
    expires.setTime(expires.getTime() + minutes * 60 * 1000);

    document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
};

// Get a cookie value by name
export const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
  
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));
  
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

// remove a cookie
export const removeCookie = (name: string) => {
    if (typeof document === "undefined") 
    return;

    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax`;
};

// Check if user is logged in (based on cookies)
export const isAuthenticated = (): boolean => {
    const token = getCookie("auth-token");
    const username = getCookie("username");
    return !!(token && username);
};

// Logout — clear cookies and redirect to /login
export const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    removeCookie("auth-token");
    removeCookie("username");
    window.location.href = "/login";
};