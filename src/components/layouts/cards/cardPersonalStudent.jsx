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
import { obtenerUsuario } from "@/services/usuario/usuarioService"; 

function CardPersonalStudent() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    paternalName: "",
    maternalName: "",
    password: "",
    bio: "",
  });

  const [profileImage, setProfileImage] = useState("https://github.com/shadcn.png");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const userNumber = sessionStorage.getItem("userNumber");
    if (userNumber) {
      obtenerUsuario(userNumber).then((data) => {
        if (data) {
          setUserData({
            name: data.name,
            email: data.email,
            paternalName: "", // Ajusta según cómo se divide el nombre completo en tu backend
            maternalName: "", // Ajusta según cómo se divide el nombre completo en tu backend
            password: "", // O puedes configurar para mostrar una contraseña enmascarada si es necesario
            bio: "This is my bio.", // Ajusta según tus necesidades
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

  return (
    <Card id="" className="border rounded-lg shadow-lg p-4">
      <CardHeader>
        <CardTitle>Personalizar Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
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
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

export default CardPersonalStudent;
