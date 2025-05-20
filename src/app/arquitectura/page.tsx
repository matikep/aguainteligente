"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Server, Network, Cpu, Database, Cloud, Shield, Zap, Droplet } from "lucide-react";
import { NewBadge } from "@/components/ui/new-badge";
import { SystemDiagram } from "@/components/SystemDiagram";

// Mock data - replace with actual data fetching
const data = {
  sensores: [
    { id: 1, nombre: "Humedad del Suelo", estado: "Activo" },
    { id: 2, nombre: "Temperatura", estado: "Activo" },
    { id: 3, nombre: "Nivel de Agua", estado: "Activo" }
  ],
  actuadores: [
    { id: 1, nombre: "Válvula Solenoide", estado: "Inactivo" },
    { id: 2, nombre: "Bomba de Agua", estado: "Inactivo" }
  ],
  nube: {
    conectado: true,
    ultimaSincronizacion: "Hace 5 minutos",
    mensajesEnviados: 1250
  }
};

export default function ArquitecturaPage() {
  const [seleccionado, setSeleccionado] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      

      <main>
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Arquitectura del Sistema</h2>
            <p className="text-gray-600">Visualización detallada de los componentes y su interacción en el sistema de riego inteligente.</p>
          </div>
        </div>

        {/* System Diagram */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="w-full overflow-x-auto">
            <SystemDiagram />
          </div>
        </div>
        

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Sensores Activos</h3>
              <NewBadge />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-blue-600">{data.sensores.length}</p>
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Droplet className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Estado del Sistema</h3>
              <NewBadge />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-green-600">{data.nube.conectado ? "Online" : "Offline"}</p>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Network className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Mensajes Enviados</h3>
              <NewBadge />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-purple-600">{data.nube.mensajesEnviados}</p>
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <Cloud className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-semibold">Componentes del Sistema</h3>
              <NewBadge />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Sensores IoT</h4>
                  <p className="text-sm text-gray-500">Recolección de datos en tiempo real</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Estado: Activo</p>
                  <p className="text-sm text-gray-500">Frecuencia: 1 Hz</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Controlador Central</h4>
                  <p className="text-sm text-gray-500">Procesamiento y toma de decisiones</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Estado: Activo</p>
                  <p className="text-sm text-gray-500">CPU: 25%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Actuadores</h4>
                  <p className="text-sm text-gray-500">Control de riego</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Estado: Standby</p>
                  <p className="text-sm text-gray-500">Última acción: Hace 2h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-semibold">Conexión con la Nube</h3>
              <NewBadge />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Azure IoT Hub</h4>
                  <p className="text-sm text-gray-500">Gestión de dispositivos</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Estado: Conectado</p>
                  <p className="text-sm text-gray-500">Latencia: 45ms</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Stream Analytics</h4>
                  <p className="text-sm text-gray-500">Procesamiento de datos</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Estado: Activo</p>
                  <p className="text-sm text-gray-500">Mensajes/min: 60</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Base de Datos</h4>
                  <p className="text-sm text-gray-500">Almacenamiento de datos</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Estado: Activo</p>
                  <p className="text-sm text-gray-500">Espacio: 45%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
} 