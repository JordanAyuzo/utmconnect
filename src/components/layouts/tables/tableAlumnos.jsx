import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getAlumnos, modificarAlumno } from "@/services/alumnos/alumnoService";
import React, { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from  "@/components/ui/alert-dialog";

function TableAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const alumnosPerPage = 4;

  
  const [carrera, setCarrera] = useState("");
  const [grupo, setGrupo] = useState("");
  const [semestre, setSemestre] = useState("");
  const [curp, setCurp] = useState("");
  const [editingAlumno, setEditingAlumno] = useState(null);

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "semestre":
        setSemestre(e.target.value);
        break;
      case "curp":
        setCurp(e.target.value);
        break;
      case "carrera":
        setCarrera(e.target.value);
        break;
      case "grupo":
        setGrupo(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleEdit = (alumno) => {
    setCarrera(alumno.carrera);
    setGrupo(alumno.grupo);
    setSemestre(alumno.semestre);
    setCurp(alumno.curp);
    setEditingAlumno(alumno);
  }

  const handleSave = () => {
    const updatedAlumno = {
      semestre: parseInt(semestre),
      carrera: carrera,
      grupo: grupo,
      curp: curp
    }

    modificarAlumno(editingAlumno.matricula, updatedAlumno).then(() => {
      getAlumnos().then((res) => {
        setAlumnos(res);
      });
    });
  }

  useEffect(() => {
    getAlumnos().then((res) => {
      setAlumnos(res);
    });
  }, []);

  const indexOfLastAlumno = currentPage * alumnosPerPage;
  const indexOfFirstAlumno = indexOfLastAlumno - alumnosPerPage;
  const currentAlumnos = alumnos.slice(indexOfFirstAlumno, indexOfLastAlumno);

  const filteredAlumnos = currentAlumnos.filter((alumno) =>
    String(alumno.matricula).includes(searchTerm) ||
    String(alumno.user.name).includes(searchTerm) ||
    String(alumno.carrera).includes(searchTerm) ||
    String(alumno.grupo).includes(searchTerm) ||
    String(alumno.semestre).includes(searchTerm) ||
    String(alumno.curp).includes(searchTerm)
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
        Lista de alumnos
      </h2>
      <input 
        type="text"
        placeholder="Buscar alumno..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shodow-outline"
      />
      <Table>
        {/* <TableCaption>Una lista de los alumnos.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead>Carrera</TableHead>
            <TableHead>Grupo</TableHead>
            <TableHead>Semestre</TableHead>
            <TableHead>Matricula</TableHead>
            <TableCell>CURP</TableCell>
            <TableHead className="text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAlumnos.map((alumno) => (
            <TableRow key={alumno.user.name}>
              <TableCell className="font-medium">{alumno.user.name}</TableCell>
              <TableCell>{alumno.carrera}</TableCell>
              <TableCell>{alumno.grupo}</TableCell>
              <TableCell>{alumno.semestre}</TableCell>
              <TableCell>{alumno.matricula}</TableCell>
              <TableCell>{alumno.curp}</TableCell>
              <TableCell className="text-center">
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="mr-2"
                        onClick={() => handleEdit(alumno)}
                      >
                        Editar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="flex flex-col items-center bg-white rounded-lg shadow-xl">
                      <AlertDialogHeader className="w-full p-4">
                        <AlertDialogTitle className="text-center text-xl font-semibold">
                          Editar información
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-sm mb-4">
                          Esta sección es para modificar la información del alumno.
                        </AlertDialogDescription>
                        <div className="flex flex-col space-y-4">
                          <label htmlFor="semestre" className="font-medium">Semestre:</label>
                          <input
                            type="text"
                            id="semestre"
                            name="semestre"
                            value={semestre}
                            onChange={handleInputChange}
                            className="border rounded-lg p-2"
                          />
                          <label htmlFor="carrera" className="font-medium">Carrera:</label>
                          <input
                            type="text"
                            id="carrera"
                            name="carrera"
                            value={carrera}
                            onChange={handleInputChange}
                            className="border rounded-lg p-2"
                          />
                          <label htmlFor="grupo" className="font-medium">Grupo:</label>
                          <input
                            type="text"
                            id="grupo"
                            name="grupo"
                            value={grupo}
                            onChange={handleInputChange}
                            className="border rounded-lg p-2"
                          />
                          <label htmlFor="curp" className="font-medium">CURP:</label>
                          <input
                            type="text"
                            id="curp"
                            name="curp"
                            value={curp}
                            onChange={handleInputChange}
                            className="border rounded-lg p-2"
                          />
                        </div>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex justify-center p-4">
                        <AlertDialogCancel className="mr-2">Cerrar</AlertDialogCancel>
                        <AlertDialogAction className="ml-2" onClick={handleSave}>Guardar</AlertDialogAction>
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