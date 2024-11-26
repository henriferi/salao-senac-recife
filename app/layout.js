import "./globals.css";


export const metadata = {
  title: "Salão Senac",
  description: "Salão de beleza Senac",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
