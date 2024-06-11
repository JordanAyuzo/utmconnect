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
import { Button } from "@/components/ui/button";
import { obtenerVacante } from "@/services/vacantes/vacanteService";

function CardViewOffer({ offer_number }) {

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  //datos para obtener la oferta
  const [offerData, setOfferData] = useState({
    offer_id: "",
    empresa_rfc: "",
    offer_name: "",
    offer_description: "",
    offer_price: "",
    offer_start_date: "",
    offer_end_date: "",
    offer_work_mode: "",
    offer_address: "",
    offer_responsabilities: []
  });
  //obtener datos de la oferta 
  useEffect(() => {
    if (offer_number) {
      obtenerVacante(offer_number).then((data) => {
        if (data) {
          setOfferData({
            offer_id: data.offer_id,
            empresa_rfc: data.empresa_rfc,
            offer_name: data.offer_name,
            offer_description: data.offer_description,
            offer_price: data.offer_price,
            offer_start_date: data.offer_start_date,
            offer_end_date: data.offer_end_date,
            offer_work_mode: data.offer_work_mode,
            offer_address: data.offer_address,
            offer_responsabilities: data.offer_responsabilities
          });
        }
      });
    }
  }, []);

  return (


    <Card id="" className="center border rounded-lg shadow-lg p-4  ">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
        Vacante
      </h2>
      <CardHeader>
        <CardTitle>
          {offerData.offer_name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 items-start gap-6">
          <div className="space-y-2 text-left">
            <Label htmlFor="descripcion">Descripcion:</Label>
            <Input
              className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
              value={offerData.offer_description}
              id="descripcion"
              readOnly

            />
          </div>
          <div className="space-y-2 text-left">
            <Label>Responsabilidades:</Label>
            <ul className="list-disc pl-5 space-y-1">
              {offerData.offer_responsabilities.map((responsibility, index) => (
                <li key={index} className="font-medium">
                  {responsibility}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="offer_start_date">Fecha de inicio:</Label>
            <Input
              className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
              value={formatDate(offerData.offer_start_date)}
              id="offer_start_date"
              readOnly
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="offer_start_date">Fecha de Termino:</Label>
            <Input
              className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
              value={formatDate(offerData.offer_end_date)}
              id="offer_start_date"
              readOnly

            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="offer_work_mode">Modo de trabajo (presencial o remoto):</Label>
            <Input
              className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
              value={offerData.offer_work_mode}
              id="offer_work_mode"
              readOnly

            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="offer_work_mode">Direccion:</Label>
            <Input
              className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"

              value={offerData.offer_address}
              id="offer_work_mode"
              readOnly

            />

          </div>

        </div>
      </CardContent>
      <CardFooter className="flex justify-end">

      </CardFooter>
    </Card>
  );
}


export default CardViewOffer;