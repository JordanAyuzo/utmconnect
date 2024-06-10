import {useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from  "@/components/ui/alert-dialog";
import { getHistorialAlumno } from '@/services/applicant/applicant';
import { obtenerHistorialAlumno, eliminarHistorialAlumno, updateHistorialAlumno } from '@/services/applicant/applicant';
import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function TableHistoryAlumno() {
    const [historial, setHistorial] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const historyPerPage = 5;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastHistory = currentPage * historyPerPage;
    const indexOfFirstHistory = indexOfLastHistory - historyPerPage;
    const currentHistorial = historial.slice(indexOfFirstHistory, indexOfLastHistory);

    useEffect(() => {
        getHistorialAlumno().then((res) => {
            setHistorial(res.applicants);
        });
    }, []);

    const handleEliminarHistorial = async (id) => {
        try {
            // Eliminar el historial del alumno
            const response = await eliminarHistorialAlumno(id);
            console.log("Respuesta de eliminarHistorialAlumno:", response);
            
            // Actualizar el estado eliminando el historial del alumno eliminado
            setHistorial(prevHistorial => prevHistorial.filter(item => item.applicant_id !== id));
        } catch (error) {
            console.error("Error al eliminar el historial del alumno:", error);
            // Manejar el error según sea necesario
        }
    };    

  return (
    <div>
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
                <tableHead className="text-center">Acción</tableHead>
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
                <TableCell className="text-right">
                    <div className="flex space-x-2">
                    <AlertDialog >
                        <AlertDialogTrigger asChild>
                        <Button
                            variant="secondary"
                            className="mr-2"
                        >
                            Editar
                        </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="flex flex-col items-center w-full">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-center">
                            Información de la vacante
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex justify-center">
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction >Correcto</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Eliminar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-md"> {/* Cambiado a max-w-md */}
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Esto eliminará permanentemente la
                                    vacante a la que te has postulado y eliminará sus datos de nuestros servidores.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleEliminarHistorial(historial.applicant_applicant_id)}>Continuar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    </div>
                </TableCell>
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

export default TableHistoryAlumno