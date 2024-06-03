import {useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from  "@/components/ui/alert-dialog";
import { getVacante } from "@/services/vacantes/vacanteService";
import { eliminarVacante } from '@/services/vacantes/vacanteService';
import CardUpdateOffer from '@/components/layouts/cards/cardUpdateOffer';


function TableOfertasEmpresa() {
    const [vacantes, setVacantes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const vacantePerPage = 5;


    useEffect(() => {
        getVacante().then(setVacantes);
    }, []);

    const indexOfLastVacante = currentPage * vacantePerPage;
    const indexOfFirstVacante = indexOfLastVacante - vacantePerPage;
    const currentVacantes = vacantes.slice(
        indexOfFirstVacante,
        indexOfLastVacante
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEliminarVacante = async (id) => {
        await eliminarVacante(id); // Acá elimino la vacante
        getVacante().then(setVacantes);
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
                <TableCell>{vacante.offer_start_date}</TableCell>
                <TableCell>{vacante.offer_end_date}</TableCell>
                <TableCell>{vacante.offer_work_mode}</TableCell>
                <TableCell>{vacante.offer_address}</TableCell>
                <TableCell className="text-right">
                    <div className="flex space-x-2">
                    <AlertDialog >
                        <AlertDialogTrigger asChild>
                        <Button
                            variant="secondary"
                            className="mr-2"
                            onClick={() => console.log("Edit")}
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
                        <CardUpdateOffer/>
                        <AlertDialogFooter className="flex justify-center">
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction>Guardar cambios</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                                <Button variant="destructive">Eliminar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estas absolutamente seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Esto eliminará permanentemente la
                                    vacante y eliminar sus datos de nuestros servidores.
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