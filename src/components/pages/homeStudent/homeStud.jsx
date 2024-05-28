import React, { useState } from "react";
import NavbarStud from "@/components/layouts/navbar/navbarStud";


function HomeStud() {
  return (
    <div style={{ textAlign: "center" }}>
      <NavbarStud/>
      <h1 style={{ fontSize: "2em" }}>Bienvenido a la página Principal</h1>
      <img src="https://i.ibb.co/C8j8y3r/01-UTM-02.png" alt="Escudo UTM" style={{ width: "80%", maxWidth: "600px", margin: "auto" }} />
      
    </div>
  );
}

export default HomeStud;
