'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const router = useRouter();

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) {
            setNomeUsuario(storedName);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        router.push("/login"); 
    };

    return (
        <div className="flex items-center justify-end p-2">
            <h1 className="text-sm font-semibold m-2">
                Bem-vindo(a), {nomeUsuario || "Usuário"}
            </h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
                Sair
            </button>
        </div>
    );
}
