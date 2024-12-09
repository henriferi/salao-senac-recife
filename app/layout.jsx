import Link from "next/link";
import './globals.css';
import { FaHome, FaInfoCircle, FaRegSmile, FaWhatsapp } from 'react-icons/fa';

export const metadata = {
  title: "Salão Escola Senac",
  description: "Salão de beleza do Senac",
};

export default function Layout({ children }) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen text-gray-800">
        <header className="bg-customBlue text-white py-6 shadow-md shadow-zinc-600">
          <div className="container mx-auto px-4">
            <nav>
              <ul className="flex flex-wrap justify-center gap-8 sm:gap-20">
                <li>
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold text-sm sm:text-base relative transition-all duration-300 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-customOrange after:transition-all after:duration-300"
                  >
                    <FaHome size={20} className="sm:size-25" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sobrenos"
                    className="flex items-center gap-2 font-semibold text-sm sm:text-base relative transition-all duration-300 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-customOrange after:transition-all after:duration-300"
                  >
                    <FaInfoCircle size={20} className="sm:size-25" />
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contato"
                    className="flex items-center gap-2 font-semibold text-sm sm:text-base relative transition-all duration-300 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-customOrange after:transition-all after:duration-300"
                  >
                    <FaWhatsapp size={20} className="sm:size-25" />
                    Contato
                  </Link>
                </li>
                <li>
                  <Link
                    href="/feedbackpremiado"
                    className="flex items-center gap-2 font-semibold text-sm sm:text-base relative transition-all duration-300 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-customOrange after:transition-all after:duration-300"
                  >
                    <FaRegSmile size={20} className="sm:size-25" />
                    Feedback Premiado
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="w-full">{children}</main>

        <footer className="bg-customOrange text-white py-4">
          <div className="flex flex-col items-center gap-3 container mx-auto text-center px-4">
            <img src="/senac.png" alt="logo Senac" className="w-16 sm:w-20" />
            <p className="text-sm sm:text-base">
              &copy; {new Date().getFullYear()} Salão Senac Recife. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
