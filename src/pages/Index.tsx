import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [amount, setAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const quickAmounts = [100, 500, 1000, 5000];
  const totalGoal = 100000;
  const currentAmount = 45678;
  const progressPercent = (currentAmount / totalGoal) * 100;

  const features = [
    {
      icon: 'Shield',
      title: 'Безопасность',
      description: 'SSL шифрование и защита данных',
      gradient: 'gradient-purple-pink'
    },
    {
      icon: 'Zap',
      title: 'Мгновенно',
      description: 'Обработка платежей за секунды',
      gradient: 'gradient-blue-purple'
    },
    {
      icon: 'Lock',
      title: 'Конфиденциально',
      description: 'Ваши данные защищены',
      gradient: 'gradient-orange-pink'
    }
  ];

  const handleDonate = () => {
    const donateAmount = selectedAmount || parseInt(amount);
    if (donateAmount > 0) {
      alert(`Спасибо за донат ${donateAmount} ₽! (Демо-режим)`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 text-lg px-6 py-2 gradient-purple-pink text-white border-0">
            🚀 Безопасная платформа
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Поддержи Проект
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Каждый донат помогает нам создавать лучший контент и развивать платформу
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/90 animate-slide-up hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Icon name="Heart" className="text-pink-500" size={32} />
                Сделать донат
              </CardTitle>
              <CardDescription className="text-base">
                Выберите сумму или введите свою
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {quickAmounts.map((value) => (
                  <Button
                    key={value}
                    variant={selectedAmount === value ? 'default' : 'outline'}
                    className={`h-16 text-lg font-semibold transition-all duration-300 ${
                      selectedAmount === value
                        ? 'gradient-purple-pink text-white border-0 scale-105'
                        : 'hover:scale-105'
                    }`}
                    onClick={() => {
                      setSelectedAmount(value);
                      setAmount('');
                    }}
                  >
                    {value} ₽
                  </Button>
                ))}
              </div>

              <div className="relative">
                <Input
                  type="number"
                  placeholder="Или введите свою сумму"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="h-14 text-lg border-2 focus:border-purple-500 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  ₽
                </span>
              </div>

              <Button
                className="w-full h-14 text-lg font-bold gradient-purple-pink text-white border-0 hover:scale-105 transition-transform duration-300 animate-pulse-slow"
                onClick={handleDonate}
              >
                <Icon name="Heart" className="mr-2" size={24} />
                Поддержать проект
              </Button>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 pt-4 border-t">
                <div className="flex items-center gap-1">
                  <Icon name="Shield" size={16} />
                  <span>Безопасно</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Lock" size={16} />
                  <span>Зашифровано</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="CheckCircle" size={16} />
                  <span>Надёжно</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Icon name="TrendingUp" className="text-blue-500" size={32} />
                Прогресс сбора
              </CardTitle>
              <CardDescription className="text-base">
                Текущая статистика донатов
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-600">Собрано</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {currentAmount.toLocaleString()} ₽
                  </span>
                </div>
                <Progress value={progressPercent} className="h-4" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Цель: {totalGoal.toLocaleString()} ₽</span>
                  <span className="font-semibold text-purple-600">{progressPercent.toFixed(1)}%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50">
                  <div className="text-3xl font-bold text-purple-600">1,234</div>
                  <div className="text-sm text-gray-600 mt-1">Донатеров</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-pink-100 to-pink-50">
                  <div className="text-3xl font-bold text-pink-600">37</div>
                  <div className="text-sm text-gray-600 mt-1">Средний</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50">
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600 mt-1">Поддержка</div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  Последние донаты
                </h4>
                {[
                  { name: 'Алексей', amount: 1000, time: '2 мин назад' },
                  { name: 'Мария', amount: 500, time: '15 мин назад' },
                  { name: 'Дмитрий', amount: 2000, time: '1 час назад' }
                ].map((donor, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-purple-pink flex items-center justify-center text-white font-bold">
                        {donor.name[0]}
                      </div>
                      <div>
                        <div className="font-medium">{donor.name}</div>
                        <div className="text-xs text-gray-500">{donor.time}</div>
                      </div>
                    </div>
                    <div className="font-bold text-purple-600">+{donor.amount} ₽</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">
            Почему мы?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-scale-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${feature.gradient} flex items-center justify-center animate-float`}>
                    <Icon name={feature.icon} className="text-white" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-16 p-8 rounded-3xl glass-effect max-w-4xl mx-auto animate-fade-in">
          <Icon name="Shield" className="mx-auto mb-4 text-purple-600" size={48} />
          <h3 className="text-3xl font-bold mb-4">Гарантия безопасности</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Все транзакции защищены SSL-сертификатом и проходят через проверенные платёжные системы. 
            Мы не храним данные ваших карт и соблюдаем все стандарты PCI DSS.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
