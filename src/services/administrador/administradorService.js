import * as API from "../utils/consts.js";

export const getAdministrador = async () => {
  try {
    return await fetch(API.BASEURL + "/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
};