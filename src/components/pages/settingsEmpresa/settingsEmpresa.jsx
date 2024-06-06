import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavbarEmpresa from "@/components/layouts/navbar/navbarEmpresa";
import { obtenerUsuario } from "@/services/usuario/usuarioService";
import { obtenerEmpresa } from "@/services/empresas/empresaService";
import { cambiarPassword } from "@/services/usuario/usuarioService";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function SettingsEmpresa() {
    const [userData, setUserData] = useState({
        email: "",
        userNumber: 0,
        newPassword: "",
        oldPassword: "",
    });

    const [userDataEmpresa, setUserDataEmpresa] = useState({
        RFC: "",
        Direccion: "",
        Giro: "",
        JefeInmediato: "",
        Descripcion: "",
        Departamento: "",
    });

    const [notification, setNotification] = useState(null);
    const [errorFields, setErrorFields] = useState([]);
    const [selectedTab, setSelectedTab] = useState("perfil");

    useEffect(() => {
        const userNumber = sessionStorage.getItem("userNumber");
        if (userNumber) {
          obtenerUsuario(userNumber).then((data) => {
            if (data) {
              setUserData({
                email: data.email,
                userNumber: data.user_number,
                newPassword: "", 
                oldPassword: "", 
              });
            }
          });

          obtenerEmpresa(userNumber).then((data) => {
            if (data) {
              setUserDataEmpresa({
                RFC: data.rfc,
                Direccion: data.direccion,
                Giro: data.giro,
                JefeInmediato: data.jefe_inmediato,
                Descripcion: data.descripcion,
                Departamento: data.departamento,
            });
            }
          });
        }
    }, []);

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

    const renderContent = () => {
        switch (selectedTab) {
            case "perfil":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Información de la empresa</CardTitle>
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
                            <div className="grid grid-cols-3 items-start gap-6 text-left ">
                                <div className="space-y-2">
                                    <Label htmlFor="userNumber">RFC:</Label>
                                    <Input value={userDataEmpresa.RFC} id="userNumber" readOnly/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo electrónico: </Label>
                                    <Input value={userData.email} id="email" readOnly/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="direccion">Dirección: </Label>
                                    <Input value={userDataEmpresa.Direccion} id="direccion" readOnly/>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 items-start gap-6 text-left ">
                                <div className="space-y-2">
                                    <Label htmlFor="giro">Giro:</Label>
                                    <Input value={userDataEmpresa.Giro} id="giro" readOnly/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="jefeInmediato">Jefe inmediato:</Label>
                                    <Input value={userDataEmpresa.JefeInmediato} id="jefeInmediato" readOnly/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="departamento">Departamento:</Label>
                                    <Input value={userDataEmpresa.Departamento} id="departamento" readOnly/>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 items-start gap-6 text-left ">
                                <div className="space-y-2">
                                    <Label htmlFor="descripcion">Descripción:</Label>
                                    <Input value={userDataEmpresa.Descripcion} id="descripcion" readOnly/>
                                </div>
                            </div>
                        </CardContent>
                        <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Cambiar contraseña</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                        <DialogTitle>Cambiar contraseña</DialogTitle>
                                        <DialogDescription>
                                        Realice cambios en su perfil aquí. Haga clic en guardar cuando haya terminado.
                                        </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="userNumber" className="text-right">
                                                RFC de la empresa
                                                </Label>
                                                <Input
                                                value={userDataEmpresa.RFC}
                                                id="userNumber"
                                                readOnly
                                                className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="oldPassword" className="text-right">
                                                Contraseña actual
                                                </Label>
                                                <Input
                                                className="col-span-3"
                                                value={userData.oldPassword} 
                                                id="oldPassword" 
                                                type="password" 
                                                onChange={handleChange}
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="newPassword" className="text-right">
                                                    Nueva contraseña
                                                </Label>
                                                <Input
                                                className="col-span-3"
                                                value={userData.newPassword}
                                                id="newPassword"
                                                type="password"
                                                onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                        <Button onClick={handleSaveChanges} type="submit">Guardar cambios</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                    </Dialog>
                    </Card>
                );
            case "privacidad":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Centro de privacidad</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Aquí puedes administrar la configuración de privacidad de tu cuenta.</p>
                        </CardContent>
                    </Card>
                );
            case "apariencia":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Apariencia de la cuenta</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Aquí puedes personalizar la apariencia de tu cuenta.</p>
                        </CardContent>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <NavbarEmpresa />
            <div>
                <h1 className="text-2xl font-bold">Cuenta personal</h1>
                <p className="text-gray-500 dark:text-gray-400">Administra tu información personal de forma segura.</p>
             </div>
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                    <div className="flex h-full maxvalue={userId}-h-screen flex-col gap-2">
                        <div className="flex h-[60px] items-center border-b px-6">
                            <h1 className="">Configuración de perfil</h1>
                        </div>
                        <div className="flex-1 overflow-auto py-2">
                            <nav className="grid items-start px-4 text-sm font-medium">
                                <Link
                                    className={`flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50 ${selectedTab === "perfil" ? "font-bold" : ""}`}
                                    onClick={() => setSelectedTab("perfil")}
                                >
                                    Mi perfil
                                </Link>
                                <Link
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${selectedTab === "privacidad" ? "font-bold" : ""}`}
                                    onClick={() => setSelectedTab("privacidad")}
                                >
                                    Privacidad
                                </Link>
                                <Link
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${selectedTab === "apariencia" ? "font-bold" : ""}`}
                                    onClick={() => setSelectedTab("apariencia")}
                                >
                                    Apariencia
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <main className="flex-1 p-6">
                        <div className="space-y-6">
                            {renderContent()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default SettingsEmpresa