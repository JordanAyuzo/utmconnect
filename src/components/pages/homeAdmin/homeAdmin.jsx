import React, { useState } from "react";
import "./homeAdmin.css";
import NavbarAdmin from "@/components/layouts/navbar/navbarAdmin";
import TableAlumnos from "@/components/layouts/tables/tableAlumnos";

function HomeAdmin() {
  return (
    <div>
      <NavbarAdmin />
      <TableAlumnos />
    </div>
  );
}

export default HomeAdmin;