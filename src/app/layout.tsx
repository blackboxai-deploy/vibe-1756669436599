import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DropShip Brasil - Os Melhores Produtos com Entrega Rápida',
  description: 'Loja online com os produtos mais vendidos no Brasil. Eletrônicos, casa, beleza e fitness com entrega rápida e segura.',
  keywords: 'dropshipping, produtos, Brasil, eletrônicos, casa, beleza, fitness, entrega rápida',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <Toaster richColors position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}