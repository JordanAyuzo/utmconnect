import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { register } from '@/services/usuario/usuarioService';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import NavbarAdmin from '@/components/layouts/navbar/navbarAdmin';
import TableAdministrador from "@/components/layouts/tables/tableAdministrador";
import { registerAdmins } from '@/services/administrador/administradorService';
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
import { Button } from "@/components/ui/button"
import { useNavigate, } from 'react-router-dom';
import './registerAdmin.css'

function registerAdmin() {
    const [user_number, setusernumber] = useState('');
    const [name, setname] = useState('');
    const [paternal_sn, setpaternalsn] = useState('');
    const [maternal_sn, setmaternalsn] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [accesDate, setAccesDate] = useState('');     
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
          const response = await registerAdmins(user_number, name, paternal_sn, maternal_sn, email, password, accesDate);
          if (response.ok) {
            alert('Administrador registrado exitosamente');
            // Ir a la lista de administradores
            navigate('/registerAdmin')
          } else {
            setError(response.message || 'Error al registrar el administrador');
          }
        if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.error(e);
    throw e; // O maneja el error de manera adecuada
  } finally {
            setLoading(false);
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
                        <TableAdministrador/>
                    </Card>
                    
                </TabsContent>
                
                <TabsContent value="delete" className="flex justify-center">
                    <Card className="w-full mx-auto m-4 ring-gray-100 ring-1 ring-opacity-20 shadow-2xl">
                        <CardHeader>
                            <CardTitle>Registro de adminstrador</CardTitle>
                            <CardDescription>
                                Apartado para registrar a un administrador.
                            </CardDescription>
                            <div className="flex justify-center items-center">
                            <Card className="w-[450px]">
                            <CardHeader>
                                <CardTitle>Registrar adminstrador</CardTitle>
                                <CardDescription>Rellena la siguiente información</CardDescription>
                            </CardHeader>
                            <CardContent >
                                <form onSubmit={handleSubmit}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="user_number">Número del trabajador</Label>
                                    <Input id="user_number" placeholder="Ingresa el número del trabajador" value={user_number} onChange={(e) => setusernumber(e.target.value)}/>
                                    <Label htmlFor="name">Nombre completo</Label>
                                    <Input id="name" placeholder="Nombre(s)" value={name} onChange={(e) => setname(e.target.value)}/>                                    
                                    <Input id="paternal_sn" placeholder="Ingresa el apellido paterno" value={paternal_sn} onChange={(e) => setpaternalsn(e.target.value)}/>                                    
                                    <Input id="maternal_sn" placeholder="Ingresa el apellido materno" value={maternal_sn} onChange={(e) => setmaternalsn(e.target.value)}/>
                                    <Label htmlFor="correo">Correo electrónico</Label>
                                    <Input id="correo" placeholder="Ingresa tu correo electrónico" value={email} onChange={(e) => setemail(e.target.value)}/>
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input id="password" placeholder="Ingresa su contraseña" value={password} onChange={(e) => setpassword(e.target.value)}/>
                                    <Label htmlFor="acces_date">Fecha</Label>
                                    <Input id="acces_date" placeholder="Ingresa la fecha" value={accesDate} onChange={(e) => setAccesDate(e.target.value)} dateFormat="dd/MM/yyyy"/>
                                    </div>
                                    {error && <div className="text-red-500">{error}</div>}
                                    <Button className="w-full" type="submit" disabled={loading}>
                                        {loading ? 'registrando...' : 'Registrar'}
                                    </Button>
                                </div>
                                </form>
                            </CardContent>
                            </Card>
                            </div>
                        </CardHeader>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default registerAdmin