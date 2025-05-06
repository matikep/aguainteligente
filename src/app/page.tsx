
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Droplet, Sun, BarChart, Thermometer, Waves } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';

export default function Dashboard() {
  // Mock data - replace with actual data fetching later
  const realTimeData = {
    soilHumidity: 65, // percentage
    ambientTemperature: 22, // Celsius
    waterLevel: 70, // percentage or level
  };

  const alerts = [
    { id: 1, type: "warning", message: "Nivel de humedad bajo en Parcela A. Se recomienda riego.", field: "Parcela A" },
    { id: 2, type: "info", message: "Riego programado para Parcela B en 2 horas.", field: "Parcela B" },
  ];

  const recommendations = [
    { id: 1, text: "Optimizar horario de riego nocturno para Parcela C para reducir evaporación." },
    { id: 2, text: "Considerar ajuste de umbral de humedad en Parcela A basado en pronóstico seco." },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Panel de Control</h1>

      {/* Real-time Data Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Humedad del Suelo</CardTitle>
            <Droplet className="h-6 w-6 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{realTimeData.soilHumidity}%</div>
            <p className="text-xs text-muted-foreground">Promedio general actual</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Temperatura Ambiente</CardTitle>
            <Thermometer className="h-6 w-6 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{realTimeData.ambientTemperature}°C</div>
            <p className="text-xs text-muted-foreground">Temperatura actual</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Nivel de Agua</CardTitle>
             <Waves className="h-6 w-6 text-blue-500" /> {/* Using Waves icon */}
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{realTimeData.waterLevel}%</div>
            <p className="text-xs text-muted-foreground">Nivel del estanque principal</p>
          </CardContent>
        </Card>
      </div>

       {/* Placeholder Image */}
       <div className="relative mt-6 h-64 w-full overflow-hidden rounded-lg shadow-md">
         <Image
            src="https://picsum.photos/1200/400"
            alt="Campo agrícola"
            layout="fill"
            objectFit="cover"
            data-ai-hint="agriculture field"
          />
         <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h2 className="text-3xl font-semibold text-white text-center p-4">Bienvenido a AguaInteligente</h2>
         </div>
       </div>


      {/* Alerts Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Alertas Inteligentes</h2>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <Alert key={alert.id} variant={alert.type === 'warning' ? 'destructive' : 'default'} className="shadow">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>{alert.field}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))
        ) : (
          <p className="text-muted-foreground">No hay alertas activas.</p>
        )}
         <Button asChild variant="link" className="p-0 h-auto">
             <Link href="/fields">Ver todas las alertas</Link>
         </Button>
      </div>

      {/* Recommendations Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recomendaciones de Riego</h2>
         <Card className="shadow-md">
            <CardContent className="p-6 space-y-3">
                {recommendations.length > 0 ? (
                recommendations.map((rec) => (
                    <div key={rec.id} className="flex items-start gap-3">
                     <Sun className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                     <p className="text-sm">{rec.text}</p>
                    </div>
                ))
                ) : (
                <p className="text-muted-foreground">No hay recomendaciones disponibles.</p>
                )}
            </CardContent>
         </Card>
      </div>

       {/* Quick Actions */}
       <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                 <Button size="lg" className="text-lg" asChild>
                     <Link href="/fields"><BarChart className="mr-2 h-6 w-6" /> Gestionar Campos</Link>
                 </Button>
                 <Button size="lg" className="text-lg" variant="secondary" asChild>
                     <Link href="/settings"><Droplet className="mr-2 h-6 w-6" /> Configurar Riego</Link>
                 </Button>
                 <Button size="lg" className="text-lg" variant="outline" asChild>
                    <Link href="/impact"><Waves className="mr-2 h-6 w-6" /> Ver Impacto</Link>
                 </Button>
            </div>
       </div>

    </div>
  );
}
