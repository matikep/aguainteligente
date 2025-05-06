
'use client'; // Required for form handling and potential state management

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';
import { AlertCircle, Clock, Droplet, Save, Wifi, Settings as SettingsIcon } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';


// Define schema for settings form
const settingsSchema = z.object({
  automationEnabled: z.boolean().default(true),
  defaultHumidityThreshold: z.array(z.number().min(0).max(100)).length(1).default([60]),
  checkInterval: z.enum(['15min', '30min', '1hr', '2hr']).default('1hr'),
  iotConnectionString: z.string().optional(), // Assuming Azure IoT connection string might be needed
  alertNotificationsEnabled: z.boolean().default(true),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

// Fetch current settings or use defaults
const currentSettings: SettingsFormValues = {
    automationEnabled: true,
    defaultHumidityThreshold: [55],
    checkInterval: '1hr',
    iotConnectionString: 'HostName=YourIoTHub.azure-devices.net;SharedAccessKeyName=...', // Example placeholder
    alertNotificationsEnabled: true,
};


export default function SettingsPage() {
    const [humidityValue, setHumidityValue] = useState(currentSettings.defaultHumidityThreshold?.[0] ?? 60);

     const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsSchema),
        defaultValues: currentSettings, // Load current settings
        mode: 'onChange',
    });

   function onSubmit(data: SettingsFormValues) {
    // TODO: Implement actual settings saving logic (e.g., API call)
    console.log("Saving settings:", data);
    toast({
      title: 'Configuración Guardada',
      description: 'Tus preferencias de riego han sido actualizadas.',
      variant: 'default' // Use 'default' which is green in the theme
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold flex items-center gap-2"><SettingsIcon className="h-7 w-7"/> Configuración del Sistema de Riego</h1>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                 {/* Automation Rules Section */}
                <Card className="shadow-lg">
                    <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2"><Clock className="h-5 w-5"/> Reglas de Automatización</CardTitle>
                    <CardDescription>Define cómo y cuándo el sistema debe regar automáticamente.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="automationEnabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base font-semibold">Activar Riego Automático</FormLabel>
                                    <FormDescription>
                                    Permite que el sistema controle el riego según los sensores.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                            />

                        <FormField
                            control={form.control}
                            name="checkInterval"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-base">Intervalo de Verificación</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger className="text-base">
                                        <SelectValue placeholder="Selecciona cada cuánto verificar" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="15min">Cada 15 minutos</SelectItem>
                                    <SelectItem value="30min">Cada 30 minutos</SelectItem>
                                    <SelectItem value="1hr">Cada 1 hora</SelectItem>
                                    <SelectItem value="2hr">Cada 2 horas</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Frecuencia con la que el sistema revisa los sensores para decidir si regar.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                 {/* Sensor Thresholds Section */}
                <Card className="shadow-lg">
                    <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2"><Droplet className="h-5 w-5"/> Umbrales de Sensores (Por Defecto)</CardTitle>
                    <CardDescription>Establece los niveles base para activar el riego. Puedes personalizarlos por campo.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <FormField
                            control={form.control}
                            name="defaultHumidityThreshold"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base flex items-center">Umbral Mínimo de Humedad General (%)</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-4 pt-2">
                                        <Slider
                                            defaultValue={[humidityValue]}
                                            max={100}
                                            step={1}
                                            className="flex-1"
                                            onValueChange={(value) => {
                                                field.onChange(value); // Update form state
                                                setHumidityValue(value[0]); // Update local state for display
                                            }}
                                            disabled={!form.getValues('automationEnabled')} // Disable if automation is off
                                        />
                                        <span className="text-lg font-medium w-12 text-right">{humidityValue}%</span>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Nivel de humedad base para iniciar el riego si no hay configuración específica del campo.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        {/* Add sliders/inputs for Temperature thresholds if needed */}
                    </CardContent>
                </Card>

                {/* IoT Connection Section */}
                <Card className="shadow-lg">
                    <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2"><Wifi className="h-5 w-5"/> Conexión IoT</CardTitle>
                    <CardDescription>Gestiona la conexión con la plataforma de sensores (Ej: Azure IoT Hub).</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <FormField
                            control={form.control}
                            name="iotConnectionString"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-base">Cadena de Conexión (Opcional)</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Pega aquí tu cadena de conexión si es necesario" {...field} className="text-base" />
                                </FormControl>
                                <FormDescription>
                                    Necesaria para conectar con algunos servicios IoT. Consulta la documentación.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <Button type="button" variant="secondary">Probar Conexión</Button>
                    </CardContent>
                </Card>

                 {/* Notification Settings Section */}
                 <Card className="shadow-lg">
                    <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2"><AlertCircle className="h-5 w-5"/> Notificaciones</CardTitle>
                    <CardDescription>Configura cómo deseas recibir las alertas.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <FormField
                            control={form.control}
                            name="alertNotificationsEnabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base font-semibold">Recibir Alertas</FormLabel>
                                    <FormDescription>
                                        Activa para recibir notificaciones sobre niveles bajos, riegos, etc.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                            />
                         {/* Add options for Email/SMS notifications if needed */}
                    </CardContent>
                </Card>


                <Separator />

                 {/* Save Button */}
                <div className="flex justify-end">
                    <Button type="submit" size="lg" className="text-lg">
                    <Save className="mr-2 h-6 w-6" /> Guardar Configuración
                    </Button>
                </div>

            </form>
        </Form>


    </div>
  );
}

