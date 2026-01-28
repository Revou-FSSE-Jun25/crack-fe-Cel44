import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterPage from "../app/register/page";
import * as api from "../app/lib/api";

// Mock useRouter
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("RegisterPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("render form dengan input dan tombol register", () => {
        render(<RegisterPage />);

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
    });

    test("register berhasil", async () => {
        jest.spyOn(api, "registerUser").mockResolvedValue({ success: true });

        render(<RegisterPage />);
        
        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: "success@example.com" },
        });
        
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: "password123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /register/i }));

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith("/login");
          });
        
    })

    test("register gagal menampilkan error", async () => {
        // Mock registerUser gagal
        jest.spyOn(api, "registerUser").mockImplementation(async (data) => {
        throw new Error("Register failed");
        });

        render(<RegisterPage />);

        fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: "fail@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: "password123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /register/i }));

        await waitFor(() => {
        expect(screen.getByText("email already exists")).toBeInTheDocument();
        });
    });

    test("register berhasil redirect ke login", async () => {
        // Mock registerUser berhasil
        jest.spyOn(api, "registerUser").mockResolvedValue({ success: true });

        render(<RegisterPage />);

        fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: "success@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: "password123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /register/i }));

        await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/login");
        });
    });
});
