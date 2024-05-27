import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavbarAdmin from "@/components/layouts/navbar/navbarAdmin";
import TableEmpresas from "@/components/layouts/tables/tableEmpresas";
import TableEmpresasApplicant from "@/components/layouts/tables/tableEmpresasApplicant";
import { useState, useEffect } from "react";
import { getEmpresasAplicant } from "@/services/empresas/empresaService";

function PageEmpresas() {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    getEmpresasAplicant().then(setEmpresas);
  }, []);

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
        <div className="w-full max-w-6xl">
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
                <CardContent className="space-y-2 flex justify-center">
                  <div className="space-y-1 w-full">
                    <TableEmpresasApplicant />
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