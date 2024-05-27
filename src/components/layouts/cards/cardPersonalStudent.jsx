import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { obtenerAlumno, guardarInfo } from "@/services/alumnos/alumnoService"; // Importar las funciones necesarias
import { uploadImage, obtenerUsuario } from "@/services/usuario/usuarioService";

function CardPersonalStudent() {
  const [userData, setUserData] = useState({
    bio: "",
  });

  const [profileImage, setProfileImage] = useState("https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg");
  const [selectedImage, setSelectedImage] = useState(null);
  const [notification, setNotification] = useState(""); // Estado para manejar las notificaciones

  useEffect(() => {
    const userNumber = sessionStorage.getItem("userNumber");
    if (userNumber) {
      obtenerAlumno(userNumber).then((data) => {
        if (data) {
          console.log(data);
          setUserData({
            bio: data.about, // Ajusta según tus necesidades
          });
        }
      }).catch((error) => {
        console.error("Error al obtener los datos del alumno", error);
      });

      obtenerUsuario(userNumber).then((data) => {
        if (data && data.image_link) {
          setProfileImage(data.image_link);
        }
      }).catch((error) => {
        console.error("Error al obtener los datos del usuario", error);
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

  // Handler para cambiar la imagen de perfil
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler para guardar los cambios
  const handleSaveChanges = () => {
    const userNumber = sessionStorage.getItem("userNumber");
    if (userNumber) {
      const saveBio = guardarInfo(userNumber, userData.bio, 2); // Llamar a la función guardarInfo con la biografía y userNumber
      const uploadProfileImage = selectedImage ? uploadImage(userNumber, selectedImage) : Promise.resolve();

      Promise.all([saveBio, uploadProfileImage])
        .then(([bioResponse, imageResponse]) => {
          setNotification("Información guardada con éxito");
          console.log("Información guardada con éxito", bioResponse, imageResponse);
        })
        .catch((error) => {
          setNotification("Error al guardar la información");
          console.error("Error al guardar la información", error);
        });
    } else {
      setNotification("userNumber no encontrado en sessionStorage");
      console.error("userNumber no encontrado en sessionStorage");
    }
  };

  return (
    <Card id="" className="border rounded-lg shadow-lg p-4">
      <CardHeader>
        <CardTitle>Personalizar Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {notification && (
          <div className={notification.includes("Error") ? "bg-red-200 p-2 rounded-md" : "bg-green-200 p-2 rounded-md"}>
            <Label className={notification.includes("Error") ? "text-red-500" : "text-green-500"}>
              {notification}
            </Label>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center relative">
            <div className="aspect-square w-[200px] mx-auto relative group">
              <label htmlFor="upload-profile-image" className="cursor-pointer">
                <img
                  alt="Current profile picture"
                  className="aspect-square object-cover rounded-full"
                  height={200}
                  src={profileImage}
                  width={200}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                  <span className="text-white text-sm">Subir foto</span>
                </div>
              </label>
              <input
                id="upload-profile-image"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Biografía</Label>
            <Textarea
              className="border border-gray-300 rounded"
              value={userData.bio}
              id="bio"
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveChanges}>Save Changes</Button> {/* Agregar el evento onClick */}
      </CardFooter>
    </Card>
  );
}

export default CardPersonalStudent;
