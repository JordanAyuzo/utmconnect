import {useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from  "@/components/ui/alert-dialog";
import { getVacante } from "@/services/vacantes/vacanteService";
import { eliminarVacante } from '@/services/vacantes/vacanteService';
import { obtenerUsuario } from '@/services/usuario/usuarioService';
import { updateOffer } from '@/services/vacantes/vacanteService';
import { obtenerVacante } from '@/services/vacantes/vacanteService';

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

function TableOfertasEmpresa() {
    const [vacantes, setVacantes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const vacantePerPage = 5;

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState({
        userNumber: 0,
        offerId: 0,
        empresaRFC: '',
        offerName: '',
        offerDescription: '',
        offerPrice: 0,
        offerWM: '',
        offerAddress: '',
        offerResponsabilities: [],
        startDate: '',
        endDate: '',
    });

    const handleSaveChanges = async () => {
        try {
            await updateOffer(userData.offerId, userData);
            // Actualizar la lista de vacantes después de la edición
            fetchAndFilterVacantes();
            // Reiniciar los datos de usuario después de guardar los cambios
            setUserData({
                offerId: 0,
                empresaRFC: '',
                offerName: '',
                offerDescription: '',
                offerPrice: 0,
                offerWM: '',
                offerAddress: '',
                offerResponsabilities: [],
                startDate: '',
                endDate: '',
            });
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
            // Manejar el error según sea necesario
        }
    };

    const fetchAndFilterVacantes = async () => {
        const userNumber = sessionStorage.getItem("userNumber");
        if (userNumber) {
            try {
                const data = await obtenerUsuario(userNumber);
                if (data) {
                    setUserData({
                        userNumber: data.user_number,
                    });
                    const vacantes = await getVacante();
                    const filteredVacantes = vacantes.filter(vacante => vacante.empresa_rfc === data.user_number);
                    setVacantes(filteredVacantes);
                }
            } catch (error) {
                console.error("Error fetching and filtering vacantes:", error);
                // Manejar el error según sea necesario
            }
        }
    };

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
                    startDate: data.offer_start_date.split('T')[0],
                    endDate: data.offer_end_date.split('T')[0],
                });
            }
        } catch (error) {
            console.error("Error al obtener la vacante:", error);
            // Manejar el error según sea necesario
        }
    };

    useEffect(() => {
    const fetchData = async () => {
        try {
            fetchAndFilterVacantes();
        } catch (error) {
            console.error("Error fetching vacantes:", error);
        }
    };

    fetchData();
    }, []);

    const indexOfLastVacante = currentPage * vacantePerPage;
    const indexOfFirstVacante = indexOfLastVacante - vacantePerPage;
    const currentVacantes = vacantes.slice(
        indexOfFirstVacante,
        indexOfLastVacante
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEliminarVacante = async (id) => {
        try {
            // Eliminar la vacante
            await eliminarVacante(id);
            fetchAndFilterVacantes();
        } catch (error) {
            console.error("Error al eliminar la vacante:", error);
            // Manejar el error según sea necesario
        }
    };

    return (
        <div>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead className="text-center">RFC</TableHead>
                <TableHead className="text-center">Vacante</TableHead>
                <TableHead className="text-center">Remuneración</TableHead>
                <TableHead className="text-center">Fecha de apertura</TableHead>
                <TableHead className="text-center">Fecha de vencimiento</TableHead>
                <TableHead className="text-center">Modalidad</TableHead>
                <TableHead className="text-center">Dirección</TableHead>
                <TableHead className="text-center">Acción</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {currentVacantes.map((vacante) => (
                <TableRow key={vacante.id}>
                <TableCell className="font-medium">{vacante.empresa_rfc}</TableCell>
                <TableCell>{vacante.offer_name}</TableCell>
                <TableCell>{vacante.offer_price}</TableCell>
                <TableCell>{vacante.offer_start_date.split('T')[0]}</TableCell>
                <TableCell>{vacante.offer_end_date.split('T')[0]}</TableCell>
                <TableCell>{vacante.offer_work_mode}</TableCell>
                <TableCell>{vacante.offer_address}</TableCell>
                <TableCell className="text-right">
                    <div className="flex space-x-2">
                    <AlertDialog >
                        <AlertDialogTrigger asChild>
                        <Button
                            variant="secondary"
                            className="mr-2"
                            onClick={() => handleEditarVacante(vacante.offer_id)}
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
                        <Card>
                            <CardContent>
                                <div className="flex justify-center items-center">
                                            <Card className="border border-gray-400 w-[1000px] mt-4">
                                                <CardContent >
                                                    <form >
                                                        <div className="grid grid-cols-2 items-start gap-6">
                                                            <div className=" flex flex-col text-left space-y-2">
                                                            <Label htmlFor="offer_id">Vacante:</Label>
                                                            <Input className="border border-gray-400" id="offer_id" placeholder="Ingresa el RFC de la empresa" value={userData.offerId}/>
                                                            <Label htmlFor="offer_name">Nombre de la vacante:</Label>
                                                            <Input className="border border-gray-400" id="offer_name" placeholder="Ingresa el nombre de la vacante" value={userData.offerName} onChange={(e) => setUserData({ ...userData, offerName: e.target.value })}/>                                    
                                                            <Label htmlFor="offer_price">Remuneración:</Label>
                                                            <Input className="border border-gray-400" id="offer_price" placeholder="Ingresa la remuneración de la vacante" value={userData.offerPrice} onChange={(e) => setUserData({ ...userData, offerPrice: e.target.value })}/>
                                                            <Label htmlFor="offer_address">Dirección:</Label>
                                                            <Input className="border border-gray-400" id="offer_address" placeholder="Ingresa la remuneración de la vacante" value={userData.offerAddress} onChange={(e) => setUserData({ ...userData, offerAddress: e.target.value })}/>
                                                            <Select>
                                                            <Label htmlFor="offer_work_mode">Modalidad:</Label>
                                                                <SelectTrigger className="w-[460px] border border-gray-400">
                                                                    <SelectValue id="offer_work_mode" placeholder="Selecciona la modalidad de tu preferencias" value={userData.offerWM}/>
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                    <SelectLabel>Modalidad de la vacante</SelectLabel>
                                                                    <SelectItem value="home_office">Home_office</SelectItem>
                                                                    <SelectItem value="on_site">On_site</SelectItem>
                                                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className='space-y-2 text-left grid w-full items-center'>
                                                            <Label htmlFor="acces_date1">Fecha de apertura:</Label>
                                                            <Input className="border border-gray-400" id="acces_date1" value={userData.startDate} onChange={(e) => setUserData({ ...userData, startDate: e.target.value })}/>
                                                            <Label htmlFor="acces_date2">Fecha de apertura:</Label>
                                                            <Input className="border border-gray-400" id="acces_date2" placeholder="Ingresa la fecha vencimiento" value={userData.endDate} onChange={(e) => setUserData({ ...userData, endDate: e.target.value })}/>
                                                            <Label htmlFor="offer_description">Descripción de la vacante:</Label>
                                                            <Textarea className="w-[460px] border border-gray-400" id="offer_description" placeholder="Ingresa la descripción de la vacante." value={userData.offerDescription} onChange={(e) => setUserData({ ...userData, offerDescription: e.target.value })}/>
                                                            <Label htmlFor="offer_responsabilities">Responsabilidades de la vacante:</Label>
                                                            <Textarea className="w-[460px] border border-gray-400" id="offer_responsabilities" placeholder="Ingresa la descripción de la vacante." value={userData.offerResponsabilities} onChange={(e) => setUserData({ ...userData, offerResponsabilities: e.target.value })}/>
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
                            <AlertDialogAction onClick={handleSaveChanges}>Guardar cambios</AlertDialogAction>
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
                                    vacante y eliminará sus datos de nuestros servidores.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleEliminarVacante(vacante.offer_id)}>Continuar</AlertDialogAction>
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
            {[...Array(Math.ceil(vacantes.length / vacantePerPage)).keys()].map(
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
                currentPage === Math.ceil(vacantes.length / vacantePerPage)
                }
            >
                <PaginationLink
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    if (
                    currentPage < Math.ceil(vacantes.length / vacantePerPage)
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

export default TableOfertasEmpresa