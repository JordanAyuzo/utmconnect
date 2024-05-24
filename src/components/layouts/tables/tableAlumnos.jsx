import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CardDescription } from "@/components/ui/card";
import { getAlumnos } from "@/services/alumnos/alumnoService";
import React, { useEffect, useState } from "react";

function TableAlumnos() {

  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    getAlumnos().then((res) => {
      setAlumnos(res);
    });
  }, []);

  return (
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
        {alumnos.map((nombre) => (
          <TableRow key={nombre.nombre}>
            <TableCell className="font-medium">{nombre.nombre}</TableCell>
            <TableCell>{nombre.carrera}</TableCell>
            <TableCell>{nombre.grupo}</TableCell>
            <TableCell>{nombre.matricula}</TableCell>
            <TableCell className="text-center">
              <Button variant="destructive">Dar de baja</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan="5" className="text-right">
            <Button variant="primary">Agregar alumno</Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default TableAlumnos;