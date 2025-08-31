'use client';

import { useState, useEffect } from 'react';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import CategoryFilter from '@/components/CategoryFilter';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setProducts(productsData as Product[]);
      setFilteredProducts(productsData as Product[]);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando produtos...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Trust Indicators */}
        <section className="bg-white py-8 border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-green-600 font-bold text-lg">F</span>
                </div>
                <p className="text-sm font-medium text-gray-900">Entrega Rápida</p>
                <p className="text-xs text-gray-600">2-5 dias úteis</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-blue-600 font-bold text-lg">S</span>
                </div>
                <p className="text-sm font-medium text-gray-900">Compra Segura</p>
                <p className="text-xs text-gray-600">SSL Certificado</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-purple-600 font-bold text-lg">G</span>
                </div>
                <p className="text-sm font-medium text-gray-900">Troca Garantida</p>
                <p className="text-xs text-gray-600">30 dias</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-orange-600 font-bold text-lg">P</span>
                </div>
                <p className="text-sm font-medium text-gray-900">PIX ou Cartão</p>
                <p className="text-xs text-gray-600">Parcelamento</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Produtos Mais Vendidos
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Selecionamos os produtos com melhor avaliação e mais procurados no Brasil. 
                Qualidade garantida e entrega rápida para todo o país.
              </p>
            </div>

            {/* Category Filter */}
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
                <Button 
                  onClick={() => setSelectedCategory('all')}
                  className="mt-4"
                >
                  Ver Todos os Produtos
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-blue-600 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Receba Ofertas Exclusivas
            </h3>
            <p className="text-blue-100 mb-6">
              Cadastre-se e seja o primeiro a saber sobre promoções e novos produtos
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-blue-300"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-medium">
                Cadastrar
              </Button>
            </div>
            <p className="text-xs text-blue-200 mt-3">
              Seus dados estão seguros. Não compartilhamos com terceiros.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}