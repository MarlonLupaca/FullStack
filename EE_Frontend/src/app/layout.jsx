import { Montserrat_Alternates, Nunito } from 'next/font/google';
import './globals.css';
import { ProductProvider } from './context/ProductContext';
import ChatWidget from './Components/chat/ChatWidget';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const montserrat = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} bg-tertiary text-black h-fit bg-[url(/back/fondo_pedidos2.svg)] bg-cover bg-no-repeat bg-center`}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'white',
              color: 'black',
            },
          }}
        />
        <AuthProvider>
          <ProductProvider>
            <main>
              <ChatWidget />
              {children}
            </main>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
