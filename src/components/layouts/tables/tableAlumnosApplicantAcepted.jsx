import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getAlumnos, getAlumnosByCompany, changeAlumnosByCompanyStatus } from "@/services/alumnos/alumnoService";
import React, { useEffect, useState } from "react";

function TableAlumnosApplicantAcepted() {
  const [alumnos, setAlumnos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const alumnosPerPage = 4;

  useEffect(() => {
    const rfc = sessionStorage.getItem('rfc');
    getAlumnosByCompany(rfc, "1").then((response) => {
      setAlumnos(response.applicants);
    });
  }, []);

  const indexOfLastAlumno = currentPage * alumnosPerPage;
  const indexOfFirstAlumno = indexOfLastAlumno - alumnosPerPage;
  const currentAlumnos = alumnos.slice(indexOfFirstAlumno, indexOfLastAlumno);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
  }

  const handleStatusChange = (idApplicant, status) => {
    changeAlumnosByCompanyStatus(idApplicant, status).then(() => {
      const rfc = sessionStorage.getItem('rfc');
      getAlumnosByCompany(rfc).then((response) => {
        setAlumnos(response.applicants);
      });
    });
  }

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
        Lista de alumnos postulantes
      </h2>
      <Table>
        {/* <TableCaption>Una lista de los alumnos.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead>Matricula</TableHead>
            <TableHead>CV</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentAlumnos.map((nombre) => (
            <TableRow key={nombre.user_name}>
              <TableCell className="font-medium">{nombre.user_name} {nombre.user_paternal_sn}</TableCell>
              <TableCell>{nombre.student_matricula}</TableCell>
              <TableCell>{nombre.student_cv_link}</TableCell>
              <TableCell>{nombre.user_email}</TableCell>
              <TableCell>{getStatus(nombre.applicant_status)}</TableCell>
              <TableCell className="text-center">
                <div>
                  <Button
                    className="mr-2"
                    variant="destructive"
                    onClick={() => handleStatusChange(nombre.applicant_applicant_id, "2")}
                  >
                    Finalizar
                  </Button>
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
          {[...Array(Math.ceil(alumnos.length / alumnosPerPage)).keys()].map(
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
              currentPage === Math.ceil(alumnos.length / alumnosPerPage)
            }
          >
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < Math.ceil(alumnos.length / alumnosPerPage)) {
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

export default TableAlumnosApplicantAcepted;