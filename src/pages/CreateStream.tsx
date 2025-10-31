import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const CreateStream = () => {
  const navigate = useNavigate();
  const [streamData, setStreamData] = useState({
    name: '',
    title: '',
    description: '',
    game: '',
    avatar: '🎮',
    streamKey: '',
    platform: 'internal'
  });

  const avatarEmojis = ['🎮', '🎨', '👑', '🎯', '⚡', '🔥', '💎', '🚀', '🎭', '🎪', '🎬', '🎸'];
  const streamKeyGenerated = 'sk_' + Math.random().toString(36).substring(2, 15);

  const handleCreateProfile = () => {
    if (!streamData.name || !streamData.title) {
      alert('Заполни имя и название стрима!');
      return;
    }
    
    localStorage.setItem('myStreamProfile', JSON.stringify({
      ...streamData,
      streamKey: streamData.platform === 'internal' ? streamKeyGenerated : streamData.streamKey,
      createdAt: new Date().toISOString()
    }));
    
    navigate('/my-stream');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDEzOSwgOTIsIDI0NiwgMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Button 
          variant="ghost" 
          className="mb-6 text-purple-300 hover:text-white hover:bg-slate-800/50"
          onClick={() => navigate('/')}
        >
          <Icon name="ArrowLeft" className="mr-2" size={20} />
          Назад на главную
        </Button>

        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-float">
              <Icon name="Video" className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Создай свой стрим
          </h1>
          <p className="text-xl text-purple-200">
            Запусти трансляцию и начни получать донаты
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-slate-900/50 backdrop-blur-sm border border-purple-500/20">
              <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                <Icon name="User" className="mr-2" size={18} />
                Профиль
              </TabsTrigger>
              <TabsTrigger value="stream" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                <Icon name="Radio" className="mr-2" size={18} />
                Настройка стрима
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20 animate-slide-up">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="User" className="text-purple-400" size={28} />
                    Создание профиля
                  </CardTitle>
                  <CardDescription className="text-purple-300">
                    Заполни информацию о себе
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-purple-300">Имя стримера *</Label>
                    <Input
                      id="name"
                      placeholder="Например: GameMasterPro"
                      value={streamData.name}
                      onChange={(e) => setStreamData({...streamData, name: e.target.value})}
                      className="bg-slate-800/50 border-purple-500/20 text-white placeholder:text-purple-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-300">Выбери аватар</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {avatarEmojis.map((emoji) => (
                        <Button
                          key={emoji}
                          variant="outline"
                          className={`text-3xl h-16 ${
                            streamData.avatar === emoji
                              ? 'bg-gradient-to-br from-purple-600 to-pink-600 border-0'
                              : 'bg-slate-800/50 border-purple-500/20 hover:border-purple-500/50'
                          }`}
                          onClick={() => setStreamData({...streamData, avatar: emoji})}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-purple-300">Название стрима *</Label>
                    <Input
                      id="title"
                      placeholder="Например: Рубим в CS:GO на рейтинг!"
                      value={streamData.title}
                      onChange={(e) => setStreamData({...streamData, title: e.target.value})}
                      className="bg-slate-800/50 border-purple-500/20 text-white placeholder:text-purple-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="game" className="text-purple-300">Игра / Категория</Label>
                    <Input
                      id="game"
                      placeholder="CS:GO, Dota 2, Just Chatting..."
                      value={streamData.game}
                      onChange={(e) => setStreamData({...streamData, game: e.target.value})}
                      className="bg-slate-800/50 border-purple-500/20 text-white placeholder:text-purple-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-purple-300">Описание</Label>
                    <Textarea
                      id="description"
                      placeholder="Расскажи о себе и своём контенте..."
                      value={streamData.description}
                      onChange={(e) => setStreamData({...streamData, description: e.target.value})}
                      className="bg-slate-800/50 border-purple-500/20 text-white placeholder:text-purple-400 min-h-[100px]"
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-slate-800/50 border border-purple-500/20">
                    <div className="flex items-start gap-3">
                      <Icon name="Info" className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                      <div className="text-sm text-purple-300">
                        <p className="font-medium text-white mb-1">После создания профиля:</p>
                        <ul className="space-y-1 ml-4 list-disc">
                          <li>Ты появишься в списке создателей</li>
                          <li>Зрители смогут отправлять тебе донаты</li>
                          <li>Получишь ключ для трансляции</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stream">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20 animate-slide-up">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Icon name="Radio" className="text-pink-400" size={28} />
                      Способ трансляции
                    </CardTitle>
                    <CardDescription className="text-purple-300">
                      Выбери, как хочешь стримить
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className={`w-full h-auto p-4 justify-start ${
                        streamData.platform === 'internal'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0'
                          : 'bg-slate-800/50 text-white border-purple-500/20'
                      }`}
                      onClick={() => setStreamData({...streamData, platform: 'internal'})}
                    >
                      <div className="text-left">
                        <div className="font-bold text-lg flex items-center gap-2 mb-1">
                          <Icon name="Tv" size={24} />
                          Встроенный стрим
                          <Badge className="bg-green-600 text-white border-0 ml-auto">Рекомендуется</Badge>
                        </div>
                        <p className="text-sm opacity-80">
                          Стрим через браузер или OBS с нашим ключом
                        </p>
                      </div>
                    </Button>

                    <Button
                      variant="outline"
                      className={`w-full h-auto p-4 justify-start ${
                        streamData.platform === 'external'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0'
                          : 'bg-slate-800/50 text-white border-purple-500/20'
                      }`}
                      onClick={() => setStreamData({...streamData, platform: 'external'})}
                    >
                      <div className="text-left">
                        <div className="font-bold text-lg flex items-center gap-2 mb-1">
                          <Icon name="Link" size={24} />
                          Внешняя трансляция
                        </div>
                        <p className="text-sm opacity-80">
                          Подключи Twitch, YouTube или другую платформу
                        </p>
                      </div>
                    </Button>

                    {streamData.platform === 'external' && (
                      <div className="space-y-2 animate-fade-in">
                        <Label htmlFor="streamKey" className="text-purple-300">Ссылка на трансляцию</Label>
                        <Input
                          id="streamKey"
                          placeholder="https://twitch.tv/your_channel или YouTube ID"
                          value={streamData.streamKey}
                          onChange={(e) => setStreamData({...streamData, streamKey: e.target.value})}
                          className="bg-slate-800/50 border-purple-500/20 text-white placeholder:text-purple-400"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/20 animate-slide-up" style={{animationDelay: '0.1s'}}>
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Icon name="Key" className="text-cyan-400" size={24} />
                        Инструкция для OBS
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { step: '1', text: 'Скачай и установи OBS Studio', icon: 'Download' },
                        { step: '2', text: 'После создания профиля получишь Stream Key', icon: 'Key' },
                        { step: '3', text: 'В OBS: Настройки → Трансляция', icon: 'Settings' },
                        { step: '4', text: 'Вставь ключ и запусти стрим', icon: 'Play' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm">{item.text}</p>
                          </div>
                          <Icon name={item.icon} className="text-purple-400 flex-shrink-0" size={18} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border-purple-500/20">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name="Sparkles" className="text-yellow-400" size={32} />
                        <h3 className="text-xl font-bold text-white">Что получишь</h3>
                      </div>
                      <div className="space-y-2 text-purple-200 text-sm">
                        {['Личная страница стрима с донатами', 'Виджет донат-алертов для OBS', 'Чат со зрителями', 'Статистика и аналитика'].map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Icon name="Check" className="text-green-400" size={16} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mt-6 bg-slate-900/80 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <Button
                className="w-full h-14 text-lg font-bold gradient-purple-pink text-white border-0 hover:scale-105 transition-transform"
                onClick={handleCreateProfile}
              >
                <Icon name="Rocket" className="mr-2" size={24} />
                Создать профиль и начать стрим
              </Button>
              <p className="text-center text-purple-400 text-sm mt-4">
                Создание профиля бесплатно • Комиссия с донатов 0%
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateStream;
