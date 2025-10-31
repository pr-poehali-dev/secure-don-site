import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);
  const [donateAmount, setDonateAmount] = useState('');
  const [donateMessage, setDonateMessage] = useState('');

  const creators = [
    {
      id: '1',
      name: 'GameMasterPro',
      type: 'Стример',
      game: 'CS:GO, Dota 2',
      avatar: '🎮',
      followers: '45.2K',
      totalDonates: '2.1M ₽',
      isLive: true,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: '2',
      name: 'IndieDevStudio',
      type: 'Разработчик',
      game: 'RPG Проект',
      avatar: '🎨',
      followers: '12.5K',
      totalDonates: '850K ₽',
      isLive: false,
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      id: '3',
      name: 'StreamQueen',
      type: 'Стример',
      game: 'Valorant',
      avatar: '👑',
      followers: '89.3K',
      totalDonates: '4.5M ₽',
      isLive: true,
      gradient: 'from-pink-600 to-orange-600'
    }
  ];

  const quickAmounts = [100, 300, 500, 1000];

  const recentDonates = [
    { user: 'xXProGamerXx', amount: 500, message: 'За крутой стрим! 🔥', time: '1 мин', creator: 'GameMasterPro' },
    { user: 'MegaFan228', amount: 1000, message: 'Продолжай в том же духе!', time: '3 мин', creator: 'StreamQueen' },
    { user: 'DevSupporter', amount: 2000, message: 'Жду релиз игры! 🎮', time: '5 мин', creator: 'IndieDevStudio' },
  ];

  const handleDonate = () => {
    if (!selectedCreator || !donateAmount) return;
    const creator = creators.find(c => c.id === selectedCreator);
    alert(`Донат ${donateAmount} ₽ для ${creator?.name}!\nСообщение: ${donateMessage || 'Без сообщения'}\n(Демо-режим)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDEzOSwgOTIsIDI0NiwgMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-float">
              <Icon name="Gamepad2" className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            StreamDonate
          </h1>
          <p className="text-xl text-purple-200">
            Поддержи любимых стримеров и разработчиков игр
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <Badge className="gradient-purple-pink text-white border-0 text-sm px-4 py-1">
              <Icon name="Shield" className="mr-1" size={14} />
              Безопасно
            </Badge>
            <Badge className="gradient-blue-purple text-white border-0 text-sm px-4 py-1">
              <Icon name="Zap" className="mr-1" size={14} />
              Мгновенно
            </Badge>
            <Badge className="gradient-orange-pink text-white border-0 text-sm px-4 py-1">
              <Icon name="Trophy" className="mr-1" size={14} />
              Без комиссии
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="creators" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-900/50 backdrop-blur-sm border border-purple-500/20">
            <TabsTrigger value="creators" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="Users" className="mr-2" size={18} />
              Создатели
            </TabsTrigger>
            <TabsTrigger value="donate" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="Heart" className="mr-2" size={18} />
              Задонатить
            </TabsTrigger>
          </TabsList>

          <TabsContent value="creators" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
              {creators.map((creator, idx) => (
                <Card
                  key={creator.id}
                  className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden relative"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  onClick={() => setSelectedCreator(creator.id)}
                >
                  {creator.isLive && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-red-600 text-white border-0 animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                        LIVE
                      </Badge>
                    </div>
                  )}
                  
                  <div className={`absolute inset-0 bg-gradient-to-br ${creator.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  
                  <CardContent className="p-6 relative z-10">
                    <div className="text-center mb-4">
                      <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${creator.gradient} flex items-center justify-center text-5xl animate-float`}>
                        {creator.avatar}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{creator.name}</h3>
                      <Badge variant="outline" className="text-purple-300 border-purple-500/50 mb-2">
                        {creator.type}
                      </Badge>
                      <p className="text-purple-200 text-sm">{creator.game}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6 p-4 rounded-lg bg-slate-800/50">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{creator.followers}</div>
                        <div className="text-xs text-purple-300">Подписчиков</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-400">{creator.totalDonates}</div>
                        <div className="text-xs text-pink-300">Донатов</div>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4 gradient-purple-pink text-white border-0 hover:scale-105 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCreator(creator.id);
                        document.querySelector('[value="donate"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                      }}
                    >
                      <Icon name="Heart" className="mr-2" size={18} />
                      Поддержать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="TrendingUp" className="text-cyan-400" size={24} />
                  Последние донаты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentDonates.map((donate, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold">
                        {donate.user.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white">{donate.user}</span>
                        <Icon name="ArrowRight" className="text-purple-400" size={16} />
                        <span className="text-purple-300">{donate.creator}</span>
                        <span className="text-xs text-purple-400 ml-auto">{donate.time}</span>
                      </div>
                      <p className="text-purple-200 text-sm mb-2">{donate.message}</p>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                        +{donate.amount} ₽
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donate" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20 animate-slide-up">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Heart" className="text-pink-500" size={28} />
                    Отправить донат
                  </CardTitle>
                  <CardDescription className="text-purple-300">
                    Поддержи любимого создателя
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-purple-300 mb-2 block">
                      Выбери создателя
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {creators.map((creator) => (
                        <Button
                          key={creator.id}
                          variant="outline"
                          className={`justify-start h-auto p-4 ${
                            selectedCreator === creator.id
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0'
                              : 'bg-slate-800/50 text-white border-purple-500/20 hover:border-purple-500/50'
                          }`}
                          onClick={() => setSelectedCreator(creator.id)}
                        >
                          <div className="text-2xl mr-3">{creator.avatar}</div>
                          <div className="text-left flex-1">
                            <div className="font-bold flex items-center gap-2">
                              {creator.name}
                              {creator.isLive && (
                                <Badge className="bg-red-600 text-white border-0 text-xs px-2 py-0">
                                  LIVE
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs opacity-80">{creator.game}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-purple-300 mb-2 block">
                      Сумма доната
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {quickAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          className={`${
                            donateAmount === String(amount)
                              ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0'
                              : 'bg-slate-800/50 text-white border-purple-500/20'
                          }`}
                          onClick={() => setDonateAmount(String(amount))}
                        >
                          {amount}₽
                        </Button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder="Или введи свою сумму"
                      value={donateAmount}
                      onChange={(e) => setDonateAmount(e.target.value)}
                      className="bg-slate-800/50 border-purple-500/20 text-white placeholder:text-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-purple-300 mb-2 block">
                      Сообщение (опционально)
                    </label>
                    <Input
                      placeholder="Твоё сообщение появится на стриме!"
                      value={donateMessage}
                      onChange={(e) => setDonateMessage(e.target.value)}
                      className="bg-slate-800/50 border-purple-500/20 text-white placeholder:text-purple-400"
                    />
                  </div>

                  <Button
                    className="w-full h-14 text-lg font-bold gradient-purple-pink text-white border-0 hover:scale-105 transition-transform animate-pulse-slow"
                    onClick={handleDonate}
                    disabled={!selectedCreator || !donateAmount}
                  >
                    <Icon name="Send" className="mr-2" size={20} />
                    Отправить донат
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-sm text-purple-300 pt-4 border-t border-purple-500/20">
                    <div className="flex items-center gap-1">
                      <Icon name="Shield" size={16} />
                      <span>SSL защита</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Zap" size={16} />
                      <span>Без задержек</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Icon name="Tv" className="text-cyan-400" size={24} />
                      Как это работает?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { icon: 'User', title: 'Выбери создателя', desc: 'Стример или разработчик игры' },
                      { icon: 'CreditCard', title: 'Укажи сумму', desc: 'От 100₽ или своя сумма' },
                      { icon: 'MessageSquare', title: 'Добавь сообщение', desc: 'Оно появится на стриме!' },
                      { icon: 'Sparkles', title: 'Готово!', desc: 'Донат мгновенно придёт создателю' }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-3 rounded-lg bg-slate-800/50">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                          <Icon name={step.icon} className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-1">{step.title}</h4>
                          <p className="text-sm text-purple-300">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border-purple-500/20 animate-scale-in">
                  <CardContent className="p-6 text-center">
                    <Icon name="Gift" className="mx-auto mb-4 text-yellow-400" size={48} />
                    <h3 className="text-2xl font-bold text-white mb-2">Комиссия 0%</h3>
                    <p className="text-purple-200">
                      100% суммы уходит создателю. Мы не берём комиссию за переводы!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-sm border-purple-500/20 animate-fade-in">
            <CardContent className="p-8">
              <Icon name="Shield" className="mx-auto mb-4 text-purple-400" size={48} />
              <h3 className="text-3xl font-bold text-white mb-4">Безопасность на первом месте</h3>
              <p className="text-purple-200 text-lg leading-relaxed">
                Все платежи защищены банковским шифрованием. Мы не храним данные карт и соблюдаем стандарты PCI DSS. 
                Твой донат мгновенно и безопасно дойдёт до создателя.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
