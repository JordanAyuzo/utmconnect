import React, { useState, useEffect } from 'react';
import { guardarInfo,obtenerAlumno } from '@/services/alumnos/alumnoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input"; // Asegúrate de importar el componente Input correctamente
import { Label } from "@/components/ui/label"; // Asegúrate de importar el componente Label correctamente

function CardExpStudent() {
    const [habilidades, setHabilidades] = useState([]);
    const [nuevaHabilidad, setNuevaHabilidad] = useState("");
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchHabilidades = async () => {
            try {
                const userNumber = sessionStorage.getItem('userNumber');
                const habilidadesObtenidas = await obtenerAlumno(userNumber);
                setHabilidades(habilidadesObtenidas.habilidades);
            } catch (error) {
                console.error("Error al obtener las habilidades:", error);
                setNotification("Error al cargar las habilidades. Inténtalo de nuevo.");
                setTimeout(() => {
                    setNotification(null); // Limpiar la notificación después de 3 segundos
                }, 3000);
            }
        };
        
        fetchHabilidades();
    }, []);

    const handleInputChange = (event) => {
        setNuevaHabilidad(event.target.value);
    };

    const handleAgregarHabilidad = () => {
        if (nuevaHabilidad.trim() !== "") {
            setHabilidades([...habilidades, nuevaHabilidad.trim()]);
            setNuevaHabilidad("");
        }
    };

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            handleAgregarHabilidad();
        }
    };

    const handleEliminarHabilidad = (index) => {
        setHabilidades(habilidades.filter((_, i) => i !== index));
    };

    const handleGuardarCambios = async () => {
        try {
            const userNumber = sessionStorage.getItem('userNumber');
            const response = await guardarInfo(userNumber, habilidades,1);
            setNotification("Habilidades guardadas correctamente.");
            setTimeout(() => {
                setNotification(null); // Limpiar la notificación después de 3 segundos
            }, 3000);
        } catch (error) {
            console.error("Error al guardar las habilidades:", error);
            setNotification("Error al guardar las habilidades. Inténtalo de nuevo.");
            setTimeout(() => {
                setNotification(null); // Limpiar la notificación después de 3 segundos
            }, 3000);
        }
    };

    return (
        <div>
            {notification && (
                <div className={notification.includes("Error") ? "bg-red-200 p-2 rounded-md" : "bg-green-200 p-2 rounded-md"}>
                    <Label className={notification.includes("Error") ? "text-red-500" : "text-green-500"}>
                        {notification}
                    </Label>
                </div>
            )}
            <Card className="w-full mx-auto m-4 ring-gray-100 ring-1 ring-opacity-20 shadow-2xl">
                <CardDescription className="p-4">
                    En esta sección puedes agregar tus habilidades
                </CardDescription>
                <CardContent className="p-6 space-y-2">
                    <div className="flex flex-col"> {/* Utilizamos flexbox para organizar los elementos en columna */}
                        <label htmlFor="habilidades" className="text-left">Añade tus habilidades:</label> {/* Alineamos el texto a la izquierda */}
                        <div className="flex items-center space-x-2"> {/* Contenedor para el input y el botón */}
                            <Input
                                id="habilidades"
                                type="text"
                                placeholder="Habilidades"
                                value={nuevaHabilidad}
                                onChange={handleInputChange}
                                onKeyPress={handleEnterKey}
                                className="w-2/5 border border-gray-400 rounded font-bold" 
                            />
                            <Button onClick={handleAgregarHabilidad}>Agregar</Button>
                        </div>
                    </div>
                    <div className="mt-4">Mis Habilidades</div>
                    <div className="flex flex-wrap space-x-2 mt-2">
                        {habilidades.map((habilidad, index) => (
                            <Badge key={index} className="flex items-center space-x-2 mb-2">
                                <span>{habilidad}</span>
                                <FontAwesomeIcon 
                                    icon={faXmark} 
                                    size="xl" 
                                    style={{ color: "#FFD43B", cursor: "pointer" }} 
                                    onClick={() => handleEliminarHabilidad(index)}
                                />
                            </Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button size="lg" onClick={handleGuardarCambios}>Guardar cambios</Button> {/* Agregamos el manejador de eventos al botón */}
                </CardFooter>
            </Card>
        </div>
    );
}

export default CardExpStudent;
