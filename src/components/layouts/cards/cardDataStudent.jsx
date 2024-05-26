import React, { useEffect, useState } from "react";
import { obtenerUsuario } from "@/services/usuario/usuarioService";
import { cambiarPassword } from "@/services/usuario/usuarioService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CardDataStudent() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    paternalName: "",
    maternalName: "",
    newPassword: "",
    oldPassword: "",
  });
  const [notification, setNotification] = useState(null);
  const [errorFields, setErrorFields] = useState([]);

  useEffect(() => {
    const userNumber = sessionStorage.getItem("userNumber");
    if (userNumber) {
      obtenerUsuario(userNumber).then((data) => {
        if (data) {
          setUserData({
            name: data.name,
            email: data.email,
            paternalName: data.paternal_sn, 
            maternalName: data.maternal_sn, 
            newPassword: "", 
            oldPassword: "", 
          });
        }
      });
    }
  }, []);

  // Handler para actualizar el estado cuando cambien los campos de entrada
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  const handleSaveChanges = () => {
    const userNumber = sessionStorage.getItem("userNumber");
    const errorFields = [];

    // Validar campos de contraseña
    if (!userData.newPassword.trim()) {
      errorFields.push("newPassword");
    }
    if (!userData.oldPassword.trim()) {
      errorFields.push("oldPassword");
    }
    setErrorFields(errorFields);

    // Si hay campos de contraseña vacíos, detener la operación
    if (errorFields.length > 0) return;

    cambiarPassword(userNumber, userData.oldPassword, userData.newPassword)
      .then(response => {
        if (response.message === 'Contraseña incorrecta') {
          setNotification("La contraseña antigua es incorrecta");
        } else {
          setNotification("Contraseña cambiada exitosamente");
        }
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      })
      .catch(error => {
        setNotification("Error al cambiar la contraseña");
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
  };
  return (
    <Card id="" className="border rounded-lg shadow-lg p-4">
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
        
      {notification && (
          <div className={notification.includes("incorrecta") ? "bg-red-200 p-2 rounded-md" : "bg-green-200 p-2 rounded-md"}>
            <Label className={notification.includes("incorrecta") ? "text-red-500" : "text-green-500"}>
              {notification}
            </Label>
          </div>
        )}
        {errorFields.length > 0 && (
          <div className="bg-red-200 p-2 rounded-md">
            <Label className="text-red-500">Por favor completa los campos requeridos</Label>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 items-start gap-6">
          <div className="space-y-2 text-left">
            <Label htmlFor="name">Nombre(s):</Label>
            <Input
              className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
              value={userData.name}
              id="name"
              readOnly
              disabled
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="paternalName">Apellido Paterno:</Label>
            <Input
              className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
              value={userData.paternalName}
              id="paternalName"
              readOnly
              disabled
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="maternalName">Apellido Materno:</Label>
            <Input
              className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
              value={userData.maternalName}
              id="maternalName"
              readOnly
              disabled
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="email">Correo:</Label>
            <Input
              className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
              value={userData.email}
              id="email"
              type="email"
              readOnly
              disabled
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="newPassword">Contraseña Nueva:</Label>
            <p className="text-gray-600 text-sm">Puede modificar su contraseña si lo desea.</p>
            <Input
              className="border border-gray-400 rounded font-bold"
              value={userData.newPassword}
              id="newPassword"
              type="password"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2 text-left ">
            <Label htmlFor="oldPassword">Contraseña Antigua:</Label>
            <p className="text-gray-600 text-sm">Escribe tu contraseña antigua para confirmar.</p>
            <Input
              className="border border-gray-400 rounded font-bold"
              value={userData.oldPassword}
              id="oldPassword"
              type="password"
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">

        <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
      </CardFooter>
    </Card>
  );
}

export default CardDataStudent;
