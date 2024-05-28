import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { getCV, uploadCV } from '@/services/alumnos/alumnoService';
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
import { Progress } from "@/components/ui/progress";

function CardUploadCV() {
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [cvLink, setCvLink] = useState('');
    const [uploadMode, setUploadMode] = useState(false);

    useEffect(() => {
        const fetchCV = async () => {
            const userNumber = sessionStorage.getItem('userNumber');
            try {
                const response = await getCV(userNumber);
                console.log(response);
                setCvLink(response.url);
            } catch (error) {
                console.error("Error fetching CV:", error);
            }
        };

        fetchCV();
    }, []);

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
            const userNumber = sessionStorage.getItem('userNumber');
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
                    const response = await uploadCV(file, userNumber);
                    console.log(response);
                    setResponseMessage(response.message);
                    setCvLink(response.url); 
                } catch (error) {
                    setResponseMessage("Error al subir el archivo");
                }
                clearInterval(interval);
                setProgress(100);
                setLoading(false);
                setAlertVisible(true);
                setFile(null);
                setUploadMode(false);
            };
            reader.readAsText(file);
        }
    };

    const renderUploadCard = () => (
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
    );

    const renderPdfCard = () => (
        <Card className="w-full mx-auto m-4 ring-gray-100 ring-1 ring-opacity-20 shadow-2xl">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">Tu CV</h3>
                    <Button onClick={() => setUploadMode(true)}>Subir PDF</Button>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                {cvLink ? (
                    <iframe 
                        src={cvLink} 
                        width="100%" 
                        height="600px" 
                        title="CV"
                        className="border-0"
                    ></iframe>
                ) : (
                    <p className="text-sm text-gray-500">No has subido ningún CV todavía.</p>
                )}
            </CardContent>
        </Card>
    );

    return (
        <div>
            {uploadMode ? renderUploadCard() : renderPdfCard()}

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
