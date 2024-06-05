import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function CardUpdateOffer() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <Card>
            <CardContent>
                <div className="flex justify-center items-center">
                            <Card className="border border-gray-400 w-[1000px] mt-4">
                                <CardContent >
                                    <form >
                                        <div className="grid grid-cols-2 items-start gap-6">
                                            <div className=" flex flex-col text-left space-y-2">
                                            <Label htmlFor="offer_rfc">RFC:</Label>
                                            <Input className="border border-gray-400" id="offer_rfc" placeholder="Ingresa el RFC de la empresa" />
                                            <Label htmlFor="offer_name">Nombre de la vacante:</Label>
                                            <Input className="border border-gray-400" id="offer_name" placeholder="Ingresa el nombre de la vacante" />                                    
                                            <Label htmlFor="offer_price">Remuneración:</Label>
                                            <Input className="border border-gray-400" id="offer_price" placeholder="Ingresa la remuneración de la vacante"/>
                                            <Label htmlFor="offer_address">Dirección:</Label>
                                            <Input className="border border-gray-400" id="offer_address" placeholder="Ingresa la remuneración de la vacante" />
                                            <Select>
                                            <Label htmlFor="offer_work_mode">Modalidad:</Label>
                                                <SelectTrigger className="w-[460px] border border-gray-400">
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
                                            <Input className="border border-gray-400" id="acces_date1"/>
                                            <Label htmlFor="acces_date2">Fecha de apertura:</Label>
                                            <Input className="border border-gray-400" id="acces_date2" placeholder="Ingresa la fecha vencimiento"/>
                                            <Label htmlFor="offer_description">Descripción de la vacante:</Label>
                                            <Textarea className="w-[460px] border border-gray-400" id="offer_description" placeholder="Ingresa la descripción de la vacante."/>
                                            <Label htmlFor="offer_responsabilities">Responsabilidades de la vacante:</Label>
                                            <Textarea className="w-[460px] border border-gray-400" id="offer_responsabilities" placeholder="Ingresa la descripción de la vacante."/>
                                            </div>
                                        </div>
                                        {error && <div className="text-red-500">{error}</div>}
                                        <div className='flex justify-center items-center'>
                                        <Button variant="destructive" className="w-1/4 mx-auto my-4" type="submit">
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
    )
}

export default CardUpdateOffer