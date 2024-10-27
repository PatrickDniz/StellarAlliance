import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const lato = Lato({  weight: ['400', '700'], subsets: ["latin"] });

export const metadata = {
  title: 'StellarAlliance - Protegendo o Cosmos',
  description: 'Unindo forças para proteger o cosmos!',
  keywords: 'StellarAlliance, Defesa Espacial, Sustentabilidade, Inovação, Monitoramento',
  icons: {
    icon: ['/favicon/favicon.ico']
  }
}

export default function RootLayout({ children }) {
 
  return (
    <html lang="pt-BR">
      <body className={lato.className}>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}
