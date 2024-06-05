import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getAlumnos } from "@/services/alumnos/alumnoService";
import React, { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from  "@/components/ui/alert-dialog";

function TableAlumnos() {
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
        Lista de alumnos
      </h2>
      <Table>
        {/* <TableCaption>Una lista de los alumnos.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead>Carrera</TableHead>
            <TableHead>Grupo</TableHead>
            <TableHead>Matricula</TableHead>
            <TableHead className="text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentAlumnos.map((nombre) => (
            <TableRow key={nombre.name}>
              <TableCell className="font-medium">{nombre.name}</TableCell>
              <TableCell>{nombre.carrera}</TableCell>
              <TableCell>{nombre.grupo}</TableCell>
              <TableCell>{nombre.matricula}</TableCell>
              <TableCell className="text-center">
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="mr-2"
                        onClick={() => console.log("Info")}
                      >
                        Editar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="flex flex-col items-center">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">
                          Editar información
                        </AlertDialogTitle>
                        {/* <img src={empresa.imagen} alt={empresa.nombre} /> */}
                        <AlertDialogDescription className="text-center">
                          Esta sección es para modificar la información del alumno.
                        </AlertDialogDescription>
                        {/* Formulario para modificar la información del alumno */}
                        <label htmlFor="nombre">Nombre:</label>
                          <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            // value={nombre.nombre}
                          />
                          <label htmlFor="carrera">Carrera:</label>
                          <input
                            type="text"
                            id="carrera"
                            name="carrera"
                            // value={nombre.carrera}
                          />
                          <label htmlFor="grupo">Grupo:</label>
                          <input
                            type="text"
                            id="grupo"
                            name="grupo"
                            // value={nombre.grupo}
                          />
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex justify-center">
                        <AlertDialogCancel>Cerrar</AlertDialogCancel>
                        <AlertDialogAction>Continuar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    variant="destructive"
                    // onClick={() => handleStatusChange(empresa.rfc, "2")}
                  >
                    Dar de baja
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

export default TableAlumnos;