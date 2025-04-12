import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Trophy, 
  CheckCircle, 
  XCircle, 
  Info 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type GapAnalysisProps = {
  topic: string;
  knowledge: any;
  aiOutput: any;
};

export const GapAnalysis = ({ topic, knowledge, aiOutput }: GapAnalysisProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Extract topics from aiOutput (fallback to empty array if undefined)
  const knownConcepts = aiOutput?.covered_topics || [];
  const gapsToExplore = aiOutput?.gap_topics || [];

  const data = [
    { name: 'Known', value: knownConcepts.length },
    { name: 'Gaps', value: gapsToExplore.length },
  ];

  const COLORS = ['#4C6EF5', '#E0E0E0'];

  const percentageKnown = Math.round(
    (knownConcepts.length / (knownConcepts.length + gapsToExplore.length)) * 100
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200 dark:bg-slate-800 dark:border-gray-600">
          <p className="font-medium text-gray-800 dark:text-white">{`${payload[0].name} : ${payload[0].value}`}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {payload[0].name === 'Known'
              ? 'Concepts you already understand'
              : 'Topics to explore next'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chart Section */}
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-500" />
                    Knowledge Coverage
                  </CardTitle>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>This chart shows your current knowledge coverage in AI/ML concepts.</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <CardDescription>
                  Your progress in AI/ML concept mastery
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={2}
                        dataKey="value"
                        strokeWidth={4}
                        stroke="#fff"
                      >
                        {data.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                            className="hover:opacity-90 transition-opacity"
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center -mt-12 mb-4">
                  <div className="flex justify-center gap-8 mt-4 w-full">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-indigo-500"></span>
                      <span className="text-sm font-medium dark:text-white">{knownConcepts.length} Known</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-gray-200"></span>
                      <span className="text-sm font-medium dark:text-white">{gapsToExplore.length} Gaps</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Learning Progress
                </CardTitle>
                <CardDescription>
                  Your learning journey stats
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-indigo-600 font-medium">{percentageKnown}%</span>
                  </div>
                  <Progress value={percentageKnown} className="h-2 bg-gray-100" />
                </div>

                <div className="pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <div className="text-xl font-bold text-indigo-600">{knownConcepts.length}</div>
                      <div className="text-xs text-indigo-800">Concepts Mastered</div>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="text-xl font-bold text-amber-600">{gapsToExplore.length}</div>
                      <div className="text-xs text-amber-800">Ready to Learn</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Known Concepts & Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Known Concepts
                  </CardTitle>
                  <Badge className="bg-green-500">{knownConcepts.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {knownConcepts.map((item, index) => (
                    <li 
                      key={index} 
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                      <span className="text-slate-700 dark:text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    Gaps to Explore
                  </CardTitle>
                  <Badge className="bg-red-500">{gapsToExplore.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 max-h-[350px] overflow-y-auto pr-2">
                  {gapsToExplore.map((item, index) => (
                    <li 
                      key={index} 
                      className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        <span className="text-slate-700 dark:text-white">{item}</span>
                      </div>
                  
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GapAnalysis;
