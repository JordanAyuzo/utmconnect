import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { register } from '@/services/usuario/usuarioService';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import NavbarAdmin from '@/components/layouts/navbar/navbarAdmin';
import TableAdministrador from "@/components/layouts/tables/tableAdministrador";
import './registerAdmin.css'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Password } from 'primereact/password';

        
import './registerAdmin.css'

function registerAdmin() {


    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleFileUpload = ()  => {
        console.log("Mostrando archivo");
        if (file) {
            const reader = new FileReader();
            reader.onload =  async(e) => {
                const content = e.target.result;
                console.log(content);
                const response = await register(file);
                console.log(response); // Manejar la respuesta según sea necesario
                
                setFile(null);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <NavbarAdmin />
            <Tabs defaultValue="register" className="max-w-full mx-auto p-4">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="register">Adminstradores</TabsTrigger>
                    <TabsTrigger value="delete">Registrar administrador</TabsTrigger>
                </TabsList>
                <TabsContent value="register" className="flex justify-center">
                    <Card className="w-full mx-auto m-4 ring-gray-100 ring-1 ring-opacity-20 shadow-2xl">
                        <CardDescription className="p-4">
                            En esta sección se visualiza la lista de administradores registrados en el sistema.
                        </CardDescription>
                    </Card>
                </TabsContent>
                <TableAdministrador/>
                <TabsContent value="delete" className="flex justify-center">
                    <Card className="w-full mx-auto m-4 ring-gray-100 ring-1 ring-opacity-20 shadow-2xl">
                        <CardHeader>
                            <CardTitle>Registro de adminstrador</CardTitle>
                            <CardDescription>
                                Apartado para registrar a un administrador.
                            </CardDescription>
                            <Card className="w-[400px]">
                            <CardHeader>
                                <CardTitle>Registrar adminstrador</CardTitle>
                                <CardDescription>Rellena la siguiente información</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input id="name" placeholder="Ingresa tu nombre completo" />
                                    <Label htmlFor="correo">Correo electrónico</Label>
                                    <Input id="correo" placeholder="Ingresa tu correo electrónico" />
                                    </div>
                                </div>
                                </form>
                            </CardContent>
                            </Card>
                        </CardHeader>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default registerAdmin