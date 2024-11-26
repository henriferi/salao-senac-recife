'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";  // useRouter do Next.js

export default function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();  // Hook para navegação

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
            const { token } = await res.json();
            localStorage.setItem("authToken", token);
            router.push("/");  // Usando o useRouter para redirecionar
        } else {
            const { message } = await res.json();  // Alterado para 'message' ao invés de 'error'
            setError(message);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 min-h-screen bg-[url('/senac-salaobg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="w-96 bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4">
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
                    <div className="mb-4">
                        <label className="block text-gray-700">Senha</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Digite sua senha"
                            required
                        />
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
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4">
                        {isRegistering ? "Cadastrar" : "Entrar"}
                    </button>
                    <p className="text-center">
                        {isRegistering ? (
                            <>
                                Já tem uma conta?{" "}
                                <span
                                    className="text-blue-500 cursor-pointer"
                                    onClick={() => setIsRegistering(false)}
                                >
                                    Faça login
                                </span>
                            </>
                        ) : (
                            <>
                                Não tem uma conta?{" "}
                                <span
                                    className="text-blue-500 cursor-pointer"
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
