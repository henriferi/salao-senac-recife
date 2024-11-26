'use client'

import { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa'; // Importando o ícone de carregamento (Spinner)

const Loading = ({ delay = 1000 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Define o tempo de carregamento com base no delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay); // O tempo de delay será 1 segundo por padrão (1000ms)

    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
  }, [delay]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return null; // Retorna null quando o carregamento terminar
};

export default Loading;
