import * as API from "../utils/consts.js";

export const registrarEmpresa = async (empresaData) => {
  try {
    console.log(empresaData);
    return await fetch(API.BASEURL + "/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empresaData),
    }).then((res) => res.json());
  } catch (e) {
    console.error("Error registering empresa:", e);
    throw e;
  }
};

export const getEmpresas = async () => {
  try {
    return await fetch(API.BASEURL + "/company?status=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
};

export const getEmpresasAplicant = async () => {
  try {
    return await fetch(API.BASEURL + "/company?status=0", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
}

// Función para cambiar el estado de la empresa: 0 = pendiente, 1 = aprobado, 2 = rechazado, de tipo PATCH
export const changeStatusEmpresa = async (idEmpresa, status) => {
  try {
    return await fetch(API.BASEURL + `/company/${idEmpresa}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    }).then((res) => res.json());
  } catch (e) {
    console.error("Error changing status empresa:", e);
  }
};