import * as API from "../utils/consts.js";

export const getHistorialAlumno = async () => {
  try {
    return await fetch(API.BASEURL + "/applicants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
};

export const obtenerHistorialAlumno = async (id) => {
  try {
    return await fetch(API.BASEURL + `/applicants/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
}

export const eliminarHistorialAlumno = async (id) => {
  try {
    return await fetch(`${API.BASEURL}/applicants/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    console.error("Error al eliminar la vacante postulado del alumno:", e);
  }
};

export const updateHistorialAlumno = async (id, updateHistorialAlumnoDto) => {
  try {
    const response = await fetch(`${API.BASEURL}/applicants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateHistorialAlumnoDto),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el historial del alumno");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar el historial del alumno:", error);
    throw error;
  }
}