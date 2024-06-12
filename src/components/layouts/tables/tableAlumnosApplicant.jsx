import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getAlumnos, getAlumnosByCompany, changeAlumnosByCompanyStatus } from "@/services/alumnos/alumnoService";
import React, { useEffect, useState } from "react";

function TableAlumnosApplicant() {
  const [alumnos, setAlumnos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const alumnosPerPage = 4;

  useEffect(() => {
    const rfc = sessionStorage.getItem('rfc');
    getAlumnosByCompany(rfc, "0").then((response) => {
      setAlumnos(response.applicants);
    });
  }, []);

  const indexOfLastAlumno = currentPage * alumnosPerPage;
  const indexOfFirstAlumno = indexOfLastAlumno - alumnosPerPage;
  const currentAlumnos = alumnos.slice(indexOfFirstAlumno, indexOfLastAlumno);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleStatusChange = (idApplicant, status) => {
    changeAlumnosByCompanyStatus(idApplicant, status).then(() => {
      const rfc = sessionStorage.getItem('rfc');
      getAlumnosByCompany(rfc).then((response) => {
        setAlumnos(response.applicants);
      });
    });
  }

  const downloadCV = (cvLink) => {
    window.open(cvLink, '_blank'); // Abre el enlace en una nueva ventana del navegador
  }

  return (
    <div>
      <Table>
        {/* <TableCaption>Una lista de los alumnos.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Nombre</TableHead>
            <TableHead className="text-center">Matricula</TableHead>
            <TableHead className="text-center">CV</TableHead>
            <TableHead className="text-center">Correo</TableHead>
            <TableHead className="text-center">Estado</TableHead>
            <TableHead className="text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentAlumnos.map((nombre) => (
            <TableRow key={nombre.applicant_applicant_id}>
              <TableCell className="font-medium">{nombre.user_name} {nombre.user_paternal_sn}</TableCell>
              <TableCell>{nombre.student_matricula}</TableCell>
              <TableCell>
                <Button variant="outline" style={{color: 'purple'}} onClick={() => downloadCV(nombre.student_cv_link)}>
                  Ver CV
                </Button>
              </TableCell>
              <TableCell>{nombre.user_email}</TableCell>
              <TableCell>{getStatusText(nombre.applicant_status)}</TableCell>
              <TableCell className="text-center">
                <div>
                  <Button
                    className="mr-2"
                    variant="destructive"
                    onClick={() => handleStatusChange(nombre.applicant_applicant_id, "2")}
                  >
                    Rechazar
                  </Button>
                  <Button
                    className="mr-2"
                    onClick={() => handleStatusChange(nombre.applicant_applicant_id, "1")}
                  >
                    Aceptar
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

function getStatusText(statusNumber) {
  const statusMap = {
      0: <span style={{ color: "blue" }}>Pendiente</span>,
      1: <span style={{ color: "green" }}>Aceptado</span>,
      2: <span style={{ color: "red" }}>Rechazado</span>
  };

  return statusMap[statusNumber] || "Desconocido";
}

export default TableAlumnosApplicant;