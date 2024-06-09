import { Home } from "lucide-react";
import * as API from "../utils/consts.js";

export const getVacante = async () => {
  try {
    return await fetch(API.BASEURL + "/offers?active=true", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
};

export const registrarVacante = async (
  empresaRFC,
  offerName,
  offerDescription,
  offerPrice,
  offerWM,
  offerAddress,
  offerResponsabilities,
  startDate,
  endDate
) => {
  const user_json = {
    empresa_rfc: parseInt(empresaRFC, 10),
    offer_name: offerName,
    offer_description: offerDescription,
    offer_price: parseInt(offerPrice, 10),
    offer_start_date: startDate.toString(),
    offer_end_date: endDate.toString(),
    offer_work_mode: "Home_office",
    offer_address: offerAddress,
    offer_responsabilities: [offerResponsabilities],
  };
  try {
    return await fetch(API.BASEURL + "/offers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_json),
    }).then((res) => res.json());
  } catch (e) {}
};

export const eliminarVacante = async (id) => {
  try {
    return await fetch(`${API.BASEURL}/offers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    console.error("Error al eliminar la vacante:", e);
  }
};

export const obtenerVacante = async (id) => {
  try {
    const response = await fetch(`${API.BASEURL}/offers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (e) {
    console.error("Error fetching user data:", e);
  }
};

export const updateOffer = async (id, updateOfferDto) => {
  try {
    const response = await fetch(`${API.BASEURL}/offers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateOfferDto),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la vacante");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar la vacante:", error);
    throw error;
  }
};

export const getVacanteForAlumnos = async () => {
  try {
    return await fetch(API.BASEURL + "/offers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
}