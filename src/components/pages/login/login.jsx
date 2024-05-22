import React, { useState } from 'react';
import "./login.css";
import { ingresar } from '@/services/usuario/usuarioService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function Login() {
    const [usuario, setusuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await ingresar(usuario, password);
            if (response.success) {
                console.log('Ingreso exitoso');
            } else {
                setError(response.message || 'Error al ingresar');
            }
        } catch (error) {
            setError('Error al ingresar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='full-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold  text-blue-500 ">Inicio</CardTitle>
                    <CardDescription>Rellena los datos solicitados para ingresar al sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="usuario">Usuario o correo</Label>
                            <Input
                                id="usuario"
                                placeholder="Ej.2022025400, empresa@ejemplo.com"
                                required
                                type="text"
                                value={usuario}
                                onChange={(e) => setusuario(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <div className="text-red-500">{error}</div>}
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </Button>
                        <div className="text-center mt-4">
                            <a href="#" className="text-sm text-blue-500 hover:underline">
                                ¿Eres una empresa?
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;
