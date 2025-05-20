'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Droplet, Thermometer, Eye, Edit, Trash2, TreePine } from "lucide-react";
import Link from "next/link";

// Mock data for fields - replace with actual data fetching
const fields = [
  { id: "f1", name: "Parcela A", crop: "Tomates", status: "active", lastIrrigation: "Hace 3 horas", humidity: 60, temperature: 23 },
  { id: "f2", name: "Campo Norte", crop: "Lechugas", status: "inactive", lastIrrigation: "Ayer 18:00", humidity: 75, temperature: 21 },
  { id: "f3", name: "Invernadero 1", crop: "Pimientos", status: "warning", lastIrrigation: "Hace 8 horas", humidity: 45, temperature: 25 },
  { id: "f4", name: "Parcela Sur B", crop: "Maíz", status: "active", lastIrrigation: "Hoy 06:00", humidity: 70, temperature: 22 },
];

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
        case 'active': return 'default'; // Use primary color (green)
        case 'inactive': return 'secondary';
        case 'warning': return 'destructive'; // Use destructive (red) for warning
        default: return 'outline';
    }
}

function getStatusText(status: string): string {
    switch (status) {
        case 'active': return 'Activo';
        case 'inactive': return 'Inactivo';
        case 'warning': return 'Alerta';
        default: return 'Desconocido';
    }
}

export default function FieldsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <TreePine className="h-7 w-7"/> Gestión de Campos
            </h2>
            <p className="text-gray-600">Visualiza y gestiona tus parcelas o cultivos de manera eficiente.</p>
          </div>
        </div>

        {/* Fields Table */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Mis Campos Registrados</CardTitle>
              <CardDescription>Visualiza y gestiona tus parcelas o cultivos.</CardDescription>
            </div>
            <Button size="lg" className="text-lg" asChild>
              <Link href="/fields/new">
                <PlusCircle className="mr-2 h-6 w-6" /> Añadir Nuevo Campo
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="hidden md:table-cell">Cultivo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="hidden lg:table-cell">Último Riego</TableHead>
                  <TableHead className="text-center"><Droplet className="inline-block h-5 w-5" /></TableHead>
                  <TableHead className="text-center hidden sm:table-cell"><Thermometer className="inline-block h-5 w-5" /></TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field) => (
                  <TableRow key={field.id}>
                    <TableCell className="font-medium">{field.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{field.crop}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(field.status)} className="text-sm">
                        {getStatusText(field.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{field.lastIrrigation}</TableCell>
                    <TableCell className="text-center">{field.humidity}%</TableCell>
                    <TableCell className="text-center hidden sm:table-cell">{field.temperature}°C</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1 md:gap-2">
                        <Button variant="ghost" size="icon" title="Ver Detalles e Historial" asChild>
                          <Link href={`/fields/${field.id}`}>
                            <Eye className="h-5 w-5" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" title="Editar" className="text-blue-600 hover:text-blue-800" asChild>
                          <Link href={`/fields/${field.id}/edit`}>
                            <Edit className="h-5 w-5" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" title="Eliminar" className="text-destructive hover:text-red-700">
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end">
            <p className="text-sm text-muted-foreground">Total de campos: {fields.length}</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
