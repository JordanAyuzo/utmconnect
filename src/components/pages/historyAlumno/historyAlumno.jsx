import {useState, useEffect } from 'react'
import NavbarStud from "@/components/layouts/navbar/navbarStud";
import { Label } from "@/components/ui/label"
import TableHistoryAlumno from '@/components/layouts/tables/tableHistoryAlumno';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from  "@/components/ui/alert-dialog";
import { getHistorialAlumno } from '@/services/applicant/applicant';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

function HistoryAlumno() {
  const [historial, setHistorial] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const historyPerPage = 5;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastHistory = currentPage * historyPerPage;
    const indexOfFirstHistory = indexOfLastHistory - historyPerPage;
    const currentHistorial = historial.slice(indexOfFirstHistory, indexOfLastHistory);

    useEffect(() => {
      getHistorialAlumno().then((res) => {
          // Filtrar el historial por estatus "Aceptado" (valor 0)
          const historialFiltrado = res.applicants.filter((item) => item.applicant_status === "1");
          setHistorial(historialFiltrado);
      });
  }, []);

  return (
    <div>
      <NavbarStud />
      <Tabs defaultValue="register" className="max-w-full mx-auto p-4">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="register">Solicitudes aprobadas</TabsTrigger>
                    <TabsTrigger value="delete">Solicitudes enviadas</TabsTrigger>
                </TabsList>
                <TabsContent value="register" className="flex justify-center">
                    <Card className="w-full mx-auto m-4 ring-gray-100 ring-1 ring-opacity-20 shadow-2xl">
                    <CardHeader>
                      <CardTitle>Lista de solicitudes aprobadas para Estancias Profesionales y Servicio Social</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 flex justify-center">
                      <div className="space-y-1 w-full">
                      <Table>
            <TableHeader>
            <TableRow>
                <TableHead className="text-center">Oferta</TableHead>
                <TableHead className="text-center">RFC de empresa</TableHead>
                <TableHead className="text-center">Nombre</TableHead>
                <TableHead className="text-center">Apellido paterno</TableHead>
                <TableHead className="text-center">matrícula</TableHead>
                <TableHead className="text-center">Estatus</TableHead>
                <TableHead className="text-center">email</TableHead>
                <TableHead className="text-center">Fecha</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {currentHistorial.map((historial) => (
                <TableRow key={historial.applicant_offer_id}>
                <TableCell className="font-medium">{historial.applicant_offer_id}</TableCell>
                <TableCell>{historial.offer_empresa_rfc}</TableCell>
                <TableCell>{historial.user_name}</TableCell>
                <TableCell>{historial.user_paternal_sn}</TableCell>
                <TableCell>{historial.student_matricula}</TableCell>
                <TableCell>{getStatusText(historial.applicant_status)}</TableCell>
                <TableCell>{historial.user_email}</TableCell>
                <TableCell>{historial.applicant_createdAt}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <Pagination>
            <PaginationContent>
            <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                    paginate(currentPage - 1);
                    }
                }}
                >
                Anterior
                </PaginationLink>
            </PaginationItem>
            {[...Array(Math.ceil(historial.length / historyPerPage)).keys()].map(
                (num) => (
                <PaginationItem key={num}>
                    <PaginationLink href="#" onClick={() => paginate(num + 1)}>
                    {num + 1}
                    </PaginationLink>
                </PaginationItem>
                )
            )}
            <PaginationItem
                disabled={
                currentPage === Math.ceil(historial.length / historyPerPage)
                }
            >
                <PaginationLink
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    if (
                    currentPage < Math.ceil(historial.length / historyPerPage)
                    ) {
                    paginate(currentPage + 1);
                    }
                }}
                >
                Siguiente
                </PaginationLink>
            </PaginationItem>
            </PaginationContent>
        </Pagination>
                      </div>
                    </CardContent>
                    </Card>
                    
                </TabsContent>
                
                <TabsContent value="delete" className="flex justify-center">
                    <Card className=" w-full mx-auto m-4 ring-gray-100 ring-1 ring-opacity-20 shadow-2xl">
                        <CardHeader >
                            <CardTitle>Lista de solicitudes enviadas para Estancias Profesionales y Servicio Social</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 flex justify-center">
                          <div className="space-y-1 w-full">
                            <TableHistoryAlumno />
                          </div>
                          </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
    </div>
  )
}

function getStatusText(statusNumber) {
  const statusMap = {
      0: "Pendiente",
      1: "Aceptado",
      2: "Rechazado"
  };

  return statusMap[statusNumber] || "Desconocido";
}

export default HistoryAlumno