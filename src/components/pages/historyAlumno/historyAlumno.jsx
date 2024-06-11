import {useState, useEffect } from 'react'
import NavbarStud from "@/components/layouts/navbar/navbarStud";
import { Label } from "@/components/ui/label"
import TableHistoryAlumno from '@/components/layouts/tables/tableHistoryAlumno';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from  "@/components/ui/alert-dialog";
import { getHistorialAlumno } from '@/services/applicant/applicant';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { obtenerAlumno } from "@/services/alumnos/alumnoService"; // Importar las

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

    const [userData, setUserData] = useState({
        userNumber: 0,
        Direccion: "",
        Matricula: 0,
    });

    const fetchAndFilterHistory = async () => {
        const userNumber = sessionStorage.getItem("userNumber");
        if (userNumber) {
            try {
                const data = await obtenerAlumno(userNumber);
                if (data) {
                    setUserData({
                        Matricula: data.matricula,
                    });
                    const res = await getHistorialAlumno();
                    // Filtrar el historial donde offer_empresa_rfc sea igual a userNumber
                    const filteredHistorial = res.applicants.filter(historial => historial.student_matricula === data.matricula && historial.applicant_status === "1");
                    setHistorial(filteredHistorial);
                }
            } catch (error) {
                console.error("Error fetching and filtering history:", error);
                // Manejar el error según sea necesario
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchAndFilterHistory();
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };

    fetchData();
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
                <TableHead className="text-center">Nombre de la empresa</TableHead>
                <TableHead className="text-center">Nombre</TableHead>
                <TableHead className="text-center">Apellido paterno</TableHead>
                <TableHead className="text-center">matrícula</TableHead>
                <TableHead className="text-center">email</TableHead>
                <TableHead className="text-center">Fecha</TableHead>
                <TableHead className="text-center">Estatus</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {currentHistorial.map((historial) => (
                <TableRow key={historial.applicant_applicant_id}>
                <TableCell className="font-medium">{historial.company_user_name}</TableCell>
                <TableCell>{historial.user_name}</TableCell>
                <TableCell>{historial.user_paternal_sn}</TableCell>
                <TableCell>{historial.student_matricula}</TableCell>
                <TableCell>{historial.user_email}</TableCell>
                <TableCell>{historial.applicant_createdAt.split('T')[0]}</TableCell>
                <TableCell>{getStatusText(historial.applicant_status)}</TableCell>
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
            0: <span style={{ color: "blue" }}>Pendiente</span>,
            1: <span style={{ color: "green" }}>Aceptado</span>,
            2: <span style={{ color: "red" }}>Rechazado</span>
    };

    return statusMap[statusNumber] || "Desconocido";
}

export default HistoryAlumno