import {useState, useEffect } from 'react'
import NavbarEmpresa from "@/components/layouts/navbar/navbarEmpresa";
import TableOfertasEmpresa from "@/components/layouts/tables/tableOfertasEmpresa";
import { registrarVacante } from '@/services/vacantes/vacanteService';
import { obtenerUsuario } from "@/services/usuario/usuarioService";
import { obtenerEmpresa } from '@/services/empresas/empresaService';
import "./pageVacantes.css"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate, } from 'react-router-dom';
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import './pageVacantes.css'


function PageVacantes() {
    const [empresa_rfc, setempresarfc] = useState('');
    const [offer_name, setoffername] = useState('');
    const [offer_description, setofferdescription] = useState('');
    const [offer_price, setofferprice] = useState('');
    const [offer_start_date, setofferstartdate] = useState('');
    const [offer_end_date, setofferenddate] = useState('');
    const [offer_work_mode, setofferworkmode] = useState('');
    const [offer_address, setofferaddress] = useState('');
    const [offer_responsabilities, setofferresponsabilities] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    

    const [userData, setUserData] = useState({
        userNumber: 0,
        Direccion: ""
    });

    const handleClear = () => {
        setoffername('');
        setofferdescription('');
        setofferprice('');
        setofferstartdate('');
        setofferenddate('');
        setofferworkmode(''); // Si hay un valor predeterminado, puedes usarlo aquí
        setofferresponsabilities('');
    };

    useEffect(() => {
        const userNumber = sessionStorage.getItem("userNumber");
        if (userNumber) {
          obtenerUsuario(userNumber).then((data) => {
            if (data) {
              setUserData({
                userNumber: data.user_number,
              });
              setempresarfc(data.user_number);
            }
          });
          obtenerEmpresa(userNumber).then((data) => {
            if (data) {
              setUserData({
                Direccion: data.direccion,
              });
              setofferaddress(data.direccion);
            }
          });
        }
        let timeoutId;
        if (error) {
            timeoutId = setTimeout(() => {
                setError('');
            }, 3000);
        }
    
        return () => clearTimeout(timeoutId);
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        if (
            
            offer_name.trim() === '' ||
            offer_description.trim() === '' ||
            offer_price.trim() === '' ||
            offer_start_date.trim() === '' ||
            offer_end_date.trim() === ''
        ) {
            setError('Los campos estan vacíos');
            setLoading(false);
            return;
        }

        try {
                const response = await registrarVacante(empresa_rfc, offer_name, offer_description, offer_price, offer_work_mode, offer_address, offer_responsabilities, offer_start_date, offer_end_date);
                if (response.ok) {
                    alert('Vacante registrado exitosamente');
                    // Ir a la lista de administradores
                    navigate('/pageVacantes')
                } else {
                    setError(response.message || 'Error al registrar vacantes');
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
        <NavbarEmpresa />
        <div className="flex justify-center ">
            <div className="w-full max-w-8xl">
            <Tabs defaultValue="principal" className="mx-auto p-4">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="principal">Vacantes</TabsTrigger>
                    <TabsTrigger value="registro">Registrar vacante</TabsTrigger>
                </TabsList>
                <TabsContent value="principal">
                <Card >
                    <CardHeader>
                    <CardTitle>Vacantes para Estancias Profesionales y Servicio Social</CardTitle>
                    <CardDescription>
                    Lista de vacantes ofrecidas por empresas, para que estudiantes realicen estancias o prácticas en el ámbito profesional
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 flex justify-center">
                    <div className="space-y-1 w-full">
                        <TableOfertasEmpresa/>
                    </div>
                    </CardContent>
                </Card >
                </TabsContent>
                <TabsContent value="registro">
              <Card>
                <CardContent>
                <div className="flex justify-center items-center">
                        <Card className="border border-gray-400 w-[1300px] mt-4">
                            <CardHeader>
                                <CardTitle>Registrar vacantes para Estancias Profesionales y Servicio Social</CardTitle>
                            </CardHeader>
                            <CardContent >
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-2 items-start gap-6">
                                        <div className=" flex flex-col text-left space-y-2">
                                        <Label htmlFor="empresa_rfc">RFC:</Label>
                                        <Input className="border border-gray-400" placeholder="Ingresa el RFC de la empresa" value={empresa_rfc} onChange={(e) => setoffername(e.target.value)} id="empresa_rfc"/>
                                        <Label htmlFor="offer_name">Nombre de la vacante:</Label>
                                        <Input className="border border-gray-400" id="offer_name" placeholder="Ingresa el nombre de la vacante" value={offer_name} onChange={(e) => setoffername(e.target.value)}/>                                    
                                        <Label htmlFor="offer_price">Remuneración:</Label>
                                        <Input className="border border-gray-400" id="offer_price" placeholder="Ingresa la remuneración de la vacante" value={offer_price} onChange={(e) => setofferprice(e.target.value)}/>
                                        <Label htmlFor="offer_address">Dirección:</Label>
                                        <Input className="border border-gray-400" id="offer_address" placeholder="Ingresa la remuneración de la vacante" value={offer_address} onChange={(e) => setofferaddress(e.target.value)}/>
                                        <Select>
                                        <Label htmlFor="offer_work_mode">Modalidad:</Label>
                                            <SelectTrigger className="w-[600px] border border-gray-400"
                                                value={offer_work_mode}  // Aquí se asigna el valor seleccionado al estado offer_work_mode
                                                onChange={(e) => setofferworkmode(e.target.value)}>
                                                <SelectValue id="offer_work_mode" placeholder="Selecciona la modalidad de tu preferencias"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                <SelectLabel>Modalidad de la vacante</SelectLabel>
                                                <SelectItem value="home_office">Home_office</SelectItem>
                                                <SelectItem value="on_site">On_site</SelectItem>
                                                <SelectItem value="hybrid">Hybrid</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    
                                        </div>
                                        <div className='space-y-2 text-left grid w-full items-center'>
                                        <Label htmlFor="acces_date1">Fecha de apertura:</Label>
                                        <Input className="border border-gray-400" id="acces_date1" placeholder="Ingresa la fecha de apertura" value={offer_start_date} onChange={(e) => setofferstartdate(e.target.value)}/>
                                        <Label htmlFor="acces_date2">Fecha de Finalización:</Label>
                                        <Input className="border border-gray-400" id="acces_date2" placeholder="Ingresa la fecha vencimiento" value={offer_end_date} onChange={(e) => setofferenddate(e.target.value)}/>
                                        <Label htmlFor="offer_description">Descripción de la vacante:</Label>
                                        <Textarea className="w-[600px] border border-gray-400" id="offer_description" placeholder="Ingresa la descripción de la vacante." value={offer_description} onChange={(e) => setofferdescription(e.target.value)}/>
                                        <Label htmlFor="offer_responsabilities">Responsabilidades de la vacante:</Label>
                                        <Textarea className="w-[600px] border border-gray-400" id="offer_responsabilities" placeholder="Ingresa la descripción de la vacante." value={offer_responsabilities} onChange={(e) => setofferresponsabilities(e.target.value)}/>
                                        </div>
                                    </div>
                                    {error && <div className={`text-${offer_name.trim() === '' || offer_description.trim() === '' || offer_price.trim() === '' || offer_start_date.trim() === '' || offer_end_date.trim() === '' ? 'red' : 'green'}-500`}>{error}</div>}
                                    <div className='flex justify-center items-center'>
                                        <Button variant="destructive" className="w-1/4 mx-auto my-4" type="submit" onClick={handleClear}>
                                            Limpiar
                                        </Button>
                                        <Button className="w-1/4 mx-auto my-4" type="submit" disabled={loading}>
                                            {loading ? 'registrando...' : 'Registrar'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                            </Card>
                        </div>
                </CardContent>
              </Card>
            </TabsContent>
            </Tabs>
            </div>
        </div>
    </div>
    )
}

export default PageVacantes