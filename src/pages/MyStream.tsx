import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const MyStream = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [isLive, setIsLive] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { user: 'Система', text: 'Добро пожаловать в чат!', time: '10:00', isSystem: true }
  ]);
  const [donates, setDonates] = useState([
    { user: 'TestUser', amount: 100, message: 'Тестовый донат', time: '10:05' }
  ]);

  useEffect(() => {
    const savedProfile = localStorage.getItem('myStreamProfile');
    if (!savedProfile) {
      navigate('/create-stream');
      return;
    }
    setProfile(JSON.parse(savedProfile));
  }, [navigate]);

  const handleStartStream = () => {
    setIsLive(true);
    setMessages([...messages, { 
      user: 'Система', 
      text: '🔴 Трансляция началась!', 
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }), 
      isSystem: true 
    }]);
  };

  const handleStopStream = () => {
    setIsLive(false);
    setMessages([...messages, { 
      user: 'Система', 
      text: 'Трансляция завершена', 
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }), 
      isSystem: true 
    }]);
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    setMessages([...messages, { 
      user: profile?.name || 'Стример', 
      text: chatMessage, 
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }), 
      isSystem: false 
    }]);
    setChatMessage('');
  };

  const copyStreamKey = () => {
    navigator.clipboard.writeText(profile?.streamKey || '');
    alert('Ключ скопирован в буфер обмена!');
  };

  const copyStreamUrl = () => {
    const url = `${window.location.origin}/stream/${profile?.name.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(url);
    alert('Ссылка скопирована в буфер обмена!');
  };

  if (!profile) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
      <div className="text-white text-xl">Загрузка...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDEzOSwgOTIsIDI0NiwgMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            className="text-purple-300 hover:text-white hover:bg-slate-800/50"
            onClick={() => navigate('/')}
          >
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            На главную
          </Button>
          
          <div className="flex gap-2">
            {!isLive ? (
              <Button 
                className="gradient-purple-pink text-white border-0 h-12 px-6 hover:scale-105 transition-transform animate-pulse"
                onClick={handleStartStream}
              >
                <Icon name="Play" className="mr-2" size={20} />
                Запустить трансляцию
              </Button>
            ) : (
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white border-0 h-12 px-6"
                onClick={handleStopStream}
              >
                <Icon name="Square" className="mr-2" size={20} />
                Остановить
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-4xl animate-float">
                  {profile.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                    {isLive && (
                      <Badge className="bg-red-600 text-white border-0 animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                        LIVE
                      </Badge>
                    )}
                  </div>
                  <p className="text-purple-300">{profile.game || 'Без категории'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-purple-400">0</div>
                  <div className="text-sm text-purple-300">Зрителей</div>
                </div>
                <Icon name="Users" className="text-purple-400" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-pink-400">{donates.reduce((sum, d) => sum + d.amount, 0)} ₽</div>
                  <div className="text-sm text-pink-300">Собрано донатов</div>
                </div>
                <Icon name="DollarSign" className="text-pink-400" size={32} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Tv" className="text-cyan-400" size={24} />
                  Превью стрима
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg bg-slate-800 flex items-center justify-center border-2 border-purple-500/20">
                  {isLive ? (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Icon name="Radio" className="text-white" size={32} />
                      </div>
                      <p className="text-white text-xl font-bold mb-2">Трансляция активна</p>
                      <p className="text-purple-300">{profile.title}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Icon name="VideoOff" className="text-purple-400 mx-auto mb-4" size={48} />
                      <p className="text-purple-300">Трансляция не запущена</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Heart" className="text-pink-400" size={24} />
                  Последние донаты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {donates.map((donate, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                        {donate.user[0]}
                      </div>
                      <div>
                        <div className="font-bold text-white">{donate.user}</div>
                        <div className="text-sm text-purple-300">{donate.message}</div>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                      +{donate.amount} ₽
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Key" className="text-yellow-400" size={24} />
                  Stream Key
                </CardTitle>
                <CardDescription className="text-purple-300">
                  Для OBS или другого ПО
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-800/50 font-mono text-sm text-purple-300 break-all">
                  {profile.streamKey}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full bg-slate-800/50 text-white border-purple-500/20"
                  onClick={copyStreamKey}
                >
                  <Icon name="Copy" className="mr-2" size={16} />
                  Скопировать ключ
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-slate-800/50 text-white border-purple-500/20"
                  onClick={copyStreamUrl}
                >
                  <Icon name="Link" className="mr-2" size={16} />
                  Скопировать ссылку на стрим
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="MessageSquare" className="text-cyan-400" size={24} />
                  Чат
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-64 overflow-y-auto space-y-2 p-3 rounded-lg bg-slate-800/30 border border-purple-500/10">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`text-sm ${msg.isSystem ? 'text-center text-purple-400 italic' : ''}`}>
                      {!msg.isSystem && (
                        <span>
                          <span className="font-bold text-purple-300">{msg.user}</span>
                          <span className="text-purple-500 text-xs ml-2">{msg.time}</span>
                          <br />
                        </span>
                      )}
                      <span className={msg.isSystem ? '' : 'text-white'}>{msg.text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Сообщение в чат..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    className="bg-slate-800/50 border-purple-500/20 text-white placeholder:text-purple-400"
                  />
                  <Button 
                    className="gradient-purple-pink text-white border-0"
                    onClick={sendMessage}
                  >
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStream;
