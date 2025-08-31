'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = (productsData as Product[]).find(p => p.id === productId);
    if (!foundProduct) {
      notFound();
    }
    setProduct(foundProduct);
    setLoading(false);
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando produto...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`, {
      description: `Total: R$ ${(product.price * quantity).toFixed(2).replace('.', ',')}`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <span>Início</span>
          <span>›</span>
          <span className="capitalize">{product.category}</span>
          <span>›</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg border overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Imagem ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Video */}
            {product.video && (
              <div className="aspect-video bg-white rounded-lg border overflow-hidden">
                <iframe
                  src={product.video}
                  title={`Vídeo de demonstração - ${product.name}`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-gray-600">
                    {product.rating} ({product.reviews} avaliações)
                  </span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.discount > 0 && (
                <Badge variant="destructive" className="bg-red-500 text-white">
                  -{product.discount}% OFF
                </Badge>
              )}
              {product.freeShipping && (
                <Badge className="bg-green-500 text-white">
                  Frete Grátis
                </Badge>
              )}
              {product.stock <= 10 && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                  Últimas {product.stock} unidades
                </Badge>
              )}
            </div>

            {/* Price */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-green-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-gray-600">
                  ou 12x de {formatPrice(product.price / 12)} sem juros no cartão
                </p>
                <p className="text-sm text-gray-600">
                  À vista no PIX: {formatPrice(product.price * 0.95)} (5% desconto)
                </p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="bg-white p-6 rounded-lg border space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium text-gray-900">Quantidade:</label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  ({product.stock} disponíveis)
                </span>
              </div>

              <Button 
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 font-bold text-lg py-6"
              >
                Adicionar ao Carrinho - {formatPrice(product.price * quantity)}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" className="font-medium">
                  Comprar Agora
                </Button>
                <Button variant="outline" size="lg" className="font-medium">
                  ❤️ Favoritar
                </Button>
              </div>
            </div>

            {/* Shipping and Security */}
            <div className="bg-white p-6 rounded-lg border space-y-4">
              <h3 className="font-bold text-gray-900">Entrega e Segurança</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">Entrega: {product.shipped}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">Garantia de 30 dias</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">Pagamento 100% seguro</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">Troca e devolução grátis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="bg-white rounded-lg border">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="specifications">Especificações</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Sobre o Produto</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-6">
                <h4 className="font-bold mb-3">Características Principais:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Especificações Técnicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Categoria:</span>
                    <span className="capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Garantia:</span>
                    <span>30 dias</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Prazo de Entrega:</span>
                    <span>{product.shipped}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Avaliações dos Clientes</h3>
                <div className="flex items-center space-x-2">
                  {renderStars(product.rating)}
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews} avaliações)</span>
                </div>
              </div>

              <Separator />

              {/* Sample Reviews */}
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">João S.</span>
                      <Badge variant="outline" className="text-xs">Compra verificada</Badge>
                    </div>
                    <div className="flex">
                      {renderStars(5)}
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Produto excelente! Chegou rapidamente e exatamente como descrito. 
                    Qualidade surpreendente pelo preço. Recomendo!
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Há 2 dias</p>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Maria L.</span>
                      <Badge variant="outline" className="text-xs">Compra verificada</Badge>
                    </div>
                    <div className="flex">
                      {renderStars(4)}
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Muito bom o produto. Entrega foi rápida e o atendimento excelente. 
                    Vale cada centavo investido.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Há 1 semana</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Carlos R.</span>
                      <Badge variant="outline" className="text-xs">Compra verificada</Badge>
                    </div>
                    <div className="flex">
                      {renderStars(5)}
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Superou minhas expectativas! Produto de qualidade e entrega super rápida. 
                    Já comprei outros produtos da loja.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Há 2 semanas</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}