import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from  "@/components/ui/alert-dialog";
import NavbarAdmin from "@/components/layouts/navbar/navbarAdmin";
import TableEmpresas from "@/components/layouts/tables/tableEmpresas";

function PageEmpresas() {
  const empresas = [
    {
      id: 1,
      nombre: "Empresa 1",
      imagen: "url-de-la-imagen-1",
      descripcion: "Descripción de la Empresa 1",
    },
    {
      id: 2,
      nombre: "Empresa 2",
      imagen: "url-de-la-imagen-2",
      descripcion: "Descripción de la Empresa 2",
    },
    {
      id: 3,
      nombre: "Empresa 3",
      imagen: "url-de-la-imagen-3",
      descripcion: "Descripción de la Empresa 3",
    },
  ];

  const aceptarEmpresa = (id) => {
    console.log(`Empresa con id ${id} aceptada`);
  };

  const rechazarEmpresa = (id) => {
    console.log(`Empresa con id ${id} rechazada`);
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <Tabs defaultValue="revisar" className="mx-auto p-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="revisar">Solicitudes de empresas</TabsTrigger>
              <TabsTrigger value="empresas">Lista de empresas</TabsTrigger>
            </TabsList>
            <TabsContent value="revisar">
              <Card>
                <CardHeader>
                  <CardTitle>Revisar solicitutes de empresas</CardTitle>
                  <CardDescription>
                    Revisa las solicitudes de empresas que desean colaborar con
                    la institución.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    {empresas.map((empresa) => (
                      <div
                        key={empresa.id}
                        className="flex items-center justify-between"
                      >
                        <h2>{empresa.nombre}</h2>
                        <div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="secondary"
                                className="mr-2"
                                onClick={() => console.log("Info")}
                              >
                                Info
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="flex flex-col items-center">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-center">
                                  Información de la empresa
                                </AlertDialogTitle>
                                <img
                                  src={empresa.imagen}
                                  alt={empresa.nombre}
                                />
                                <AlertDialogDescription className="text-center">
                                  {empresa.descripcion}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex justify-center">
                                <AlertDialogCancel>Cerrar</AlertDialogCancel>
                                <AlertDialogAction>Continuar</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <Button
                            className="mr-2"
                            onClick={() => aceptarEmpresa(empresa.id)}
                          >
                            Aceptar
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => rechazarEmpresa(empresa.id)}
                          >
                            Rechazar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="empresas">
              <Card>
                <CardHeader>
                  <CardTitle>Lista de empresas</CardTitle>
                  <CardDescription>
                    Lista de empresas que colaboran con la institución.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <TableEmpresas />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default PageEmpresas;