"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registrarEmpresa } from '@/services/empresas/empresaService';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
  
  });

export function EmpresaForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      rfc: '',
      direccion: '',
      giro: '',
      descripcion: '',
      departamento: '',
    },
  });

  const [empresa, setEmpresa] = useState({
    name: '',
    paternal_sn: '',
    maternal_sn: '',
    email: '',
    rfc: '',
    password: '',
    access_date: "2024-05-22T12:34:56Z",
    user_type: "2",
    direccion: '',
    giro: '',
    descripcion: '',

    jefe_inmediato: "La calaca chida",
    departamento: '',
    status: '0' // ESPERA
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa({
      ...empresa,
      [name]: name === 'rfc' ? Number(value) : value,
    });
  };

  const onSubmit = async (data) => {
    try {
      const response = await registrarEmpresa({ ...empresa, ...data });
      if(response.status === 200) {
        alert('Empresa registrada correctamente');
      }else{
        alert('Hubo un error al registrar la empresa');
        console.log('', response);
      }
      
      // Aquí puedes manejar la respuesta, como redireccionar o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al registrar la empresa:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="titulo">Registro de Solicitud Empresas</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md w-full text-left flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} value={empresa.name} onChange={handleChange} placeholder="Nombre" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} value={empresa.email} onChange={handleChange} placeholder="Email" type="email" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rfc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RFC</FormLabel>
                <FormControl>
                  <Input {...field} value={empresa.rfc} onChange={handleChange} placeholder="RFC" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input {...field} value={empresa.direccion} onChange={handleChange} placeholder="Dirección" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="giro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giro</FormLabel>
                <FormControl>
                  <Input {...field} value={empresa.giro} onChange={handleChange} placeholder="Giro" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input {...field} value={empresa.descripcion} onChange={handleChange} placeholder="Descripción" required maxLength={150} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departamento</FormLabel>
                <FormControl>
                  <Input {...field} value={empresa.departamento} onChange={handleChange} placeholder="Departamento" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Enviar Solicitud</Button>
        </form>
      </Form>
    </main>
  );
}

export default EmpresaForm;
