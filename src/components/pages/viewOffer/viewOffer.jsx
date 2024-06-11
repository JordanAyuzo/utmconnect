import React, { useState } from "react";
import NavbarStud from "@/components/layouts/navbar/navbarStud";
import CardViewOffer from  "@/components/layouts/cards/cardViewOffer";

function ViewOffer() {

  const offerNumber = sessionStorage.getItem("offerID")
  console.log(offerNumber)
  return (
    <div style={{ textAlign: "center" }}>
      <NavbarStud/>

    

        <CardViewOffer 
         offer_number={offerNumber}
        />

   
      
    </div>
  );
}

export default ViewOffer;
