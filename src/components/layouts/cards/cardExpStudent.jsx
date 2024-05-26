import React, { useState } from 'react';
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

function CardExpStudent() {
    const [habilidades, setHabilidades] = useState([]);
    const [nuevaHabilidad, setNuevaHabilidad] = useState("");

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

    return (
        <div>
            <Card className="w-full mx-auto m-4 ring-gray-100 ring-1 ring-opacity-20 shadow-2xl">
                <CardDescription className="p-4">
                    En esta sección puedes agregar tus habilidades
                </CardDescription>
                <CardContent className="p-6 space-y-2">
                    <div className="flex items-center space-x-2">
                        <Input
                            type="text"
                            placeholder="Habilidades"
                            value={nuevaHabilidad}
                            onChange={handleInputChange}
                            onKeyPress={handleEnterKey}
                            className="w-2/5" // Ajusta el ancho del input aquí
                        />
                        <Button onClick={handleAgregarHabilidad}>Agregar Habilidad</Button>
                    </div>
                    Mis Habilidades
                    <div className="flex flex-wrap space-x-2 mt-2">
                        {habilidades.map((habilidad, index) => (
                            <Badge key={index} className="flex items-center space-x-2">
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
                    <Button size="lg">Guardar cambios</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default CardExpStudent;
