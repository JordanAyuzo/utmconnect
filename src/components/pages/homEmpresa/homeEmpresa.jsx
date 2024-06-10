import { React, useState } from "react";
import "./homeEmpresa.css";
import NavbarEmpresa from "@/components/layouts/navbar/navbarEmpresa";
import TableAlumnosApplicant from "@/components/layouts/tables/tableAlumnosApplicant";
import TableAlumnosApplicantAcepted from "@/components/layouts/tables/tableAlumnosApplicantAcepted";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function HomeEmpresa() {
  return (
    <div>
      <NavbarEmpresa />
      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <Tabs defaultValue="revisar" className="mx-auto p-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="revisar">Solicitudes de alumnos</TabsTrigger>
              <TabsTrigger value="empresas">Lista de alumnos</TabsTrigger>
            </TabsList>
            <TabsContent value="revisar">
              <Card>
                <CardHeader>
                  <CardTitle>Revisar solicitutes de alumnos</CardTitle>
                  <CardDescription>
                    Revisa las solicitudes de alumnos que han aplicado a tus vacantes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 flex justify-center">
                  <div className="space-y-1 w-full">
                    <TableAlumnosApplicant />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="empresas">
              <Card>
                <CardHeader>
                  <CardTitle>Lista de alumnos</CardTitle>
                  <CardDescription>
                    Lista de alumnos que han sido aceptados en tus vacantes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <TableAlumnosApplicantAcepted />
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

export default HomeEmpresa;