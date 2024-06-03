import { React, useState } from "react";
import "./homeEmpresa.css";
import NavbarEmpresa from "@/components/layouts/navbar/navbarEmpresa";
import TableAlumnosApplicant from "@/components/layouts/tables/tableAlumnosApplicant";

function HomeEmpresa() {
  return (
    <div>
      <NavbarEmpresa />
      <div className="container mx-auto">
        <TableAlumnosApplicant />
      </div>
    </div>
  );
}

export default HomeEmpresa;