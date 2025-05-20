"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpen, Shield, Wifi, Cpu, Droplet, Thermometer, Zap, CheckCircle } from "lucide-react";
import { NewBadge } from "@/components/ui/new-badge";

export default function Help() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      

      <main>
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Capacitación y Ayuda</h2>
            <p className="text-gray-600">Información detallada sobre sensores, actuadores y protocolos de comunicación del sistema.</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Sensores</h3>
              <NewBadge />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-blue-600">3</p>
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Droplet className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Actuadores</h3>
              <NewBadge />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-green-600">2</p>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Protocolos</h3>
              <NewBadge />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-purple-600">3</p>
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <Wifi className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-semibold">Sensores Utilizados</h3>
              <NewBadge />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Humedad del Suelo</h4>
                  <p className="text-sm text-gray-500">Capacitive Soil Moisture Sensor v1.2</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Rango: 0-100%</p>
                  <p className="text-sm text-gray-500">Precisión: ±2%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Temperatura Ambiente</h4>
                  <p className="text-sm text-gray-500">DHT22 Sensor</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Rango: -40°C a 80°C</p>
                  <p className="text-sm text-gray-500">Precisión: ±0.5°C</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Nivel de Agua</h4>
                  <p className="text-sm text-gray-500">Ultrasonic Water Level Sensor</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Rango: 2-400cm</p>
                  <p className="text-sm text-gray-500">Precisión: ±1cm</p>
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
                <div className="text-right">
                  <p className="text-sm text-gray-500">Presión: 10 bar</p>
                  <p className="text-sm text-gray-500">Flujo: 2.5 L/min</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Bomba de Agua</h4>
                  <p className="text-sm text-gray-500">12V DC Water Pump</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Presión: 3 bar</p>
                  <p className="text-sm text-gray-500">Flujo: 5 L/min</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold">Protocolos de Comunicación</h3>
            <NewBadge />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">MQTT</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">• Broker: Azure IoT Hub</p>
                <p className="text-sm text-gray-600">• Puerto: 8883 (TLS)</p>
                <p className="text-sm text-gray-600">• QoS: 1</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">HTTPS</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">• Endpoint: Azure IoT Hub REST API</p>
                <p className="text-sm text-gray-600">• Autenticación: SAS Token</p>
                <p className="text-sm text-gray-600">• Métodos: GET, POST, PUT</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">LoRaWAN</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">• Frecuencia: 915 MHz</p>
                <p className="text-sm text-gray-600">• Potencia: 14 dBm</p>
                <p className="text-sm text-gray-600">• Alcance: 2-5 km</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}
