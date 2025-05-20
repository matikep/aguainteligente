'use client'; // Need client component for chart interaction

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Droplet, Thermometer, Calendar, Edit, BarChartHorizontalBig } from "lucide-react";
import Link from "next/link";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Mock data - replace with actual data fetching based on params.id
const fieldData = {
  id: "f1",
  name: "Parcela A",
  crop: "Tomates",
  status: "active",
  humidity: 60,
  temperature: 23,
  humidityThresholdMin: 55,
  humidityThresholdMax: 75,
  lastIrrigation: "Hace 3 horas",
  location: { lat: -33.45, lng: -70.66 }, // Example coordinates for Santiago
};

// Mock irrigation history
const irrigationHistory = [
  { date: "Lun", duration: 30, waterUsed: 50 },
  { date: "Mar", duration: 0, waterUsed: 0 },
  { date: "Mié", duration: 45, waterUsed: 75 },
  { date: "Jue", duration: 30, waterUsed: 50 },
  { date: "Vie", duration: 60, waterUsed: 100 },
  { date: "Sáb", duration: 0, waterUsed: 0 },
  { date: "Dom", duration: 40, waterUsed: 65 },
];

const chartConfig = {
  duration: {
    label: "Duración (min)",
    color: "hsl(var(--chart-1))", // Use primary color (green)
  },
  waterUsed: {
    label: "Agua Usada (L)",
    color: "hsl(var(--chart-2))", // Use secondary color (blue)
  },
} satisfies import("@/components/ui/chart").ChartConfig;

type Props = {
  params: Promise<{ id: string }>
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function FieldDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  // In a real app, fetch fieldData and irrigationHistory based on params.id

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/fields">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Volver a Campos</span>
            </Link>
        </Button>
        <h1 className="text-3xl font-bold">{fieldData.name}</h1>
        <Badge variant={fieldData.status === 'active' ? 'default' : fieldData.status === 'warning' ? 'destructive' : 'secondary'} className="text-sm ml-auto">
            {fieldData.status === 'active' ? 'Activo' : fieldData.status === 'warning' ? 'Alerta' : 'Inactivo'}
        </Badge>
      </div>

      {/* Field Details & Current Status */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-lg">Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-base">
                <p><strong>Cultivo:</strong> {fieldData.crop}</p>
                <p><strong>Último Riego:</strong> {fieldData.lastIrrigation}</p>
                <p><strong>Ubicación:</strong> {fieldData.location.lat.toFixed(2)}, {fieldData.location.lng.toFixed(2)}</p>
            </CardContent>
        </Card>
         <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Humedad Actual</CardTitle>
                <Droplet className="h-6 w-6 text-secondary" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">{fieldData.humidity}%</div>
                <p className="text-xs text-muted-foreground">
                    Umbral: {fieldData.humidityThresholdMin}% - {fieldData.humidityThresholdMax}%
                </p>
            </CardContent>
         </Card>
         <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Temperatura Actual</CardTitle>
                <Thermometer className="h-6 w-6 text-destructive" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">{fieldData.temperature}°C</div>
                <p className="text-xs text-muted-foreground">Temperatura del ambiente en el campo</p>
            </CardContent>
         </Card>
      </div>


       {/* Irrigation History Chart */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
             <Calendar className="h-5 w-5" /> Historial de Riego (Últimos 7 días)
          </CardTitle>
          <CardDescription>Duración del riego y agua consumida.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={irrigationHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                 <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                 <YAxis yAxisId="left" stroke="hsl(var(--chart-1))" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                 <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                 <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                 <Legend content={<ChartLegendContent />} />
                 <Bar yAxisId="left" dataKey="duration" fill="var(--color-duration)" radius={4} name="Duración (min)" />
                 <Bar yAxisId="right" dataKey="waterUsed" fill="var(--color-waterUsed)" radius={4} name="Agua Usada (L)" />
               </BarChart>
             </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

       {/* Customization and Actions */}
       <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-xl">Configuración y Acciones</CardTitle>
                <CardDescription>Ajusta los parámetros de riego para este campo.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:justify-start">
                 <Button size="lg" className="text-lg" asChild>
                   <Link href={`/fields/${id}/edit`}>
                     <Edit className="mr-2 h-6 w-6" /> Personalizar Parámetros
                   </Link>
                 </Button>
                 <Button size="lg" className="text-lg" variant="outline" asChild>
                    <Link href={`/fields/${id}/history`}>
                        <BarChartHorizontalBig className="mr-2 h-6 w-6" /> Ver Historial Completo
                    </Link>
                 </Button>
                 {/* Add more actions like Manual Irrigation Start/Stop if needed */}
            </CardContent>
       </Card>


    </div>
  );
}
