import React, { useEffect, useState } from "react";
import { getVacanteForAlumnos } from "@/services/vacantes/vacanteService";
import { applicantToCompany } from "@/services/alumnos/alumnoService";
import { getVacanteRecomendadas } from "@/services/alumnos/alumnoService"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { AlertDialog, AlertDialogCancel, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { obtenerVacante } from "@/services/vacantes/vacanteService";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {getVacanteSinAplicar} from "@/services/alumnos/alumnoService"
import {obtenerEmpresa} from "@/services/empresas/empresaService"
import { DessertIcon } from "lucide-react";









function TableEmpresasForAlumnos({ tipoVacante }) {
  const [vacantes, setVacantes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const vacantesPerPage = 5;
  let error = null;
  let offerID = 0;
  const userNumber = sessionStorage.getItem("userNumber");

  
  // Definir la función fetchVacantes
  const fetchVacantes = async () => {
    try {
      let res;
      if (tipoVacante === 1) {
        res = await getVacanteSinAplicar(userNumber);
  
        if (res.unappliedOffers) {
          setVacantes(res.unappliedOffers);
        }
      } else {
        res = await getVacanteRecomendadas(userNumber);
        setVacantes(res);
      }
    } catch (err) {
      console.error('Ocurrió un error al obtener las vacantes:', err);
      setError('No se pudo encontrar al estudiante.');
    }
  };

    // Llamar a fetchVacantes al inicio del componente
    useEffect(() => {
      fetchVacantes();
    }, [userNumber]);
  

  const indexOfLastVacante = currentPage * vacantesPerPage;
  const indexOfFirstVacante = indexOfLastVacante - vacantesPerPage;
  let currentVacantes = [];
  if (vacantes.length > 0) {

    currentVacantes = vacantes.slice(indexOfFirstVacante, indexOfLastVacante);
  }



  //DATOS DE LA OFERTA: 

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


  const obtenerVacanteA = async (offerId) => {
    try {
      const data = await obtenerVacante(offerId);
      console.log(data);
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
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        type: 'error',
        title: 'Error al obtener la vacante',
        message: 'Estamos trabajando en ello',
      });
    }
  }


  const applyToCompany = async (matricula, offerID) => {
    try {
      const response = await applicantToCompany(matricula, offerID);
      if (response.message) {
        setAlert({
          show: true,
          type: 'success',
          title: 'Aplicación exitosa',
          message: 'Revisa tu status y tu correo por posibles respuestas.',
        });
      
      }
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        type: 'error',
        title: 'Error al aplicar a la vacante',
        message: 'Estamos trabajando en ello',
      });
    }
  };
  const closeAlert = () => {
    setAlert({ show: false, title: '', description: '' });
    window.location.reload();
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //cuando se de click en el boton de ver se guardara en cache el numero de la oferta: 



     //datos para obtener la oferta
     const [companyData, setCompanyData] = useState({
      name: "",
      departamento: "",
      descripcion : ""
  
    });
  
  //servicio para obtener la empresa: 

const obtenerEmpresaRFC = async (rfc) => {

  try {
    const response = await obtenerEmpresa(rfc);
    console.log(response);
    if(response){
      setCompanyData({
        name: response.name,
        departamento: response.departamento,
        descripcion : response.descripcion

      })
    }
  } catch (error) {
    console.log(error);
    setAlert({
      show: true,
      type: 'error',
      title: 'Error al obtener empresa',
      message: 'Estamos trabajando en ello',
    });
  } 
   }


  return (
    <div>
      {error && <p>{error}</p>}
      {!error && vacantes.length > 0 ? (
        <>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold">
            Lista de vacantes
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre vacante</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Salario</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentVacantes.map((vacante) => (
                <TableRow key={vacante.offer_id}>
                  <TableCell>{vacante.offer_name}</TableCell>
                  <TableCell>{vacante.offer_description}</TableCell>
                  <TableCell>{vacante.offer_address}</TableCell>
                  <TableCell>{vacante.offer_price}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex space-x-2">
                      <AlertDialog >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="secondary"
                            className="mr-2"
                            onClick={() => {obtenerVacanteA(vacante.offer_id)
                                     obtenerEmpresaRFC(vacante.empresa_rfc)}
                              }  
                          >
                            Ver
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="flex flex-col items-center w-full">
                          <AlertDialogHeader>
                          </AlertDialogHeader>
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
                                  <Label htmlFor="descripcion">Nombre Empresa:</Label>
                                  <Input
                                    className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
                                    value={companyData.name}
                                    id="descripcion"
                                    readOnly

                                  />
                                </div>
                                <div className="space-y-2 text-left">
                                 <Label htmlFor="descripcion">Departamento Empresa:</Label>
                                  <Input
                                    className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
                                    value={companyData.departamento}
                                    id="descripcion"
                                    readOnly

                                  />
                                </div> 
                                <div className="space-y-2 text-left">
                                 <Label htmlFor="descripcion">Descripcion  Empresa:</Label>
                                  <Input
                                    className="border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
                                    value={companyData.descripcion}
                                    id="descripcion"
                                    readOnly

                                  />
                                </div> 
                                <div className=" space-y-2 text-left">
                                  <Label htmlFor="descripcion">Descripcion Vacante:</Label>
                                  <Input
                                  //mas grande el input 
                                    className=" border border-gray-400 rounded bg-gray-100 cursor-not-allowed font-bold"
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

                          <AlertDialogFooter className="flex justify-center">
                            <AlertDialogCancel>Salir</AlertDialogCancel>

                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>


                  </TableCell>

                  <TableCell className="text-center">

                    <Button
                      onClick={() => {
                        const matricula = Number(sessionStorage.getItem('matricula'));
                        offerID = Number(vacante.offer_id);
                        if (!isNaN(matricula) && !isNaN(offerID)) {
                          applyToCompany(matricula, offerID);
                          fetch 
                          
                         
                          
                        } else {
                          alert("Error: matricula u offerID no son válidos.")
                        }
                      }}
                    >
                      Aplicar
                    </Button>

                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      paginate(currentPage - 1);
                    }
                  }}
                >
                  Anterior
                </PaginationLink>
              </PaginationItem>
              {[...Array(Math.ceil(vacantes.length / vacantesPerPage)).keys()].map(
                (num) => (
                  <PaginationItem key={num}>
                    <PaginationLink href="#" onClick={() => paginate(num + 1)}>
                      {num + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem
                disabled={
                  currentPage === Math.ceil(vacantes.length / vacantesPerPage)
                }
              >
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      currentPage < Math.ceil(vacantes.length / vacantesPerPage)
                    ) {
                      paginate(currentPage + 1);
                    }
                  }}
                >
                  Siguiente
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        !error && <><h2 className="text-2xl text-center font-semibold">No hay vacantes recomendadas.</h2><img src="https://i.ibb.co/C8j8y3r/01-UTM-02.png" alt="Escudo UTM" style={{ width: "60%", maxWidth: "400px", margin: "auto" }} /></>

      )

      }
      {alert.show && (

        <AlertDialog open={alert.show} onOpenChange={closeAlert}>
          <AlertDialogContent className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <AlertDialogHeader className="text-center">
              <AlertDialogTitle className="text-xl font-bold mb-2">{alert.title}</AlertDialogTitle>
              <AlertDialogDescription className="text-sm">
                {alert.message}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-center">
              <AlertDialogCancel onClick={ closeAlert} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                Cerrar
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      )}

    </div>
  );
}

export default TableEmpresasForAlumnos;
