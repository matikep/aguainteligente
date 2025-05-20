"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Settings as SettingsIcon, Clock, Droplet, Wifi, AlertCircle, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema, type SettingsFormValues } from "@/lib/validations/settings";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

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
    const { toast } = useToast();

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsSchema),
        defaultValues: currentSettings,
        mode: 'onChange',
    });

    function onSubmit(data: SettingsFormValues) {
        console.log("Saving settings:", data);
        toast({
            title: 'Configuración Guardada',
            description: 'Tus preferencias de riego han sido actualizadas.',
            variant: 'default'
        });
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <Toaster />
            {/* Header */}
            

            <main>
                {/* Hero Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Configuración del Sistema</h2>
                        <p className="text-gray-600">Personaliza los parámetros y preferencias de tu sistema de riego inteligente.</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Automation Rules Section */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-xl font-semibold">Reglas de Automatización</h3>
                            </div>
                            <div className="space-y-6">
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
                            </div>
                        </div>

                        {/* Sensor Thresholds Section */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-xl font-semibold">Umbrales de Sensores</h3>
                            </div>
                            <div className="space-y-6">
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
                                                            field.onChange(value);
                                                            setHumidityValue(value[0]);
                                                        }}
                                                        disabled={!form.getValues('automationEnabled')}
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
                            </div>
                        </div>

                        {/* IoT Connection Section */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-xl font-semibold">Conexión IoT</h3>
                            </div>
                            <div className="space-y-6">
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
                            </div>
                        </div>

                        {/* Notification Settings Section */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-xl font-semibold">Notificaciones</h3>
                            </div>
                            <div className="space-y-6">
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
                            </div>
                        </div>

                        <Separator />

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <Button type="submit" size="lg" className="text-lg">
                                <Save className="mr-2 h-6 w-6" /> Guardar Configuración
                            </Button>
                        </div>
                    </form>
                </Form>
            </main>

            
        </div>
    );
}

