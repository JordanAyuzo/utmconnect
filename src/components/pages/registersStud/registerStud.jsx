import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { register } from '@/services/usuario/usuarioService';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import NavbarAdmin from '@/components/layouts/navbar/navbarAdmin';
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import "./registerStud.css";

function RegisterStud() {
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

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

    const handleFileUpload = async () => {
        console.log("Mostrando archivo");
        if (file) {
            setLoading(true);
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(interval); 
                        return prev;
                    }
                    return prev + 95;
                });
            }, 500);

            const reader = new FileReader();
            reader.onload = async (e) => {
                const content = e.target.result;
                console.log(content);
                try {
                    const response = await register(file);
                    console.log(response);
                    const { total_students, saved_students, failed_students } = response;
                    setResponseMessage(`Se guardaron ${saved_students} de los ${total_students} estudiantes. Fallaron ${failed_students}.`);
                } catch (error) {
                    setResponseMessage("Error al subir el archivo");
                }
                clearInterval(interval);
                setProgress(100);
                setLoading(false);
                setAlertVisible(true);
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
                            {loading && (
                                <div className="w-full flex justify-center mt-4">
                                    <Progress value={progress} className="w-[60%]" />
                                </div>
                            )}
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

            <AlertDialog open={alertVisible} onOpenChange={setAlertVisible}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{responseMessage}</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setAlertVisible(false)}>Aceptar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default RegisterStud;
