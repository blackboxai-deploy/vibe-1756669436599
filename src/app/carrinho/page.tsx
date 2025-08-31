'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [cep, setCep] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 150 ? 0 : 15.90;
  const total = subtotal + shipping;

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removido do carrinho`);
  };

  const calculateShipping = () => {
    if (cep.length === 8) {
      setShippingCalculated(true);
      toast.success('Frete calculado com sucesso!');
    } else {
      toast.error('CEP inválido. Digite apenas números.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center bg-white rounded-lg p-12 border">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🛒</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-gray-600 mb-6">
              Que tal dar uma olhada nos nossos produtos incríveis?
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seu Carrinho</h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? 'item' : 'itens'} no seu carrinho
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <Link
                          href={`/produto/${item.product.id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-600 capitalize">
                          Categoria: {item.product.category}
                        </p>
                      </div>
                      <div className="text-right mt-2 sm:mt-0">
                        <div className="text-xl font-bold text-green-600">
                          {formatPrice(item.product.price)}
                        </div>
                        {item.product.originalPrice > item.product.price && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(item.product.originalPrice)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {item.product.discount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          -{item.product.discount}%
                        </Badge>
                      )}
                      {item.product.freeShipping && (
                        <Badge className="bg-green-500 text-white text-xs">
                          Frete Grátis
                        </Badge>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">Quantidade:</span>
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x min-w-[50px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                            disabled={item.quantity >= item.product.stock}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remover
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">
                        Subtotal: {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  clearCart();
                  toast.success('Carrinho limpo com sucesso!');
                }}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Limpar Carrinho
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Shipping Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Calcular Frete</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Digite seu CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    maxLength={8}
                  />
                  <Button onClick={calculateShipping} size="sm">
                    OK
                  </Button>
                </div>
                
                {shippingCalculated && (
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Entrega padrão (5-7 dias):</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                      </span>
                    </div>
                  </div>
                )}

                {subtotal >= 150 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center text-green-700">
                      <span className="text-sm">🎉 Parabéns! Você ganhou frete grátis!</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout">
                    <Button className="w-full bg-green-600 hover:bg-green-700 font-bold text-lg py-6">
                      Finalizar Compra
                    </Button>
                  </Link>
                  
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Continuar Comprando
                    </Button>
                  </Link>
                </div>

                {/* Security Badges */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="text-green-600 mr-1">🔒</span>
                      <span>Compra Segura</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-1">💳</span>
                      <span>PIX ou Cartão</span>
                    </div>
                  </div>
                  
                  <div className="text-center text-xs text-gray-500">
                    🔒 Seus dados estão protegidos por criptografia SSL
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coupon */}
            <Card>
              <CardHeader>
                <CardTitle>Cupom de Desconto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Digite seu cupom"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <Button variant="outline" size="sm">
                    Aplicar
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Cupons válidos: PRIMEIRA10, FRETE20
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}