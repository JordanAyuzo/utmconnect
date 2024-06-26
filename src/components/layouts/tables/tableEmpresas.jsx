import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { getEmpresas, changeStatusEmpresa } from "@/services/empresas/empresaService";

function TableEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const empresasPerPage = 5;

  useEffect(() => {
    getEmpresas().then(setEmpresas);
  }, []);

  const indexOfLastEmpresa = currentPage * empresasPerPage;
  const indexOfFirstEmpresa = indexOfLastEmpresa - empresasPerPage;
  const currentEmpresas = empresas.slice(
    indexOfFirstEmpresa,
    indexOfLastEmpresa
  );

  const getStatus = (status) => {
    switch (status) {
      case "0":
        return "Pendiente";
      case "1":
        return "Aprobado";
      case "2":
        return "Rechazado";
      default:
        return "Desconocido";
    }
  };

  // Función para cambiar el estado de la empresa: 0 = pendiente, 1 = aprobado, 2 = rechazado
  const handleStatusChange = (idEmpresa, status) => {
    changeStatusEmpresa(idEmpresa, status).then(() => {
      getEmpresas().then(setEmpresas);
    });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">RFC</TableHead>
            <TableHead>Dirreción</TableHead>
            <TableHead>Giro</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Jefe Inmediato</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentEmpresas.map((empresa) => (
            <TableRow key={empresa.rfc}>
              <TableCell className="font-medium">{empresa.rfc}</TableCell>
              <TableCell>{empresa.direccion}</TableCell>
              <TableCell>{empresa.giro}</TableCell>
              <TableCell>{empresa.descripcion}</TableCell>
              <TableCell>{empresa.jefe_inmediato}</TableCell>
              <TableCell>{empresa.departamento}</TableCell>
              <TableCell>{getStatus(empresa.status)}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="destructive"
                  onClick={() => handleStatusChange(empresa.rfc, "2")}
                >
                  Dar de baja
                </Button>
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
          {[...Array(Math.ceil(empresas.length / empresasPerPage)).keys()].map(
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
              currentPage === Math.ceil(empresas.length / empresasPerPage)
            }
          >
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (
                  currentPage < Math.ceil(empresas.length / empresasPerPage)
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

export default TableEmpresas;