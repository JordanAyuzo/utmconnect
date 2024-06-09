import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getAlumnos } from "@/services/alumnos/alumnoService";
import React, { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from  "@/components/ui/alert-dialog";

function TableAlumnosApplicant() {
  const [alumnos, setAlumnos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const alumnosPerPage = 4;

  useEffect(() => {
    getAlumnos().then((res) => {
      setAlumnos(res);
    });
  }, []);

  const indexOfLastAlumno = currentPage * alumnosPerPage;
  const indexOfFirstAlumno = indexOfLastAlumno - alumnosPerPage;
  const currentAlumnos = alumnos.slice(indexOfFirstAlumno, indexOfLastAlumno);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <TableHead>Carrera</TableHead>
            <TableHead>Grupo</TableHead>
            <TableHead>Semestre</TableHead>
            <TableHead>CURP</TableHead>
            <TableHead>Matricula</TableHead>
            <TableHead className="text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentAlumnos.map((nombre) => (
            <TableRow key={nombre.user.name}>
              <TableCell className="font-medium">{nombre.user.name}</TableCell>
              <TableCell>{nombre.carrera}</TableCell>
              <TableCell>{nombre.grupo}</TableCell>
              <TableCell>{nombre.semestre}</TableCell>
              <TableCell>{nombre.curp}</TableCell>
              <TableCell>{nombre.matricula}</TableCell>
              <TableCell className="text-center">
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="mr-2"
                        variant="secondary"
                        // onClick={() => handleEdit(alumno)}
                      >
                        Ver Información
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="flex flex-col items-center bg-white rounded-lg shadow-xl">
                      <AlertDialogHeader className="w-full p-4">
                        <AlertDialogTitle className="text-center text-xl font-semibold">
                          Información del alumno
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-sm mb-4">
                          Esta es la información del alumno que desea hacer el servicio social o las estancias profesionales en su empresa.
                        </AlertDialogDescription>
                        <div className="flex flex-col space-y-4">
                          <div className="flex space-x-2">
                            <p className="font-semibold">Nombre:</p>
                            <p>{nombre.user.name}</p>
                          </div>
                          <div className="flex space-x-2">
                            <p className="font-semibold">Carrera:</p>
                            <p>{nombre.carrera}</p>
                          </div>
                          <div className="flex space-x-2">
                            <p className="font-semibold">CV:</p>
                            <a href={nombre.cv_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline">{nombre.cv_link}</a>
                          </div>
                          <div className="flex space-x-2">
                            <p className="font-semibold">Habilidades:</p>
                            <ul className="list-disc list-inside">
                              {nombre.habilidades.map((habilidad, index) => (
                                <li key={index} className="text-blue-500 bg-blue-100 rounded p-1 my-1">{habilidad}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex justify-center p-4">
                        <AlertDialogCancel className="mr-2">
                          Cerrar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="ml-2"
                          // onClick={handleSave}
                        >
                          Continuar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    className="mr-2"
                    variant="destructive"
                    // onClick={() => handleStatusChange(empresa.rfc, "2")}
                  >
                    Rechazar
                  </Button>
                  <Button
                    className="mr-2"
                    // onClick={() => handleStatusChange(empresa.rfc, "1")}
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

export default TableAlumnosApplicant;