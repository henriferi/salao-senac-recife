'use client'

import AuthGuard from "../components/AuthGuard";
import Loading from "../components/Loading";
import Logout from "../components/Logout";
import { useState, useEffect } from "react";

export default function FeedbackPremiado() {
  const [comentarios, setComentarios] = useState([]);
  const [nome, setNome] = useState("");
  const [comentario, setComentario] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [estrelas, setEstrelas] = useState(0);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const comentariosPorPagina = 5;

  useEffect(() => {
    const fetchComentarios = async () => {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      setComentarios(data);
    };

    fetchComentarios();
  }, []);

  const indiceFinal = paginaAtual * comentariosPorPagina;
  const indiceInicial = indiceFinal - comentariosPorPagina;
  const comentariosPaginados = comentarios.slice(indiceInicial, indiceFinal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!nome || !comentario || estrelas === 0) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, comentario, estrelas }),
      });

      if (!res.ok) throw new Error("Erro ao enviar o comentário.");

      const novoComentario = await res.json();

      setComentarios([novoComentario, ...comentarios]);

      setNome("");
      setComentario("");
      setEstrelas(0);
      setSucesso("Feedback enviado com sucesso!");
    } catch (err) {
      setErro("Erro ao enviar o comentário. Tente novamente.");
    }
  };

  const handleProximaPagina = () => {
    if (comentarios.length > paginaAtual * comentariosPorPagina) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  return (
    <AuthGuard>
      <Loading delay={300} />
      <Logout />
      <div className="text-center p-6 bg-bgCards rounded-lg my-4 shadow-md sm:mx-auto max-w-3xl">
        <img
          src="/senac.png"
          alt="Logo Senac"
          className="mx-auto w-24 sm:w-32 h-auto mb-4"
        />
        <h1 className="text-3xl sm:text-5xl font-bold mb-2">
          Capriche No Feedback ✨
        </h1>
        <p className="text-sm sm:text-base">
          Os Feedbacks mais completos concorrerão a um procedimento de sua
          escolha totalmente gratuito com os profissionais do Senac.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="m-4 p-6 text-center flex flex-col items-center border-t border-customBlue max-w-lg sm:mx-auto"
      >
        <div className="mb-4 w-full">
          <label
            htmlFor="nome"
            className="text-customBlue text-lg sm:text-2xl block font-semibold"
          >
            Seu nome:
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-gray-200 outline-none rounded py-2 px-4 sm:px-6"
          />
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="comentario"
            className="text-customBlue text-lg sm:text-2xl block font-semibold"
          >
            Feedback:
          </label>
          <textarea
            id="comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="w-full bg-gray-200 outline-none rounded py-2 px-4 sm:px-6"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="estrelas"
            className="text-customBlue text-lg sm:text-2xl font-semibold"
          >
            Avaliação:
          </label>
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setEstrelas(star)}
                className={`cursor-pointer text-2xl sm:text-3xl ${
                  estrelas >= star ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-customBlue text-white px-8 sm:px-16 py-2 rounded hover:bg-customOrange transition"
        >
          Enviar
        </button>
      </form>
      <div className="mb-5 text-center">
        {erro && <p className="text-red-500 p-3">{erro}</p>}
        {sucesso && <p className="text-green-500 p-3">{sucesso}</p>}
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-customBlue text-xl sm:text-2xl font-semibold mt-4 mb-4">
          Feedbacks:
        </h2>
        <ul className="space-y-4 w-full px-4 sm:px-72">
          {comentariosPaginados.map((coment) => (
            <li
              key={coment.id}
              className="p-4 border border-gray-300 rounded bg-zinc-100"
            >
              <div className="break-words">
                <p className="font-bold text-xl">{coment.nome}</p>
                <p className="mt-1">{coment.comentario}</p>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${
                        coment.estrelas >= star
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(coment.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4 mb-4 gap-2 sm:gap-4">
          <button
            onClick={handlePaginaAnterior}
            className="bg-customBlue text-white px-4 py-2 rounded hover:bg-customOrange disabled:opacity-50 disabled:bg-zinc-600"
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>
          <button
            onClick={handleProximaPagina}
            className="bg-customBlue text-white px-4 py-2 rounded hover:bg-customOrange disabled:opacity-50 disabled:bg-zinc-600"
            disabled={comentarios.length <= paginaAtual * comentariosPorPagina}
          >
            Próxima
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
