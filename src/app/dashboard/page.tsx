"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewBadge } from '@/components/ui/new-badge';

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

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData>({
    soilMoisture: 0,
    temperature: 0,
    waterLevel: 0,
    valveStatus: false,
    pumpStatus: false,
    lastWatering: 'Hace 2 horas',
    nextWatering: 'En 1 hora',
    waterUsage: 0,
    efficiency: 0
  });

  useEffect(() => {
    const updateSensorData = () => {
      setSensorData({
        soilMoisture: Math.floor(Math.random() * 100),
        temperature: Math.floor(Math.random() * 30),
        waterLevel: Math.floor(Math.random() * 200),
        valveStatus: Math.random() > 0.5,
        pumpStatus: Math.random() > 0.5,
        lastWatering: 'Hace 2 horas',
        nextWatering: 'En 1 hora',
        waterUsage: Math.floor(Math.random() * 1000),
        efficiency: Math.floor(Math.random() * 100)
      });
    };
    updateSensorData();
    const interval = setInterval(updateSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Eficiencia del Sistema</h3>
              <NewBadge />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-green-600">{sensorData.efficiency}%</p>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Consumo de Agua</h3>
              <NewBadge />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-blue-600">{sensorData.waterUsage}L</p>
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">💧</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Último Riego</h3>
              <NewBadge />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-purple-600">{sensorData.lastWatering}</p>
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">⏰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Próximo Riego</h3>
              <NewBadge />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-orange-600">{sensorData.nextWatering}</p>
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-2xl">🔜</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-semibold">Estado de Sensores</h3>
              <NewBadge />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Humedad del Suelo</h4>
                  <p className="text-sm text-gray-500">Capacitive Soil Moisture Sensor v1.2</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{sensorData.soilMoisture}%</p>
                  <p className="text-sm text-gray-500">Estado: Normal</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Temperatura Ambiente</h4>
                  <p className="text-sm text-gray-500">DHT22 Sensor</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">{sensorData.temperature}°C</p>
                  <p className="text-sm text-gray-500">Estado: Normal</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Nivel de Agua</h4>
                  <p className="text-sm text-gray-500">Ultrasonic Water Level Sensor</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{sensorData.waterLevel} cm</p>
                  <p className="text-sm text-gray-500">Estado: Normal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-semibold">Control de Actuadores</h3>
              <NewBadge />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Válvula Solenoide</h4>
                  <p className="text-sm text-gray-500">12V DC Solenoid Valve</p>
                </div>
                <button 
                  className={`px-4 py-2 rounded-full ${
                    sensorData.valveStatus 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {sensorData.valveStatus ? 'Activa' : 'Inactiva'}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Bomba de Agua</h4>
                  <p className="text-sm text-gray-500">12V DC Water Pump</p>
                </div>
                <button 
                  className={`px-4 py-2 rounded-full ${
                    sensorData.pumpStatus 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {sensorData.pumpStatus ? 'Activa' : 'Inactiva'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold">Estado del Sistema</h3>
            <NewBadge />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Conexión IoT</h4>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <p className="text-green-600">Conectado</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Azure IoT Hub</h4>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <p className="text-green-600">Activo</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Stream Analytics</h4>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <p className="text-green-600">Procesando</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
} 