'use client' 

import { useEffect, useState } from 'react';

export default function AuthGuard({ children }) {
  const [isClient, setIsClient] = useState(false); // Para verificar se estamos no cliente

  // Verifica se o código está sendo executado no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Se o código estiver no cliente, faz a verificação do token
  useEffect(() => {
    if (isClient) {
      const token = localStorage.getItem('authToken');
    
      // Se o token não existir, redireciona para o login
      if (!token) {
        window.location.replace('/login'); // Redirecionamento direto para a página de login
      }
    }
  }, [isClient]);

  // Exibe o conteúdo apenas se estivermos no cliente
  if (!isClient) {
    return <div>Loading</div>; // Ou algum loading se preferir
  }

  return <>{children}</>;
}
