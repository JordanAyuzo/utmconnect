import React from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavbarAdmin from "@/components/layouts/navbar/navbarAdmin";
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
function SettingsAdmin() {
    return (
        <div>
            <NavbarAdmin />
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
                
                <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-[60px] items-center border-b px-6">
                                <h1 className="">Configuración de perfil</h1>
                        </div>
                        <div className="flex-1 overflow-auto py-2">
                            <nav className="grid items-start px-4 text-sm font-medium">
                                <Link
                                    className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                                    href="#">Mi perfil</Link>
                                <Link
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                    href="#"
                                >Privacidad</Link>
                                <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                                >Apariencia</Link>
                            </nav>
                        </div>
                    </div>
                </div>
                

                <div className="flex flex-col">
                    <main className="flex-1 p-6">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold">Cuenta personal</h1>
                                <p className="text-gray-500 dark:text-gray-400">Administra tu información personal de forma segura.</p>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Información de usuario</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-3 items-start gap-6">
                                        <div className="space-y-2">
                                        <Label htmlFor="name">Nombre(s)</Label>
                                        <Input id="name" placeholder="Emmanuel Guadalupe"/>
                                        </div>
                                        <div className="space-y-2">
                                        <Label htmlFor="paternal_sn">Apellido paterno</Label>
                                        <Input id="paternal_sn" placeholder="Robles"/>
                                        </div>
                                        <div className="space-y-2">
                                        <Label htmlFor="maternal_sn">Apellido materno</Label>
                                        <Input id="maternal_sn" placeholder="Esparza"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 items-start gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="user_number">Número de trabajador</Label>
                                        <Input id="user_number" placeholder="1234567890"/>
                                        </div>
                                        <div className="space-y-2">
                                        <Label htmlFor="paternal_sn">Correo electrónico</Label>
                                        <Input id="paternal_sn" placeholder="soylamerareata@gs.utm.mx"/>
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
                                                <Label htmlFor="name" className="text-right">
                                                Usuario
                                                </Label>
                                                <Input
                                                id="name"
                                                defaultValue="Pedro Duarte"
                                                readOnly
                                                className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                Contraseña actual
                                                </Label>
                                                <Input
                                                id="name"
                                                className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="username" className="text-right">
                                                    Nueva contraseña
                                                </Label>
                                                <Input
                                                id="username"
                                                className="col-span-3"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                        <Button type="submit">Guardar cambios</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                    </Dialog>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default SettingsAdmin