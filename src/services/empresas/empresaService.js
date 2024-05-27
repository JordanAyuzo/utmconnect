import * as API from "../utils/consts.js";


export const registrarEmpresa = async (empresaData) => {
  try {
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