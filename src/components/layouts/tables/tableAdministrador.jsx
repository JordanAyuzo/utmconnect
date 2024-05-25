import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getAdministrador } from "@/services/administrador/administradorService";
import React, { useEffect, useState } from "react";

function TableAdministrador() {
  const [administrador, setAdministrador] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const administradorPerPage = 4;

  useEffect(() => {
    getAdministrador().then((res) => {
      setAdministrador(res);
    });
  }, []);

  const indexOfLastAdministrador = currentPage * administradorPerPage;
  const indexOfFirstAdministrador = indexOfLastAdministrador - administradorPerPage;
  const currentAdministrador = administrador.slice(indexOfFirstAdministrador, indexOfLastAdministrador);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
        Lista de administradores
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nombre completo</TableHead>
            <TableHead>Correo electrónico</TableHead>
            <TableHead>Contraseña</TableHead>
            <TableHead className="text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentAdministrador.map((customers) => (
            <TableRow key={customers.name}>
              <TableCell className="font-medium">{customers.name}</TableCell>
              <TableCell>{customers.email}</TableCell>
              <TableCell>{customers.password}</TableCell>
              <TableCell className="text-center">
                <Button variant="destructive">Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan="5" className="text-right">
              <Button variant="primary">Agregar Administrador</Button>
            </TableCell>
          </TableRow>
        </TableFooter>
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