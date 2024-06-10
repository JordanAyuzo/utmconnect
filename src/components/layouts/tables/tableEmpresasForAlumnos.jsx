import React, { useEffect, useState } from "react";
import { getVacanteForAlumnos } from "@/services/vacantes/vacanteService";
import { applicantToCompany } from "@/services/alumnos/alumnoService";
import { getVacanteRecomendadas } from "@/services/alumnos/alumnoService"
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";




function TableEmpresasForAlumnos({tipoVacante} ) {
  const [vacantes, setVacantes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vacantesPerPage = 5;
  const vacantesPerPage = 4;
  let error = null;
  const userNumber = sessionStorage.getItem("userNumber")
  if(tipoVacante === 1){
    useEffect(() => {
      getVacanteForAlumnos().then((res) => {
        setVacantes(res);
      });
    }, []);

  }else{
    //try catch para evitar error de vacantes 

    useEffect(() => {
      const fetchVacantes = async () => {
        try {
          const res = await getVacanteRecomendadas(userNumber);
          setVacantes(res);
        } catch (err) {
           error = true || 'Ocurrió un error al obtener las vacantes.';
          setError('No se pudo encontrar al estudiante.');
        }
      };
  
      fetchVacantes();
    }, [userNumber]);
  }


  const indexOfLastVacante = currentPage * vacantesPerPage;
  const indexOfFirstVacante = indexOfLastVacante - vacantesPerPage;
  const currentVacantes = vacantes.slice(indexOfFirstVacante, indexOfLastVacante);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const applyToCompany = async (matricula, offerID) => {
    try {
      const response = await applicantToCompany(matricula, offerID);
      if (response.message) {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error al aplicar a la vacante:", error);
      alert("Error al aplicar a la vacante");
    }
  }

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
        Lista de vacantes
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Salario</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentVacantes.map((vacante) => (
            <TableRow key={vacante.offer_id}>
              <TableCell>{vacante.offer_id}</TableCell>
              <TableCell>{vacante.empresa_rfc}</TableCell>
              <TableCell>{vacante.offer_description}</TableCell>
              <TableCell>{vacante.offer_address}</TableCell>
              <TableCell>{vacante.offer_price}</TableCell>
              <TableCell className="text-center">
                <Button
                  onClick={() => {
                    const matricula = Number(sessionStorage.getItem('matricula'));
                    const offerID = Number(vacante.offer_id);
                    if (!isNaN(matricula) && !isNaN(offerID)) {
                      applyToCompany(matricula, offerID)
                    } else {
                      alert("Error: matricula u offerID no son válidos.")
                    }
                  }}
                >
                  Aplicar
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