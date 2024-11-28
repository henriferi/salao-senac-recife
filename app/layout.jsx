import Link from "next/link";
import './globals.css';
import { FaBars, FaHome, FaInfoCircle, FaRegSmile, FaTimes, FaWhatsapp } from 'react-icons/fa';

export const metadata = {
  title: "Salão Senac",
  description: "Salão de beleza do Senac",
};




export default function Layout({ children }) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen text-gray-800">
        <header className="bg-customBlue text-white py-8 shadow-md shadow-zinc-600">
          <div className="container mx-auto flex justify-center items-center">
            <nav>
              <ul className="flex space-x-20">
                <li>
                  <Link href="/" className="flex items-baseline gap-1 font-semibold relative transition-all duration-300 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-customOrange after:transition-all after:duration-300"><FaHome size={25} />Home</Link>
                </li>
                <li>
                  <Link href="/sobrenos" className="flex items-baseline gap-1 font-semibold relative transition-all duration-300 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-customOrange after:transition-all after:duration-300"><FaInfoCircle size={25} />Sobre nós</Link>
                </li>
                <li>
                  <Link href="/contato" className="flex items-baseline gap-1 font-semibold relative transition-all duration-300 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-customOrange after:transition-all after:duration-300"><FaWhatsapp size={25} />Contato</Link>
                </li>
                <li>
                  <Link href="/feedbackpremiado" className="flex items-baseline gap-1 font-semibold relative transition-all duration-300 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-customOrange after:transition-all after:duration-300"><FaRegSmile size={25} />Feedback Premiado</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        
        <main>
          {children}
        </main>

        <footer className="bg-customOrange text-white py-4 ">
          <div className="flex flex-col items-center gap-3 container mx-auto text-center">
            <img src="/senac.png" alt="logo Senac" className="w-20" />
            <p>&copy; {new Date().getFullYear()} Salão Senac Recife. Todos os direitos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
