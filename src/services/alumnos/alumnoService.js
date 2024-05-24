import * as API from "../utils/consts.js";

export const getAlumnos = async () => {
  try {
    return await fetch(API.BASEURL + "/student", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
};