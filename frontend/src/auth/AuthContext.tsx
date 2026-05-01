import { createContext, useContext, useState, useEffect } from "react"

type AuthContextType = {
	isAuthenticated: boolean;
	user: string | null;
	login: (username: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
		const [isAuthenticated, setIsAuthenticated] = useState(false);

		useEffect(() => {
			const stored = localStorage.getItem("auth");
			if (stored === "true") setIsAuthenticated(true);
		}, []);

		const login = () => {
			localStorage.setItem("auth", "true");
			setIsAuthenticated(true);
		};

		const logout = () => {
			localStorage.removeItem("auth");
			setIsAuthenticated(false);
		};

		return (
			<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
					{children}
			</AuthContext.Provider>
		);
}

export function useAuth() {
		const ctx = useContext(AuthContext);
		if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
		return ctx;
}