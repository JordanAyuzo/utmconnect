import React, { useEffect, useState } from "react";
import { getVacanteForAlumnos } from "@/services/vacantes/vacanteService";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

function TableEmpresasForAlumnos() {
  const [vacantes, setVacantes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vacantesPerPage = 5;

  useEffect(() => {
    getVacanteForAlumnos().then((res) => {
      setVacantes(res);
    });
  }, []);

  const indexOfLastVacante = currentPage * vacantesPerPage;
  const indexOfFirstVacante = indexOfLastVacante - vacantesPerPage;
  const currentVacantes = vacantes.slice(indexOfFirstVacante, indexOfLastVacante);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
        Lista de vacantes
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Salario</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentVacantes.map((vacante) => (
            <TableRow key={vacante.empresa_rfc}>
              <TableCell>{vacante.empresa_rfc}</TableCell>
              <TableCell>{vacante.offer_description}</TableCell>
              <TableCell>{vacante.offer_address}</TableCell>
              <TableCell>{vacante.offer_price}</TableCell>
              <TableCell className="text-center">
                <Button>Ver</Button>
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
          {[...Array(Math.ceil(vacantes.length / vacantesPerPage)).keys()].map(
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
              currentPage === Math.ceil(vacantes.length / vacantesPerPage)
            }
          >
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (
                  currentPage < Math.ceil(vacantes.length / vacantesPerPage)
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
  );
}

export default TableEmpresasForAlumnos;