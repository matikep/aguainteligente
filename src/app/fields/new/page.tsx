
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, TreePine, Droplet } from 'lucide-react'; // Added icons
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

const fieldFormSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  crop: z.string().optional(),
  description: z.string().optional(),
  latitude: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(-90).max(90, { message: 'Latitud inválida.' })
  ),
  longitude: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(-180).max(180, { message: 'Longitud inválida.' })
  ),
  humidityThreshold: z.array(z.number()).min(1).max(1), // Using slider for single value initially
});

type FieldFormValues = z.infer<typeof fieldFormSchema>;

// Default values for the form
const defaultValues: Partial<FieldFormValues> = {
  name: '',
  crop: '',
  description: '',
  latitude: -33.45, // Default to Santiago latitude
  longitude: -70.66, // Default to Santiago longitude
  humidityThreshold: [60], // Default humidity threshold
};

export default function NewFieldPage() {
  const [humidityValue, setHumidityValue] = useState(defaultValues.humidityThreshold?.[0] ?? 60);

  const form = useForm<FieldFormValues>({
    resolver: zodResolver(fieldFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: FieldFormValues) {
    // TODO: Implement actual form submission logic (e.g., API call)
    console.log(data);
    toast({
      title: 'Campo Registrado Exitosamente',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    // Potentially redirect user after successful submission
    // router.push('/fields');
  }

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
                <Link href="/fields">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Volver a Campos</span>
                </Link>
            </Button>
            <h1 className="text-3xl font-bold">Añadir Nuevo Campo</h1>
        </div>

        <Card className="shadow-lg">
            <CardHeader>
            <CardTitle>Información del Campo</CardTitle>
            <CardDescription>Ingresa los detalles de tu nueva parcela o cultivo.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base flex items-center"><TreePine className="mr-2 h-5 w-5" /> Nombre del Campo</FormLabel>
                        <FormControl>
                        <Input placeholder="Ej: Parcela Norte" {...field} className="text-base" />
                        </FormControl>
                        <FormDescription>
                        Dale un nombre identificable a tu campo o parcela.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="crop"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base">Tipo de Cultivo (Opcional)</FormLabel>
                        <FormControl>
                        <Input placeholder="Ej: Tomates, Maíz" {...field} className="text-base" />
                        </FormControl>
                         <FormMessage />
                    </FormItem>
                    )}
                />

                 <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base">Descripción (Opcional)</FormLabel>
                        <FormControl>
                         <Textarea
                            placeholder="Añade notas adicionales sobre el campo..."
                            className="resize-none text-base"
                            {...field}
                            />
                        </FormControl>
                         <FormMessage />
                    </FormItem>
                    )}
                 />


                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base flex items-center"><MapPin className="mr-2 h-5 w-5" /> Latitud</FormLabel>
                            <FormControl>
                                <Input type="number" step="any" placeholder="-33.456" {...field} className="text-base" />
                            </FormControl>
                             <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base flex items-center"><MapPin className="mr-2 h-5 w-5" /> Longitud</FormLabel>
                            <FormControl>
                                <Input type="number" step="any" placeholder="-70.678" {...field} className="text-base" />
                            </FormControl>
                             <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormDescription>
                    Ingresa las coordenadas geográficas aproximadas de tu campo.
                </FormDescription>

                 <FormField
                    control={form.control}
                    name="humidityThreshold"
                    render={({ field }) => (
                    <FormItem>
                         <FormLabel className="text-base flex items-center"><Droplet className="mr-2 h-5 w-5" /> Umbral Mínimo de Humedad (%)</FormLabel>
                         <FormControl>
                            <div className="flex items-center gap-4">
                                <Slider
                                    defaultValue={[humidityValue]}
                                    max={100}
                                    step={1}
                                    className="flex-1"
                                    onValueChange={(value) => {
                                        field.onChange(value); // Update form state
                                        setHumidityValue(value[0]); // Update local state for display
                                    }}
                                />
                                <span className="text-lg font-medium w-12 text-right">{humidityValue}%</span>
                            </div>

                         </FormControl>
                         <FormDescription>
                            El sistema activará el riego cuando la humedad baje de este nivel.
                         </FormDescription>
                         <FormMessage />
                    </FormItem>
                    )}
                 />


                <Button type="submit" size="lg" className="text-lg w-full md:w-auto">Registrar Campo</Button>
                </form>
            </Form>
            </CardContent>
        </Card>
    </div>
  );
}

