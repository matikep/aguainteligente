import React from 'react';
import { NewBadge } from "@/components/ui/new-badge"; // Asegúrate de que esta ruta es correcta

export function SystemDiagram() {
  // Define un ID único para el marcador de flecha si hay múltiples diagramas en la página
  const arrowMarkerId = "arrowhead-system-diagram";

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-6"> {/* Aumenté el margen inferior */}
        <h3 className="text-2xl font-bold text-gray-800">Diagrama del Sistema</h3> {/* Título más grande y oscuro */}
        <NewBadge />
      </div>
      {/* Ajusté viewBox y className para mejor responsividad */}
      <svg width="100%" height="650" viewBox="0 0 1500 650" className="block mx-auto w-full max-w-[1500px]" role="img" aria-labelledby="diagram-title">
        <title id="diagram-title">Diagrama del Sistema de Riego Inteligente</title>
        
        {/* Definiciones: Gradiente, Sombra, Flecha */}
        <defs>
          {/* Gradiente de Fondo más sutil */}
          <linearGradient id="bgGradientNew" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f9faff', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: '#f0f4f8', stopOpacity: 0.3 }} />
          </linearGradient>
          {/* Sombra más suave */}
          <filter id="shadowNew" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="3" dy="3" stdDeviation="5" floodOpacity="0.15" floodColor="#000"/>
          </filter>
          {/* Marcador de Flecha */}
          <marker id={arrowMarkerId} viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" orient="auto-start-reverse" markerWidth="6" markerHeight="6">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#4b5563" /> {/* Flecha gris oscuro */}
          </marker>
        </defs>
        
        {/* Fondo */}
        <rect width="100%" height="100%" fill="url(#bgGradientNew)" rx="10"/> {/* Fondo con esquinas redondeadas */}

        {/* Conexiones con animación */}
        <g className="connections" strokeWidth="3" strokeLinecap="round" markerEnd={`url(#${arrowMarkerId})`}> {/* Agregué markerEnd aquí */}
          {/* Sensores a Arduino */}
          {/* Curva suave desde Sensor Humedad */}
          <path d="M320,150 C 400,150 450,250 500,280" fill="none" stroke="#3b82f6" strokeDasharray="8,8">
             <animate attributeName="stroke-dashoffset" values="0;-16" dur="2s" repeatCount="indefinite" />
          </path>
          {/* Línea recta desde Sensor Temperatura */}
          <path d="M320,300 H 500" fill="none" stroke="#3b82f6" strokeDasharray="8,8">
             <animate attributeName="stroke-dashoffset" values="0;-16" dur="2s" repeatCount="indefinite" />
          </path>
           {/* Curva suave desde Sensor Nivel */}
          <path d="M320,450 C 400,450 450,350 500,320" fill="none" stroke="#3b82f6" strokeDasharray="8,8">
             <animate attributeName="stroke-dashoffset" values="0;-16" dur="2s" repeatCount="indefinite" />
          </path>

          {/* Arduino a Relé */}
          <path d="M750,300 H 950" fill="none" stroke="#f97316" strokeDasharray="8,8">
            <animate attributeName="stroke-dashoffset" values="0;-16" dur="2s" repeatCount="indefinite" />
          </path>

          {/* Relé a Bomba */}
          <path d="M1100,340 V 450" fill="none" stroke="#10b981" strokeDasharray="8,8">
            <animate attributeName="stroke-dashoffset" values="0;-16" dur="2s" repeatCount="indefinite" />
          </path>

          {/* Arduino a Nube */}
           {/* Curva ascendente más pronunciada */}
          <path d="M750,300 C 900,150 1000,80 1250,80" fill="none" stroke="#8b5cf6" strokeDasharray="8,8">
            <animate attributeName="stroke-dashoffset" values="0;-16" dur="2s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Componentes con efectos y mejor layout */}
        {/* Sensores */}
        <g filter="url(#shadowNew)">
          <rect x="120" y="110" width="200" height="80" rx="15" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
          <text x="220" y="145" textAnchor="middle" fill="#0c4a6e" fontSize="16" fontWeight="bold">Sensor Humedad</text>
          <text x="220" y="165" textAnchor="middle" fill="#0c4a6e" fontSize="12">Capacitivo v1.2</text>

          <rect x="120" y="260" width="200" height="80" rx="15" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
          <text x="220" y="295" textAnchor="middle" fill="#0c4a6e" fontSize="16" fontWeight="bold">Sensor Temperatura</text>
          <text x="220" y="315" textAnchor="middle" fill="#0c4a6e" fontSize="12">DHT22</text>

          <rect x="120" y="410" width="200" height="80" rx="15" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
          <text x="220" y="445" textAnchor="middle" fill="#0c4a6e" fontSize="16" fontWeight="bold">Sensor Nivel</text>
          <text x="220" y="465" textAnchor="middle" fill="#0c4a6e" fontSize="12">Ultrasonico</text>
        </g>

        {/* Arduino (Controlador Central) */}
        <g filter="url(#shadowNew)">
          <rect x="500" y="250" width="250" height="120" rx="15" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="625" y="295" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="bold">Arduino Mega</text>
          <text x="625" y="320" textAnchor="middle" fill="#92400e" fontSize="14">Controlador Principal</text>
          <text x="625" y="340" textAnchor="middle" fill="#92400e" fontSize="12">(ESP32 + LoRa)</text>
        </g>

        {/* Relé */}
        <g filter="url(#shadowNew)">
          <rect x="950" y="300" width="150" height="80" rx="15" fill="#fecdd3" stroke="#e11d48" strokeWidth="2" />
          <text x="1025" y="335" textAnchor="middle" fill="#881337" fontSize="16" fontWeight="bold">Módulo Relé</text>
          <text x="1025" y="355" textAnchor="middle" fill="#881337" fontSize="12">4 Canales</text>
        </g>

        {/* Bomba */}
        <g filter="url(#shadowNew)">
          <rect x="1050" y="450" width="200" height="90" rx="15" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
          <text x="1150" y="485" textAnchor="middle" fill="#166534" fontSize="16" fontWeight="bold">Bomba de Agua</text>
          <text x="1150" y="505" textAnchor="middle" fill="#166534" fontSize="12">12V DC</text>
          <text x="1150" y="525" textAnchor="middle" fill="#166534" fontSize="12">5 L/min</text>
        </g>

        {/* Nube */}
        <g filter="url(#shadowNew)">
          <rect x="1150" y="40" width="250" height="200" rx="15" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
          <text x="1275" y="75" textAnchor="middle" fill="#5b21b6" fontSize="16" fontWeight="bold">Azure IoT Hub</text>
          <text x="1275" y="105" textAnchor="middle" fill="#5b21b6" fontSize="12">• Gestión de Dispositivos</text>
          <text x="1275" y="125" textAnchor="middle" fill="#5b21b6" fontSize="12">• Stream Analytics</text>
          <text x="1275" y="145" textAnchor="middle" fill="#5b21b6" fontSize="12">• Power BI Dashboard</text>
          <text x="1275" y="165" textAnchor="middle" fill="#5b21b6" fontSize="12">• Almacenamiento en Blob</text>
          <text x="1275" y="185" textAnchor="middle" fill="#5b21b6" fontSize="12">• Machine Learning</text>
          <text x="1275" y="205" textAnchor="middle" fill="#5b21b6" fontSize="12">• Web App / Mobile App</text> {/* Agregado */}
        </g>
         
        {/* Etiquetas en las conexiones (manual) */}
        <g fontSize="12" fill="#4b5563" fontWeight="semibold">
             <text x="380" y="200" textAnchor="middle">Datos Sensores</text>
             <text x="380" y="400" textAnchor="middle">Datos Sensores</text>
             <text x="850" y="280" textAnchor="middle">Comando Riego</text>
             <text x="1170" y="400" textAnchor="middle">Control Potencia</text> {/* Rotada */}
             <text x="1050" y="150" textAnchor="middle">Datos a la Nube</text>
        </g>


        {/* Leyenda Visual */}
        <g transform="translate(50, 550)">
          <rect x="0" y="0" width="1400" height="80" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
          <text x="30" y="30" fill="#64748b" fontSize="14" fontWeight="bold">Leyenda:</text>

          <circle cx="180" cy="25" r="6" fill="#3b82f6" />
          <text x="195" y="30" fill="#64748b" fontSize="12">Sensores (Input)</text>

          <circle cx="400" cy="25" r="6" fill="#d97706" />
          <text x="415" y="30" fill="#64748b" fontSize="12">Controlador</text>
           
          <circle cx="600" cy="25" r="6" fill="#e11d48" />
          <text x="615" y="30" fill="#64748b" fontSize="12">Relé (Actuador)</text>

          <circle cx="800" cy="25" r="6" fill="#10b981" />
          <text x="815" y="30" fill="#64748b" fontSize="12">Bomba (Actuador)</text>

          <circle cx="1000" cy="25" r="6" fill="#8b5cf6" />
          <text x="1015" y="30" fill="#64748b" fontSize="12">Nube (Análisis/Almacenamiento)</text>
          
          <circle cx="180" cy="55" r="6" fill="#4b5563" />
          <text x="195" y="60" fill="#64748b" fontSize="12">Flecha indica dirección del flujo</text>
           
           <rect x="400" y="50" width="20" height="10" fill="none" stroke="#4b5563" strokeWidth="2" strokeDasharray="5,5"/>
           <text x="425" y="60" fill="#64748b" fontSize="12">Línea punteada indica conexión</text>
        </g>

         {/* Etiqueta principal de grupo */}
         <text x="220" y="80" textAnchor="middle" fill="#4a5568" fontSize="14" fontWeight="bold">Entrada de Datos</text>
         <text x="625" y="230" textAnchor="middle" fill="#4a5568" fontSize="14" fontWeight="bold">Procesamiento</text>
         <text x="1150" y="420" textAnchor="middle" fill="#4a5568" fontSize="14" fontWeight="bold">Actuación</text>
         <text x="1275" y="20" textAnchor="middle" fill="#4a5568" fontSize="14" fontWeight="bold">Cloud Services</text>

      </svg>
    </div>
  );
}