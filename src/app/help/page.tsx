
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, PlayCircle, MessageSquare, HelpCircle as HelpIcon } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";

// Mock data for tutorials and videos
const tutorials = [
  { id: "t1", title: "¿Cómo registrar un nuevo campo?", content: "Sigue estos pasos simples: 1. Ve a 'Gestión de Campos'. 2. Haz clic en 'Añadir Nuevo Campo'. 3. Completa la información solicitada (nombre, ubicación). 4. ¡Listo! Tu campo aparecerá en la lista." },
  { id: "t2", title: "Entendiendo los umbrales de humedad", content: "El umbral de humedad es el nivel mínimo (%) que debe tener tu suelo. Si el sensor detecta un nivel por debajo, el sistema activará el riego automáticamente (si está habilitado). Puedes ajustar este umbral en la configuración general o por cada campo." },
  { id: "t3", title: "Configurar el riego automático", content: "Ve a 'Configuración Riego', activa la opción 'Activar Riego Automático'. Establece el umbral de humedad general y el intervalo de verificación. El sistema hará el resto." },
  { id: "t4", title: "¿Qué significan las alertas?", content: "Las alertas te informan sobre situaciones importantes: 'Nivel bajo' significa que se recomienda regar pronto. 'Riego activo' indica que el sistema está regando. 'Error sensor' avisa si hay un problema con un dispositivo." },
];

const videos = [
  { id: "v1", title: "Video: Primeros pasos con AguaInteligente", description: "Un recorrido rápido por la plataforma.", imageUrl: "https://picsum.photos/seed/video1/300/200", dataAiHint: "tutorial video" },
  { id: "v2", title: "Video: Interpretando los datos del dashboard", description: "Aprende qué significa cada número.", imageUrl: "https://picsum.photos/seed/video2/300/200", dataAiHint: "data dashboard" },
  { id: "v3", title: "Video: Consejos para ahorrar agua", description: "Optimiza tu riego con nuestros consejos.", imageUrl: "https://picsum.photos/seed/video3/300/200", dataAiHint: "water saving" },
];

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold flex items-center gap-2"><HelpIcon className="h-7 w-7"/> Capacitación y Ayuda</h1>
      <p className="text-lg text-muted-foreground">
        Encuentra respuestas rápidas, aprende a usar la plataforma y contacta con soporte si necesitas más ayuda.
      </p>

      {/* Tutorials Section (Accordion) */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2"><BookOpen className="h-5 w-5"/> Tutoriales Rápidos</CardTitle>
          <CardDescription>Preguntas frecuentes y guías paso a paso.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {tutorials.map((tutorial) => (
              <AccordionItem key={tutorial.id} value={tutorial.id}>
                <AccordionTrigger className="text-lg hover:no-underline">{tutorial.title}</AccordionTrigger>
                <AccordionContent className="text-base px-4">
                  {tutorial.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Videos Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2"><PlayCircle className="h-5 w-5"/> Videos Explicativos</CardTitle>
          <CardDescription>Mira nuestros videos para aprender visualmente.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden shadow-md transition-transform hover:scale-105">
              <div className="relative h-40 w-full">
                  <Image
                    src={video.imageUrl}
                    alt={video.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={video.dataAiHint}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white opacity-80" />
                  </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-base font-semibold">{video.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">{video.description}</p>
              </CardContent>
               {/* <CardFooter className="p-4 pt-0">
                 <Button variant="link" className="p-0 h-auto">Ver video</Button>
               </CardFooter> */}
            </Card>
          ))}
        </CardContent>
      </Card>

       {/* Support Chat Section */}
      <Card className="shadow-lg bg-secondary">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2"><MessageSquare className="h-5 w-5"/> Soporte Técnico</CardTitle>
          <CardDescription>¿No encuentras lo que buscas? Habla con nosotros.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-base">
            Si tienes problemas técnicos o necesitas ayuda personalizada, nuestro equipo está listo para asistirte.
          </p>
          <Button size="lg" className="text-lg">
            <MessageSquare className="mr-2 h-6 w-6" /> Iniciar Chat de Soporte
          </Button>
           {/* Add alternative contact methods if needed */}
           <p className="mt-4 text-sm text-muted-foreground">También puedes contactarnos por teléfono al +56 9 XXXX XXXX o email a soporte@aguainteligente.cl</p>
        </CardContent>
      </Card>
    </div>
  );
}
