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

export const obtenerAlumno = async (id) => {
  try {
    const response = await fetch(`${API.BASEURL}/student/${id}`, {
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



export const uploadCV = async (cvFile) => {
  try {
    const formData = new FormData();
    formData.append("file", cvFile);

        return await fetch(API.BASEURL + "/student/uploadCV", {
            method: 'POST',
            body: formData
        })
        .then((res) => res.json());
    }
    catch (e) {
        // Manejo de errores
    }
}