import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getAdministrador } from "@/services/administrador/administradorService";
import { eliminarAdmins } from "@/services/administrador/administradorService";
import React, { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from  "@/components/ui/alert-dialog";


function TableAdministrador() {
  const [administrador, setAdministrador] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const administradorPerPage = 4;

  useEffect(() => {
    getAdministrador().then((res) => {
      const filteredAdministrador = res.filter((admin) => admin.user_type === '0');
      setAdministrador(filteredAdministrador);
    });
  }, []);

  const handleEliminarAdmin = async (id) => {
    try {
        await eliminarAdmins(id);
        const updatedAdministradores = await getAdministrador();
        const filteredAdministrador = updatedAdministradores.filter((admin) => admin.user_type === '0');
        setAdministrador(filteredAdministrador);

    } catch (error) {
        console.error("Error al eliminar administrador:", error);
    }
};

  const indexOfLastAdministrador = currentPage * administradorPerPage;
  const indexOfFirstAdministrador = indexOfLastAdministrador - administradorPerPage;
  const currentAdministrador = administrador.slice(indexOfFirstAdministrador, indexOfLastAdministrador);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
        Lista de administradores
      </h2>
      <Table className="border border-gray-400">
        <TableHeader>
          <TableRow className="border border-gray-400">
          <TableHead className="text-center">Número de trabajador</TableHead>
            <TableHead className="text-center">Nombre</TableHead>
            <TableHead className="text-center">A. paterno</TableHead>
            <TableHead className="text-center">A. materno</TableHead>
            <TableHead className="text-center">Correo electrónico</TableHead>
            <TableHead className="text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentAdministrador.map((customers) => (
            <TableRow key={customers.name} className="border border-gray-400">
              <TableCell className="font-medium">{customers.user_number}</TableCell>
              <TableCell className="font-medium">{customers.name}</TableCell>
              <TableCell className="font-medium">{customers.paternal_sn}</TableCell>
              <TableCell className="font-medium">{customers.maternal_sn}</TableCell>
              <TableCell>{customers.email}</TableCell>
              <TableCell className="text-center">
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
                                <AlertDialogAction onClick={() => handleEliminarAdmin(customers.user_number)}>Continuar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
          {[...Array(Math.ceil(administrador.length / administradorPerPage)).keys()].map(
            (num) => (
              <PaginationItem key={num}>
                <PaginationLink href="#" onClick={() => paginate(num + 1)}>
                  {num + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem disabled={currentPage === Math.ceil(administrador.length / administradorPerPage)}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < Math.ceil(administrador.length / administradorPerPage)) {
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
  );
}

export default TableAdministrador;