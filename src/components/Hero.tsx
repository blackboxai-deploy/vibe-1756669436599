import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Os Melhores 
                <span className="text-yellow-300"> Produtos</span><br />
                com Entrega Rápida
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 mt-4">
                Produtos selecionados, preços imbatíveis e entrega garantida para todo o Brasil
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-green-900 text-sm font-bold">✓</span>
                </div>
                <span className="text-lg">Entrega em 2-5 dias úteis</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-green-900 text-sm font-bold">✓</span>
                </div>
                <span className="text-lg">Pagamento seguro com PIX ou Cartão</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-green-900 text-sm font-bold">✓</span>
                </div>
                <span className="text-lg">Garantia de 30 dias</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <Link href="#produtos">
                <Button size="lg" className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 font-bold px-8">
                  Ver Produtos
                </Button>
              </Link>
              <Link href="/ofertas">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 font-bold px-8">
                  Ofertas Especiais
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Featured Product Showcase */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-2">🔥 Produto em Destaque</h3>
                <p className="text-blue-100">Mais vendido esta semana</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 text-gray-900 mb-4">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8d358a2e-093a-4421-a4e0-701567cb5686.png"
                  alt="Fone Bluetooth TWS Pro - Produto em destaque"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="font-bold text-lg mb-2">Fone Bluetooth TWS Pro</h4>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold text-green-600">R$ 89,90</span>
                    <span className="text-sm text-gray-500 line-through ml-2">R$ 149,90</span>
                  </div>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                    -40%
                  </span>
                </div>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 mr-2">
                    ★★★★★
                  </div>
                  <span className="text-sm text-gray-600">(324 avaliações)</span>
                </div>
                <Link href="/produto/1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <p className="text-blue-100 text-sm">
                  ⚡ Últimas 3 unidades em estoque!
                </p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold animate-bounce">
              FRETE GRÁTIS
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold">
              ENTREGA RÁPIDA
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-300">5000+</div>
              <div className="text-blue-100">Produtos Vendidos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">4.8★</div>
              <div className="text-blue-100">Avaliação Média</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">98%</div>
              <div className="text-blue-100">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">24h</div>
              <div className="text-blue-100">Suporte Ativo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}