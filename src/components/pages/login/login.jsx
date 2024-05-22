import React from 'react';
import "./login.css";
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
    return (
        <div className='full-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Inicio</CardTitle>
                    <CardDescription>Rellena los datos solicitados para ingresar</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="matricula">Usuario</Label>
                            <Input id="matricula" placeholder="Ej.2022025400" required type="text" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" required type="password" />
                        </div>
                        <Button className="w-full" type="submit">
                            Ingresar
                        </Button>
                        <div className="text-center mt-4">
                            <a href="#" className="text-sm text-blue-500 hover:underline">
                                ¿Eres una empresa?
                            </a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;