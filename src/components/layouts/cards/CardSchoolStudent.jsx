import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { obtenerAlumno } from "@/services/alumnos/alumnoService"; 

function CardSchoolStudent() {
  const [userData, setUserData] = useState({
    matricula: "",
    carrera: "",
    semestre: "",
    grupo: "",
  });

  useEffect(() => {
    const userNumber = sessionStorage.getItem("userNumber");
    if (userNumber) {
      obtenerAlumno (userNumber).then((data) => {
        if (data) {
          setUserData({
            matricula: data.matricula,
            carrera: "Ing Computación",//data.carrera,
            semestre: data.semestre, // Ajusta según cómo se divide el nombre completo en tu backend
            Grupo: data.grupo, // Ajusta según cómo se divide el nombre completo en tu backend
          });
        }
      });
    }
  }, []);

  return (
    <Card id="" className="border rounded-lg shadow-lg p-4">
      <CardHeader>
        <CardTitle>Información Escolar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 items-start gap-6">
          <div className="space-y-2 text-left">
            <Label htmlFor="name"> Matricula: </Label>
            <Input
              className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
              value={userData.matricula}
              id="name"
              readOnly
              disabled
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="paternalName"> Carrera:</Label>
            <Input
              className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
              value={userData.carrera}
              id="paternalName"
              readOnly
              disabled
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="paternalName"> Semestre:</Label>
            <Input
              className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
              value={userData.semestre}
              id="paternalName"
              readOnly
              disabled
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="maternalName">Grupo</Label>
            <Input
              className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
              value={userData.Grupo}
              id="maternalName"
              readOnly
              disabled
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        Si existe algun problema o inconsistencia con sus datos favor de reportarlo a servicios escolares
      </CardFooter>
    </Card>
  );
}

export default CardSchoolStudent;
