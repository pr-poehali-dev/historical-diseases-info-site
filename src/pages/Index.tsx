import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Disease {
  id: string;
  name: string;
  year: number;
  century: string;
  deaths: number;
  regions: string[];
  symptoms: string[];
  description: string;
  color: string;
}

const diseases: Disease[] = [
  {
    id: '1',
    name: 'Чума Юстиниана',
    year: 541,
    century: '6 век',
    deaths: 25000000,
    regions: ['Византия', 'Средиземноморье', 'Европа'],
    symptoms: ['Лихорадка', 'Бубоны', 'Сепсис'],
    description: 'Первая задокументированная пандемия чумы, названная в честь византийского императора Юстиниана I. Унесла жизни примерно 25-50 миллионов человек.',
    color: '#8B5CF6'
  },
  {
    id: '2',
    name: 'Чёрная смерть',
    year: 1347,
    century: '14 век',
    deaths: 75000000,
    regions: ['Европа', 'Азия', 'Северная Африка'],
    symptoms: ['Бубоны', 'Кровотечения', 'Гангрена', 'Лихорадка'],
    description: 'Самая смертоносная пандемия в истории человечества. Уничтожила от 30% до 60% населения Европы за период 1347-1353 годов.',
    color: '#D946EF'
  },
  {
    id: '3',
    name: 'Оспа',
    year: 1520,
    century: '16 век',
    deaths: 56000000,
    regions: ['Америка', 'Европа', 'Азия', 'Африка'],
    symptoms: ['Сыпь', 'Высокая температура', 'Рубцы'],
    description: 'Вирусное заболевание, которое опустошило коренное население Америки после прибытия европейцев. Ликвидирована в 1980 году благодаря вакцинации.',
    color: '#F97316'
  },
  {
    id: '4',
    name: 'Испанский грипп',
    year: 1918,
    century: '20 век',
    deaths: 50000000,
    regions: ['Весь мир'],
    symptoms: ['Кашель', 'Высокая температура', 'Цианоз', 'Пневмония'],
    description: 'Пандемия гриппа H1N1, заразившая около 500 миллионов человек по всему миру. Особенно смертоносна для молодых взрослых.',
    color: '#0EA5E9'
  },
  {
    id: '5',
    name: 'ВИЧ/СПИД',
    year: 1981,
    century: '20-21 век',
    deaths: 36000000,
    regions: ['Весь мир, особенно Африка'],
    symptoms: ['Иммунодефицит', 'Оппортунистические инфекции'],
    description: 'Глобальная эпидемия, вызванная вирусом иммунодефицита человека. К 2021 году унесла более 36 миллионов жизней.',
    color: '#8B5CF6'
  },
  {
    id: '6',
    name: 'COVID-19',
    year: 2019,
    century: '21 век',
    deaths: 7000000,
    regions: ['Весь мир'],
    symptoms: ['Кашель', 'Температура', 'Потеря обоняния', 'Одышка'],
    description: 'Пандемия коронавируса SARS-CoV-2, начавшаяся в конце 2019 года. Официально зарегистрировано более 7 миллионов смертей.',
    color: '#D946EF'
  }
];

const timelineData = diseases.map(d => ({
  year: d.year,
  deaths: d.deaths / 1000000,
  name: d.name
})).sort((a, b) => a.year - b.year);

const Index = () => {
  const [selectedCentury, setSelectedCentury] = useState<string>('all');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

  const filteredDiseases = selectedCentury === 'all' 
    ? diseases 
    : diseases.filter(d => d.century === selectedCentury);

  const centuries = ['all', ...Array.from(new Set(diseases.map(d => d.century)))];

  const totalDeaths = diseases.reduce((sum, d) => sum + d.deaths, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Исторические пандемии
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Хронология крупнейших эпидемий и пандемий в истории человечества
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-scale-in">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Всего эпидемий</CardTitle>
              <Icon name="Activity" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{diseases.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                За последние 1500 лет
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Общие потери</CardTitle>
              <Icon name="Users" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {(totalDeaths / 1000000).toFixed(0)}M
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Приблизительное число жертв
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Охват территорий</CardTitle>
              <Icon name="Globe" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Array.from(new Set(diseases.flatMap(d => d.regions))).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Уникальных регионов
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="diseases" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="diseases">Болезни</TabsTrigger>
            <TabsTrigger value="timeline">Хронология</TabsTrigger>
          </TabsList>

          <TabsContent value="diseases" className="space-y-6">
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {centuries.map(century => (
                <Badge
                  key={century}
                  variant={selectedCentury === century ? 'default' : 'outline'}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedCentury(century)}
                >
                  {century === 'all' ? 'Все периоды' : century}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDiseases.map((disease, index) => (
                <Card 
                  key={disease.id} 
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedDisease(disease)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div 
                        className="w-3 h-3 rounded-full mt-1" 
                        style={{ backgroundColor: disease.color }}
                      />
                      <Badge variant="secondary">{disease.year}</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {disease.name}
                    </CardTitle>
                    <CardDescription>{disease.century}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Skull" className="h-4 w-4 text-destructive" />
                      <span className="font-semibold">
                        ~{(disease.deaths / 1000000).toFixed(1)}M жертв
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <Icon name="MapPin" className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground">
                          {disease.regions.join(', ')}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {disease.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Хронология пандемий по числу жертв</CardTitle>
                <CardDescription>
                  График показывает количество погибших в миллионах человек
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis 
                        dataKey="year" 
                        label={{ value: 'Год', position: 'insideBottom', offset: -5 }}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        label={{ value: 'Жертвы (млн)', angle: -90, position: 'insideLeft' }}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-card border rounded-lg p-3 shadow-lg">
                                <p className="font-semibold">{payload[0].payload.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Год: {payload[0].payload.year}
                                </p>
                                <p className="text-sm font-semibold text-destructive">
                                  Жертвы: ~{payload[0].value}M
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="deaths" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {diseases.sort((a, b) => b.deaths - a.deaths).map((disease, index) => (
                <Card key={disease.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{disease.name}</CardTitle>
                      <Badge>{disease.year}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Жертвы</span>
                        <span className="font-semibold text-destructive">
                          ~{(disease.deaths / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${(disease.deaths / Math.max(...diseases.map(d => d.deaths))) * 100}%`,
                            backgroundColor: disease.color
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {disease.symptoms.map((symptom, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {selectedDisease && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in"
            onClick={() => setSelectedDisease(null)}
          >
            <Card 
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{selectedDisease.name}</CardTitle>
                    <CardDescription>{selectedDisease.century} • {selectedDisease.year} год</CardDescription>
                  </div>
                  <button 
                    onClick={() => setSelectedDisease(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="X" className="h-6 w-6" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="FileText" className="h-4 w-4" />
                    Описание
                  </h3>
                  <p className="text-muted-foreground">{selectedDisease.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Skull" className="h-4 w-4 text-destructive" />
                    Статистика
                  </h3>
                  <p className="text-2xl font-bold text-destructive">
                    ~{(selectedDisease.deaths / 1000000).toFixed(1)} миллионов жертв
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="MapPin" className="h-4 w-4" />
                    Регионы распространения
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDisease.regions.map((region, i) => (
                      <Badge key={i} variant="secondary">{region}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Activity" className="h-4 w-4" />
                    Основные симптомы
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDisease.symptoms.map((symptom, i) => (
                      <Badge key={i} variant="outline">{symptom}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
