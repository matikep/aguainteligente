'use client'; // Needed for charts

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Leaf, TrendingUp, CheckCircle, Waves } from "lucide-react"; // Using Waves icon
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";
import Image from 'next/image';
import Link from 'next/link';
import { NewBadge } from "@/components/ui/new-badge";

// Mock data - replace with actual data fetching
const waterSavingsData = {
  totalSavedLitres: 150000,
  percentageReduction: 25,
  comparisonTraditional: 200000, // Litres estimated with traditional methods
};

const monthlySavings = [
  { month: "Ene", saved: 12000 },
  { month: "Feb", saved: 15000 },
  { month: "Mar", saved: 18000 },
  { month: "Abr", saved: 16000 },
  { month: "May", saved: 20000 },
  { month: "Jun", saved: 22000 },
  { month: "Jul", saved: 25000 },
  { month: "Ago", saved: 22000 },
  // Add more months as needed
];

const chartConfig = {
  saved: {
    label: "Agua Ahorrada (L)",
    color: "hsl(var(--chart-2))", // Use secondary color (blue)
  },
} satisfies import("@/components/ui/chart").ChartConfig;

const sdgContributions = [
    { id: 6, title: "ODS 6: Agua Limpia y Saneamiento", description: "Optimizando el uso del agua, contribuimos a la gestión sostenible de este recurso vital.", iconUrl: "https://picsum.photos/seed/sdg6/64/64", dataAiHint:"clean water"},
    { id: 13, title: "ODS 13: Acción por el Clima", description: "Reduciendo el consumo de agua y energía asociada al bombeo, ayudamos a mitigar el cambio climático.", iconUrl: "https://picsum.photos/seed/sdg13/64/64", dataAiHint:"climate action" },
    { id: 2, title: "ODS 2: Hambre Cero", description: "Asegurando riegos eficientes, promovemos una agricultura más resiliente y productiva.", iconUrl: "https://picsum.photos/seed/sdg2/64/64", dataAiHint:"zero hunger" }
];

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-green-700">Sistema de Riego Inteligente</h1>
            <div className="space-x-6">
              <Link href="/" className="text-gray-700 hover:text-green-700 font-medium">Inicio</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-green-700 font-medium">Dashboard</Link>
              <Link href="/help" className="text-gray-700 hover:text-green-700 font-medium">Ayuda</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Waves className="h-7 w-7"/> Impacto Ambiental y Ahorro de Agua
            </h2>
            <p className="text-gray-600">Visualiza cómo el uso de AguaInteligente contribuye al cuidado del medio ambiente y a tus ahorros.</p>
          </div>
        </div>

        {/* Water Savings Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-blue-800 dark:text-blue-200">Agua Total Ahorrada</CardTitle>
              <Droplet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-900 dark:text-blue-100">
                {waterSavingsData.totalSavedLitres.toLocaleString('es-CL')} L
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-300">Estimado desde el inicio de uso</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg bg-gradient-to-br from-green-100 to-lime-100 dark:from-green-900 dark:to-lime-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-green-800 dark:text-green-200">Reducción de Consumo</CardTitle>
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-900 dark:text-green-100">
                {waterSavingsData.percentageReduction}%
              </div>
              <p className="text-xs text-green-700 dark:text-green-300">Comparado con métodos tradicionales</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900 dark:to-amber-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-yellow-800 dark:text-yellow-200">Equivalente a...</CardTitle>
              <Leaf className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-yellow-900 dark:text-yellow-100">
                {Math.round(waterSavingsData.totalSavedLitres / 200).toLocaleString('es-CL')} Duchas Promedio
              </div>
              <p className="text-xs text-yellow-700 dark:text-yellow-300">Una forma de visualizar el ahorro</p>
            </CardContent>
          </Card>
        </div>

        {/* Water Savings Trend Chart */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Tendencia de Ahorro Mensual</CardTitle>
            <CardDescription>Litros de agua ahorrados cada mes.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlySavings} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toLocaleString('es-CL')}k`} tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <Tooltip
                    cursor={false}
                    content={({ active, payload, label }) =>
                      active && payload && payload.length ? (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-1 gap-1.5">
                            <span className="text-sm font-semibold">{label}</span>
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 shrink-0 rounded-full bg-[hsl(var(--chart-2))]" />
                              <p className="text-sm text-muted-foreground">
                                {chartConfig.saved.label}:{" "}
                                <span className="font-mono font-medium text-foreground">
                                  {payload[0].value?.toLocaleString('es-CL')} L
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null
                    }
                  />
                  <Area type="monotone" dataKey="saved" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorSaved)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* SDG Contribution Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary"/> Contribución a los ODS
            </CardTitle>
            <CardDescription>Cómo AguaInteligente se alinea con los Objetivos de Desarrollo Sostenible.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {sdgContributions.map((sdg) => (
              <div key={sdg.id} className="flex items-start gap-4 rounded-lg border border-border p-4 shadow-sm bg-card">
                <Image src={sdg.iconUrl} alt={`ODS ${sdg.id}`} width={64} height={64} className="rounded-md flex-shrink-0" data-ai-hint={sdg.dataAiHint} />
                <div>
                  <h3 className="text-lg font-semibold">{sdg.title}</h3>
                  <p className="text-muted-foreground">{sdg.description}</p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-600 ml-auto flex-shrink-0" />
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
