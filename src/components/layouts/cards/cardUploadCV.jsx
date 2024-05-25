import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { uploadCV } from '@/services/alumnos/alumnoService';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress"; // Importa el componente Progress

function CardUploadCV() {
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false); // Estado para controlar la carga
    const [progress, setProgress] = useState(0); // Estado para el progreso

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
        if (file) {
            setLoading(true); // Inicia la carga
            setProgress(0); // Reinicia el progreso
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(interval); 
                        return prev;
                    }
                    return prev + 95; // Incrementa el progreso
                });
            }, 500);

            const reader = new FileReader();
            reader.onload = async (e) => {
                const content = e.target.result;
                console.log(content);
                try {
                    const response = await uploadCV(file);
                    console.log(response);
                    setResponseMessage(response.message); // O ajusta esto según la estructura de tu respuesta
                } catch (error) {
                    setResponseMessage("Error al subir el archivo");
                }
                clearInterval(interval); // Detén la actualización
                setProgress(100); // Completa el progreso
                setLoading(false); // Termina la carga
                setAlertVisible(true); // Muestra el AlertDialog
                setFile(null);
            };
            reader.readAsText(file);
        }
    };

    return (
    <div>
        <Card className="w-full mx-auto m-4 ring-gray-100 ring-1 ring-opacity-20 shadow-2xl">
            <CardDescription className="p-4">
                En esta sección podrás subir tu CV para que las empresas puedan valorar mejor tus habilidades.
            </CardDescription>
            <CardContent className="p-6 space-y-2">
                <div 
                    className={`border-2 border-dashed border-gray-300 rounded-lg flex flex-col gap-1 p-6 items-center ${dragActive ? 'bg-gray-100' : ''}`}
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
                    <span className="text-sm font-medium text-gray-500">Arrastra el archivo o selecciona el archivo de tu CV.</span>
                    <span className="text-xs text-gray-500">Solo admite archivos PDF</span>
                    <input 
                        accept=".pdf"
                        id="file"
                        type="file"
                        onChange={handleChange}
                        className="hidden"
                    />
                    <label htmlFor="file" className="cursor-pointer text-blue-500 underline">Seleccionar archivo</label>
                    {file && <p className="text-sm text-gray-700 mt-2">{file.name}</p>}
                </div>
                {loading && ( // Muestra el componente de carga mientras loading es true
                    <div className="w-full flex justify-center mt-4">
                        <Progress value={progress} className="w-[60%]" /> {/* Usa el estado de progreso */}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button size="lg" disabled={!file} onClick={handleFileUpload}>Subir Archivo</Button>
            </CardFooter>
        </Card>

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

export default CardUploadCV;
