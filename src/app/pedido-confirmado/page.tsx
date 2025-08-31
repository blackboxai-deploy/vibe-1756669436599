import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderConfirmedPage() {
  // In a real app, this would come from the router query or API
  const orderId = '#DP' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pedido Confirmado com Sucesso!
          </h1>
          <p className="text-gray-600 text-lg">
            Obrigado pela sua compra. Seu pedido foi confirmado e será processado em breve.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Número do Pedido:</span>
                <span className="text-blue-600 font-bold">{orderId}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Confirmado
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Data do Pedido:</span>
                <span>{new Date().toLocaleDateString('pt-BR')}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Previsão de Entrega:</span>
                <span>
                  {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Confirmação por E-mail</h4>
                  <p className="text-sm text-gray-600">
                    Enviamos um e-mail com os detalhes do seu pedido
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Processamento</h4>
                  <p className="text-sm text-gray-600">
                    Seus produtos serão preparados para envio
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Envio</h4>
                  <p className="text-sm text-gray-600">
                    Você receberá o código de rastreamento
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Informações de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">📱</span>
                <div>
                  <h3 className="font-bold text-blue-800">PIX - Pagamento Instantâneo</h3>
                  <p className="text-sm text-blue-700">
                    QR Code enviado por e-mail e WhatsApp
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-800">Chave PIX:</span>
                  <p className="text-blue-700 font-mono">dropship@exemplo.com</p>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Valor:</span>
                  <p className="text-blue-700 font-bold">R$ 299,90</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Continuar Comprando
            </Button>
          </Link>
          <Button variant="outline">
            Rastrear Pedido
          </Button>
          <Button variant="outline">
            Imprimir Pedido
          </Button>
        </div>

        {/* Support */}
        <div className="mt-12 bg-gray-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Precisa de Ajuda?
          </h3>
          <p className="text-gray-600 mb-4">
            Nossa equipe está pronta para ajudar você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center space-x-2">
              <span>📞</span>
              <span className="font-medium">(11) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span className="font-medium">suporte@dropshipbrasil.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>💬</span>
              <span className="font-medium">Chat Online</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">✓</span>
            </div>
            <h4 className="font-medium">Entrega Garantida</h4>
            <p className="text-sm text-gray-600">
              Se não chegar, devolvemos seu dinheiro
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">🔒</span>
            </div>
            <h4 className="font-medium">Pagamento Seguro</h4>
            <p className="text-sm text-gray-600">
              Seus dados protegidos por criptografia
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">⚡</span>
            </div>
            <h4 className="font-medium">Suporte 24/7</h4>
            <p className="text-sm text-gray-600">
              Atendimento sempre disponível
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}