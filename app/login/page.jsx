'use client';
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegistering && formData.password !== formData.confirmPassword) {
            setError("As senhas não coincidem!");
            return;
        }

        const endpoint = isRegistering ? "/api/auth/cadastro" : "/api/auth/login";
        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: isRegistering ? formData.name : undefined,
                email: formData.email,
                password: formData.password,
            }),
        });
        
        if (res.ok) {
            const { name, token } = await res.json();
            localStorage.setItem("authToken", token);
            localStorage.setItem("userName", name);
            router.push("/");
        } else {
            const { message } = await res.json();
            setError(message);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 min-h-screen bg-[url('/senac-salaobg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="w-96 bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-customBlue">
                    <img src="/senac.png" alt="logo senac" className="w-20 mb-4" />
                    {isRegistering ? "Cadastro" : "Login"}
                </h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {isRegistering && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Nome</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Digite seu nome"
                                required
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Digite seu email"
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Senha</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Digite sua senha"
                            minLength={6}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-9 text-gray-500 select-none"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {isRegistering && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Confirmar Senha</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Confirme sua senha"
                                required
                            />
                        </div>
                    )}
                    <button className="w-full bg-customBlue  font-semibold text-white py-2 rounded-lg mb-4 hover:bg-customOrange transition">
                        {isRegistering ? "Cadastrar" : "Entrar"}
                    </button>
                    <p className="text-center">
                        {isRegistering ? (
                            <>
                                Já tem uma conta?{" "}
                                <span
                                    className="text-blue-500 cursor-pointer hover:underline"
                                    onClick={() => setIsRegistering(false)}
                                >
                                    Faça login
                                </span>
                            </>
                        ) : (
                            <>
                                Não tem uma conta?{" "}
                                <span
                                    className="text-blue-500 cursor-pointer hover:underline"
                                    onClick={() => setIsRegistering(true)}
                                >
                                    Cadastre-se
                                </span>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div>

    );
}
