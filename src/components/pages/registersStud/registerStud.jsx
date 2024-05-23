import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { register } from '@/services/usuario/usuarioService';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import NavbarAdmin from '@/components/layouts/navbarAdmin/navbarAdmin';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import "./registerStud.css";

function RegisterStud() {
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);

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
                    <TabsTrigger value="register">Registrar Alumnos</TabsTrigger>
                    <TabsTrigger value="delete">Dar de baja Alumnos</TabsTrigger>
                </TabsList>
                <TabsContent value="register">
                    <Card className="w-full mx-auto m-4 ring-gray-100 ring-1 ring-opacity-20 shadow-2xl">
                        <CardDescription className="p-4">
                            En esta sección podrás dar de alta a los usuarios nuevos o que continúan dentro del sistema.
                        </CardDescription>
                        <CardContent className="p-6 space-y-2">
                            <div 
                                className={`border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center ${dragActive ? 'bg-gray-100' : ''}`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                {file ? (
                                    <FontAwesomeIcon icon={faCircleCheck} style={{color: "#63E6BE",}} size="6x" />
                                ) : (
                                    <FontAwesomeIcon icon={faCloudArrowUp} bounce style={{color: "#74C0FC",}} size="6x" />
                                )}
                                <span className="text-sm font-medium text-gray-500">Arrastra el archivo o selecciona el archivo de alumnos para dar de alta.</span>
                                <span className="text-xs text-gray-500">Solo admite archivos CSV</span>
                                <input 
                                    accept=".csv"
                                    id="file"
                                    type="file"
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                <label htmlFor="file" className="cursor-pointer text-blue-500 underline">Seleccionar archivo</label>
                                {file && <p className="text-sm text-gray-700 mt-2">{file.name}</p>}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button size="lg" disabled={!file} onClick={handleFileUpload}>Subir Archivo</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="delete">
                    <Card className="w-full mx-auto m-4 ring-gray-100 ring-1 ring-opacity-20 shadow-2xl">
                        <CardHeader>
                            <CardTitle>Dar de Baja a Alumnos</CardTitle>
                            <CardDescription>
                                Aquí aparecerán todos los alumnos dados de baja.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* Aquí puedes añadir contenido adicional si es necesario */}
                        </CardContent>
                        <CardFooter>
                            <Button>Dar de baja a Todos</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default RegisterStud;
