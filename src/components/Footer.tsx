import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">DropShip Brasil</h3>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Os melhores produtos com entrega rápida e segura para todo o Brasil. 
              Qualidade garantida e preços imbatíveis.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-gray-400 hover:text-white">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="text-gray-400 hover:text-white">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-white">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/trocas-devolucoes" className="text-gray-400 hover:text-white">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/rastreamento" className="text-gray-400 hover:text-white">
                  Rastrear Pedido
                </Link>
              </li>
              <li>
                <Link href="/garantia" className="text-gray-400 hover:text-white">
                  Garantia
                </Link>
              </li>
              <li>
                <Link href="/suporte" className="text-gray-400 hover:text-white">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">WhatsApp</p>
                <p className="text-white font-medium">(11) 99999-9999</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">E-mail</p>
                <p className="text-white font-medium">contato@dropshipbrasil.com</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Horário de Atendimento</p>
                <p className="text-white font-medium">Seg-Sex: 8h às 18h</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">SSL</span>
                </div>
                <span className="text-gray-400 text-sm">Certificado SSL</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PIX</span>
                </div>
                <span className="text-gray-400 text-sm">PIX Disponível</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">30D</span>
                </div>
                <span className="text-gray-400 text-sm">30 Dias Garantia</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                Pagamentos processados com segurança
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2024 DropShip Brasil. Todos os direitos reservados.</p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <Link href="/privacidade" className="hover:text-white">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="hover:text-white">
                Termos de Uso
              </Link>
              <Link href="/cookies" className="hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}