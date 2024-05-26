import * as API from "../utils/consts.js";

export const getEmpresas = async () => {
  try {
    return await fetch(API.BASEURL + "/company", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
};

export const getEmpresasPendientes = async () => {
  try {
    return await fetch(API.BASEURL + "/company/applicant", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
};

export const aceptarEmpresa = async (id) => {
  try {
    return await fetch(API.BASEURL + `/company/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
};

export const rechazarEmpresa = async (id) => {
  try {
    return await fetch(API.BASEURL + `/company/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
}