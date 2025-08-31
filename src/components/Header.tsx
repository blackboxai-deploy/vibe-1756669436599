'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Header() {
  const { getTotalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white text-center py-2 text-sm">
        🎉 FRETE GRÁTIS para compras acima de R$ 150,00 | Entrega em todo Brasil
      </div>

      {/* Main Header */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DropShip</h1>
              <p className="text-xs text-gray-500">Brasil</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10"
              />
              <Button 
                size="sm" 
                className="absolute right-1 top-1 h-7 px-3"
              >
                Buscar
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navegue pelas categorias
                  </SheetDescription>
                </SheetHeader>
                <nav className="mt-6 space-y-4">
                  <Link href="/" className="block py-2 text-gray-900 hover:text-blue-600">
                    Início
                  </Link>
                  <Link href="/produtos" className="block py-2 text-gray-900 hover:text-blue-600">
                    Produtos
                  </Link>
                  <Link href="/categorias" className="block py-2 text-gray-900 hover:text-blue-600">
                    Categorias
                  </Link>
                  <Link href="/sobre" className="block py-2 text-gray-900 hover:text-blue-600">
                    Sobre
                  </Link>
                  <Link href="/contato" className="block py-2 text-gray-900 hover:text-blue-600">
                    Contato
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Início
              </Link>
              <Link href="/produtos" className="text-gray-700 hover:text-blue-600 font-medium">
                Produtos
              </Link>
              <Link href="/sobre" className="text-gray-700 hover:text-blue-600 font-medium">
                Sobre
              </Link>
            </nav>

            {/* Cart */}
            <Link href="/carrinho">
              <Button variant="outline" size="sm" className="relative">
                <span className="hidden sm:inline mr-2">Carrinho</span>
                <span className="text-lg">🛒</span>
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-20"
            />
            <Button 
              size="sm" 
              className="absolute right-1 top-1 h-7 px-3"
            >
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}