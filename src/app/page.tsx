"use client";

import { useState, useEffect } from "react";
import { Droplet, Thermometer, Gauge, Zap, Clock, Calendar, Wifi, Cloud, Activity } from "lucide-react";
import { NewBadge } from "@/components/ui/new-badge";

interface SensorData {
  soilMoisture: number;
  temperature: number;
  waterLevel: number;
  valveStatus: boolean;
  pumpStatus: boolean;
  lastWatering: string;
  nextWatering: string;
  waterUsage: number;
  efficiency: number;
}

export default function Home() {
  const [sensorData, setSensorData] = useState<SensorData>({
    soilMoisture: 65,
    temperature: 25,
    waterLevel: 75,
    valveStatus: false,
    pumpStatus: false,
    lastWatering: "2025-03-20 08:30",
    nextWatering: "2025-03-20 18:00",
    waterUsage: 120,
    efficiency: 85
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        soilMoisture: Math.floor(Math.random() * 100),
        temperature: Math.floor(Math.random() * 40) - 10,
        waterLevel: Math.floor(Math.random() * 100),
        waterUsage: Math.floor(Math.random() * 200),
        efficiency: Math.floor(Math.random() * 30) + 70
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      

      <main>
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Panel de Control</h2>
            <p className="text-gray-600">Monitoreo y control en tiempo real del sistema de riego</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Eficiencia del Sistema</h3>
              <NewBadge />
            </div>
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-3xl font-bold text-gray-900">{sensorData.efficiency}%</p>
                <p className="text-sm text-gray-500">Optimización de recursos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Consumo de Agua</h3>
              <NewBadge />
            </div>
            <div className="flex items-center">
              <Droplet className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-3xl font-bold text-gray-900">{sensorData.waterUsage}L</p>
                <p className="text-sm text-gray-500">Últimas 24 horas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Último Riego</h3>
              <NewBadge />
            </div>
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className="text-3xl font-bold text-gray-900">{sensorData.lastWatering}</p>
                <p className="text-sm text-gray-500">Duración: 15 min</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Próximo Riego</h3>
              <NewBadge />
            </div>
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-orange-500 mr-3" />
              <div>
                <p className="text-3xl font-bold text-gray-900">{sensorData.nextWatering}</p>
                <p className="text-sm text-gray-500">Programado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sensor Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Estado de Sensores</h3>
                <NewBadge />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">Humedad del Suelo</h4>
                    <Droplet className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{sensorData.soilMoisture}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${sensorData.soilMoisture}%` }}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">Temperatura Ambiente</h4>
                    <Thermometer className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{sensorData.temperature}°C</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${((sensorData.temperature + 10) / 50) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">Nivel de Agua</h4>
                    <Gauge className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{sensorData.waterLevel}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${sensorData.waterLevel}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Control de Actuadores</h3>
                <NewBadge />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-900">Válvula Solenoide</h4>
                    <button 
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        sensorData.valveStatus 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                      onClick={() => setSensorData(prev => ({ ...prev, valveStatus: !prev.valveStatus }))}
                    >
                      {sensorData.valveStatus ? 'Activo' : 'Inactivo'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">Control de flujo de agua</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-900">Bomba de Agua</h4>
                    <button 
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        sensorData.pumpStatus 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                      onClick={() => setSensorData(prev => ({ ...prev, pumpStatus: !prev.pumpStatus }))}
                    >
                      {sensorData.pumpStatus ? 'Activo' : 'Inactivo'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">Presión del sistema</p>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Estado del Sistema</h3>
              <NewBadge />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wifi className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-900">Conexión IoT</span>
                </div>
                <span className="text-sm text-green-600">Conectado</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Cloud className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-900">Azure IoT Hub</span>
                </div>
                <span className="text-sm text-green-600">Conectado</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-900">Stream Analytics</span>
                </div>
                <span className="text-sm text-green-600">Activo</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}
