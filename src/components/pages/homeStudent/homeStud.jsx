import React, { useState } from "react";
import NavbarStud from "@/components/layouts/navbar/navbarStud";
import TableAlumnos from "@/components/layouts/tables/tableAlumnos";

function HomeStud() {
  return (
    <div>
      <NavbarStud/>
      <h1>Bienvenido a la pagina Principal</h1>
    </div>
  );
}

export default HomeStud;