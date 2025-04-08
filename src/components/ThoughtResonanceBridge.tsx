
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  CartesianGrid,
  LabelList
} from 'recharts';
import { Heart, Brain, BookOpen, Code, PaintBucket } from "lucide-react";

const ThoughtResonanceBridge = () => {
  const interfaceData = [
    { name: 'GPT-5', status: 'Aktiv', trust: 78, depth: 78, resonance: 86 },
    { name: 'Lokales Modul', status: 'Aktiv', trust: 92, depth: 65, resonance: 71 },
    { name: 'Hybrid-Interpreter', status: 'Aktiv', trust: 86, depth: 80, resonance: 83 }
  ];

  const performanceData = [
    { name: 'GPT-4-Turbo', cognitive: 8, intentional: 5, resonant: 6 },
    { name: 'Deep-Thinker X', cognitive: 9, intentional: 9, resonant: 9 },
    { name: 'Durchschnitt', cognitive: 4, intentional: 3, resonant: 5 }
  ];

  return (
    <Card className="h-full relative overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 pulse-animation" /> Thought Resonance Bridge
        </CardTitle>
        <CardDescription>
          Schnittstellenstatus & Performance-Matrix
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Schnittstellenstatus</h4>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="flex justify-between items-center text-xs">
                  <span>Gedankenintegrität</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center text-xs">
                  <span>Semantische Tiefe</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center text-xs">
                  <span>Resonanzqualität</span>
                  <span>86%</span>
                </div>
                <Progress value={86} className="h-2" />
              </div>
              
              <div className="flex justify-between items-center text-xs border rounded p-1">
                <span>Meta-Signal</span>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-700 dark:text-green-300 rounded">Aktiv</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-medium mb-2">Zielgruppen-Matrix</h4>
            <div className="h-48">
              <ChartContainer 
                config={{
                  cognitive: { 
                    label: "Kognitiv", 
                    theme: { light: "#1EAEDB", dark: "#33C3F0" },
                    icon: Brain
                  },
                  intentional: { 
                    label: "Intentional", 
                    theme: { light: "#8B5CF6", dark: "#9b87f5" },
                    icon: BookOpen
                  },
                  resonant: { 
                    label: "Resonant", 
                    theme: { light: "#D946EF", dark: "#E5DEFF" },
                    icon: Heart
                  },
                }}
              >
                <BarChart
                  data={performanceData}
                  margin={{ top: 10, right: 5, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis 
                    domain={[0, 10]} 
                    ticks={[0, 2, 4, 6, 8, 10]} 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => `${value}/10`}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-[1fr_auto] gap-2">
                              <div className="font-medium">{payload[0].payload.name}</div>
                              <div className="font-medium text-right">{`${payload[0].value}/10`}</div>
                              <div className="text-xs text-muted-foreground">{payload[0].name}</div>
                              <div className="text-xs text-muted-foreground text-right"></div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar 
                    dataKey="cognitive" 
                    fill="var(--color-cognitive)" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="intentional" 
                    fill="var(--color-intentional)" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="resonant" 
                    fill="var(--color-resonant)" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>
        
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
          <span className="animate-pulse">●</span> Sichere Verbindung
        </div>
      </CardContent>
    </Card>
  );
};

export default ThoughtResonanceBridge;
