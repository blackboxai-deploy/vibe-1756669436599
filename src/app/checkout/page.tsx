'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
  });

  const [shippingData, setShippingData] = useState({
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [installments, setInstallments] = useState(1);

  if (items.length === 0) {
    router.push('/carrinho');
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 150 ? 0 : 15.90;
  const discount = paymentMethod === 'pix' ? subtotal * 0.05 : 0;
  const total = subtotal + shipping - discount;

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/( \d{4})\d+?$/, '$1');
  };

  const validateStep1 = () => {
    const { name, email, phone, cpf } = customerData;
    return name && email && phone && cpf.replace(/\D/g, '').length === 11;
  };

  const validateStep2 = () => {
    const { address, number, neighborhood, city, state, zipCode } = shippingData;
    return address && number && neighborhood && city && state && zipCode.replace(/\D/g, '').length === 8;
  };

  const validateStep3 = () => {
    if (paymentMethod === 'pix' || paymentMethod === 'boleto') return true;
    if (paymentMethod === 'credit') {
      const { number, name, expiry, cvv } = cardData;
      return number.replace(/\D/g, '').length === 16 && name && expiry.length === 5 && cvv.length >= 3;
    }
    return false;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) {
      toast.error('Preencha todos os dados pessoais corretamente');
      return;
    }
    if (step === 2 && !validateStep2()) {
      toast.error('Preencha todos os dados de entrega corretamente');
      return;
    }
    setStep(step + 1);
  };

  const handleFinishOrder = () => {
    if (!validateStep3()) {
      toast.error('Verifique os dados de pagamento');
      return;
    }

    // Simulate order processing
    toast.success('Pedido realizado com sucesso!', {
      description: 'Você será redirecionado para a confirmação',
    });

    setTimeout(() => {
      clearCart();
      router.push('/pedido-confirmado');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= stepNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step > stepNum ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 max-w-md mx-auto">
            <span className={step >= 1 ? 'text-blue-600 font-medium' : ''}>
              Dados Pessoais
            </span>
            <span className={step >= 2 ? 'text-blue-600 font-medium' : ''}>
              Entrega
            </span>
            <span className={step >= 3 ? 'text-blue-600 font-medium' : ''}>
              Pagamento
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={customerData.name}
                        onChange={(e) =>
                          setCustomerData({ ...customerData, name: e.target.value })
                        }
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerData.email}
                        onChange={(e) =>
                          setCustomerData({ ...customerData, email: e.target.value })
                        }
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={customerData.phone}
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            phone: formatPhone(e.target.value),
                          })
                        }
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        value={customerData.cpf}
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            cpf: formatCPF(e.target.value),
                          })
                        }
                        placeholder="000.000.000-00"
                        maxLength={14}
                      />
                    </div>
                  </div>

                  <Button onClick={handleNextStep} className="w-full">
                    Continuar para Entrega
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Endereço de Entrega</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        value={shippingData.address}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, address: e.target.value })
                        }
                        placeholder="Rua, Avenida, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={shippingData.number}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, number: e.target.value })
                        }
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={shippingData.complement}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, complement: e.target.value })
                        }
                        placeholder="Apto, Bloco, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={shippingData.neighborhood}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, neighborhood: e.target.value })
                        }
                        placeholder="Nome do bairro"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={shippingData.city}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, city: e.target.value })
                        }
                        placeholder="Nome da cidade"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Input
                        id="state"
                        value={shippingData.state}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, state: e.target.value })
                        }
                        placeholder="SP"
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">CEP *</Label>
                      <Input
                        id="zipCode"
                        value={shippingData.zipCode}
                        onChange={(e) =>
                          setShippingData({
                            ...shippingData,
                            zipCode: formatCEP(e.target.value),
                          })
                        }
                        placeholder="00000-000"
                        maxLength={9}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Voltar
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1">
                      Continuar para Pagamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Forma de Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="pix" className="text-sm">PIX (5% OFF)</TabsTrigger>
                      <TabsTrigger value="credit" className="text-sm">Cartão</TabsTrigger>
                      <TabsTrigger value="boleto" className="text-sm">Boleto</TabsTrigger>
                    </TabsList>

                    <TabsContent value="pix" className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-2xl">📱</span>
                          <div>
                            <h3 className="font-bold text-green-800">PIX - Desconto de 5%</h3>
                            <p className="text-sm text-green-700">
                              Pagamento instantâneo e seguro
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-green-700">
                          Após a confirmação do pedido, você receberá o QR Code para pagamento.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="credit" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="cardNumber">Número do Cartão *</Label>
                          <Input
                            id="cardNumber"
                            value={cardData.number}
                            onChange={(e) =>
                              setCardData({
                                ...cardData,
                                number: formatCardNumber(e.target.value),
                              })
                            }
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="cardName">Nome no Cartão *</Label>
                          <Input
                            id="cardName"
                            value={cardData.name}
                            onChange={(e) =>
                              setCardData({ ...cardData, name: e.target.value.toUpperCase() })
                            }
                            placeholder="NOME COMO NO CARTÃO"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardExpiry">Validade *</Label>
                          <Input
                            id="cardExpiry"
                            value={cardData.expiry}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, '');
                              if (value.length >= 2) {
                                value = value.substring(0, 2) + '/' + value.substring(2, 4);
                              }
                              setCardData({ ...cardData, expiry: value });
                            }}
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV *</Label>
                          <Input
                            id="cardCvv"
                            value={cardData.cvv}
                            onChange={(e) =>
                              setCardData({
                                ...cardData,
                                cvv: e.target.value.replace(/\D/g, ''),
                              })
                            }
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Parcelas</Label>
                        <RadioGroup
                          value={installments.toString()}
                          onValueChange={(value) => setInstallments(parseInt(value))}
                          className="mt-2"
                        >
                          {[1, 2, 3, 6, 12].map((num) => (
                            <div key={num} className="flex items-center space-x-2">
                              <RadioGroupItem value={num.toString()} id={`installment-${num}`} />
                              <Label htmlFor={`installment-${num}`} className="cursor-pointer">
                                {num}x de {formatPrice(total / num)}
                                {num === 1 ? ' à vista' : ' sem juros'}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </TabsContent>

                    <TabsContent value="boleto" className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-2xl">🧾</span>
                          <div>
                            <h3 className="font-bold text-blue-800">Boleto Bancário</h3>
                            <p className="text-sm text-blue-700">
                              Vencimento em 3 dias úteis
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-blue-700">
                          O boleto será gerado após a confirmação do pedido e pode ser pago em qualquer banco.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Voltar
                    </Button>
                    <Button onClick={handleFinishOrder} className="flex-1 bg-green-600 hover:bg-green-700">
                      Finalizar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qtd: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-bold">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Frete:</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Desconto PIX (5%):</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Security */}
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-1">
                    <span>🔒</span>
                    <span>Compra 100% Segura</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Seus dados protegidos por SSL
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}