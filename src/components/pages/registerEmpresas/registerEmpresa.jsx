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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

const formSchema = z.object({
  name: z.string().nonempty({ message: "El nombre es obligatorio" }),
  email: z.string().email({ message: "Email no válido" }).nonempty({ message: "El email es obligatorio" }),
  rfc: z.coerce.number({ message: "El RFC es obligatorio" }),
  direccion: z.string().nonempty({ message: "La dirección es obligatoria" }),
  giro: z.string().nonempty({ message: "El giro es obligatorio" }),
  descripcion: z.string().max(150, { message: "La descripción no debe superar los 150 caracteres" }).nonempty({ message: "La descripción es obligatoria" }),
  departamento: z.string().nonempty({ message: "El departamento es obligatorio" }),
});

export function EmpresaForm() {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      rfc: 0,
      direccion: '',
      giro: '',
      descripcion: '',
      departamento: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await registrarEmpresa({ ...data, access_date: "2024-05-22T12:34:56Z", user_type: "2", jefe_inmediato: "La calaca chida", status: '0' });
      console.log(response);
      alert(response.message)
      navigate("/")
    } catch (error) {
      console.error('Error al registrar la empresa:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="titulo text-2xl font-bold mb-8">Registro de Solicitud Empresas</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md w-full text-left flex flex-col gap-4">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nombre" required className="border-2 border-gray-400 focus:border-gray-600" />
                  </FormControl>
                  <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" type="email" required className="border-2 border-gray-400 focus:border-gray-600" />
                  </FormControl>
                  <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="rfc"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>RFC</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="RFC" required className="border-2 border-gray-400 focus:border-gray-600" />
                  </FormControl>
                  <FormMessage>{form.formState.errors.rfc?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Dirección" required className="border-2 border-gray-400 focus:border-gray-600" />
                  </FormControl>
                  <FormMessage>{form.formState.errors.direccion?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="giro"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Giro</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Giro" required className="border-2 border-gray-400 focus:border-gray-600" />
                  </FormControl>
                  <FormMessage>{form.formState.errors.giro?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Descripción" required maxLength={150} className="border-2 border-gray-400 focus:border-gray-600" />
                  </FormControl>
                  <FormMessage>{form.formState.errors.descripcion?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="departamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departamento</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Departamento" required className="border-2 border-gray-400 focus:border-gray-600" />
                </FormControl>
                <FormMessage>{form.formState.errors.departamento?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4">Enviar Solicitud</Button>
        </form>
      </Form>
    </main>
  );
}

export default EmpresaForm;
