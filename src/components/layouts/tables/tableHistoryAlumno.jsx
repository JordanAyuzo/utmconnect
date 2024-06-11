import {useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from  "@/components/ui/alert-dialog";
import { getHistorialAlumno } from '@/services/applicant/applicant';
import { obtenerHistorialAlumno, eliminarHistorialAlumno, updateHistorialAlumno } from '@/services/applicant/applicant';
import { obtenerVacante } from '@/services/vacantes/vacanteService';
import { obtenerUsuario } from '@/services/usuario/usuarioService';
import { obtenerAlumno } from "@/services/alumnos/alumnoService"; // Importar las

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

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
                    const filteredHistorial = res.applicants.filter(historial => historial.student_matricula === data.matricula);
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

    const handleEditarVacante = async (offerId) => {
        try {
            const data = await obtenerVacante(offerId);
            if (data) {
                setUserData({
                    offerId: data.offer_id,
                    empresaRFC: data.empresa_rfc,
                    offerName: data.offer_name,
                    offerDescription: data.offer_description,
                    offerPrice: data.offer_price,
                    offerWM: data.offer_work_mode,
                    offerAddress: data.offer_address,
                    offerResponsabilities: data.offer_responsabilities,
                    startDate: data.offer_start_date,
                    endDate: data.offer_end_date,
                });
            }
        } catch (error) {
            console.error("Error al obtener la vacante:", error);
            // Manejar el error según sea necesario
        }
    };

    const handleEliminarHistorial = async (id) => {
        try {
            // Eliminar el historial del alumno
            const response = await eliminarHistorialAlumno(id);
            console.log("Respuesta de eliminarHistorialAlumno:", response);
            fetchAndFilterHistory();
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
                <TableHead className="text-center">Nombre de la empresa</TableHead>
                <TableHead className="text-center">Nombre</TableHead>
                <TableHead className="text-center">Apellido paterno</TableHead>
                <TableHead className="text-center">matrícula</TableHead>
                <TableHead className="text-center">email</TableHead>
                <TableHead className="text-center">Fecha</TableHead>
                <TableHead className="text-center">Estatus</TableHead>
                <tableHead className="text-center">Acción</tableHead>
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
                <TableCell className="text-right">
                    <div className="flex space-x-2">
                    <AlertDialog >
                        <AlertDialogTrigger asChild>
                        <Button
                            variant="secondary"
                            className="mr-2"
                            onClick={() => handleEditarVacante(historial.applicant_offer_id)}
                        >
                            Ver
                        </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="flex flex-col items-center w-full">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-center">
                            Información de la vacante
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <Card>
                            <CardContent>
                                <div className="flex justify-center items-center">
                                            <Card className="border border-gray-400 w-[1000px] mt-4">
                                                <CardContent >
                                                    <form >
                                                        <div className="grid grid-cols-2 items-start gap-6">
                                                            <div className=" flex flex-col text-left space-y-2">
                                                            <Label htmlFor="offer_id">Empresa:</Label>
                                                            <Input className="border border-gray-400" id="offer_id" placeholder="RFC de la empresa" value={userData.empresaRFC}/>
                                                            <Label htmlFor="offer_name">Nombre de la vacante:</Label>
                                                            <Input className="border border-gray-400" id="offer_name" placeholder="Nombre de la vacante" value={userData.offerName} onChange={(e) => setUserData({ ...userData, offerName: e.target.value })}/>                                    
                                                            <Label htmlFor="offer_price">Remuneración:</Label>
                                                            <Input className="border border-gray-400" id="offer_price" placeholder="Remuneración de la vacante" value={userData.offerPrice} onChange={(e) => setUserData({ ...userData, offerPrice: e.target.value })}/>
                                                            <Label htmlFor="offer_address">Dirección:</Label>
                                                            <Input className="border border-gray-400" id="offer_address" placeholder="Dirección de la vacante" value={userData.offerAddress} onChange={(e) => setUserData({ ...userData, offerAddress: e.target.value })}/>
                                                            <Label htmlFor="offer_work_mode">Modalidad:</Label>
                                                            <Input className="border border-gray-400" id="offer_address" placeholder="Modalidad de la vacante" value={getWorkModeText(userData.offerWM)} onChange={(e) => setUserData({ ...userData, offerAddress: e.target.value })}/>
                                                            </div>
                                                            <div className='space-y-2 text-left grid w-full items-center'>
                                                            <Label htmlFor="acces_date1">Fecha de apertura:</Label>
                                                            <Input className="border border-gray-400" id="acces_date1" value={userData.startDate} onChange={(e) => setUserData({ ...userData, startDate: e.target.value })}/>
                                                            <Label htmlFor="acces_date2">Fecha de apertura:</Label>
                                                            <Input className="border border-gray-400" id="acces_date2" value={userData.endDate} onChange={(e) => setUserData({ ...userData, endDate: e.target.value })}/>
                                                            <Label htmlFor="offer_description">Descripción de la vacante:</Label>
                                                            <Textarea className="w-[460px] border border-gray-400" id="offer_description" placeholder="Descripción de la vacante." value={userData.offerDescription} onChange={(e) => setUserData({ ...userData, offerDescription: e.target.value })}/>
                                                            <Label htmlFor="offer_responsabilities">Responsabilidades de la vacante:</Label>
                                                            <Textarea className="w-[460px] border border-gray-400" id="offer_responsabilities" placeholder="Responsabilidades de la vacante." value={userData.offerResponsabilities} onChange={(e) => setUserData({ ...userData, offerResponsabilities: e.target.value })}/>
                                                            </div>
                                                        </div>
                                                        {error && <div className="text-red-500">{error}</div>}
                                                    </form>
                                                </CardContent>
                                            </Card>
                                    </div>
                            </CardContent>
                        </Card>

                        <AlertDialogFooter className="flex justify-center">
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction >Correcto</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Cancelar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-md"> {/* Cambiado a max-w-md */}
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                                <AlertDialogDescription style={{ textAlign: 'justify' }}>
                                    Esta acción no se puede deshacer. Esto cancelará permanentemente la vacante a la que se ha postulado y eliminará sus datos de postulación de nuestros servidores.
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
        0: <span style={{ color: "blue" }}>Pendiente</span>,
        1: <span style={{ color: "green" }}>Aceptado</span>,
        2: <span style={{ color: "red" }}>Rechazado</span>
    };

    return statusMap[statusNumber] || "Desconocido";
}

function getWorkModeText(worWM) {
    const statusMap = {
        'On_site': "Presencial",
        'Home_office': "Remoto",
        'Hybrid': "Híbrido",
    };

    return statusMap[worWM] || "Desconocido";
}

export default TableHistoryAlumno