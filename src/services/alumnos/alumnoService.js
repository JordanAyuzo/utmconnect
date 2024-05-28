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



export const uploadCV = async (cvFile,id) => {
  try {
    const formData = new FormData();
    formData.append("file", cvFile);
        return await fetch(`${API.BASEURL}/student/extra/cv/${id}`, {
            method: 'POST',
            body: formData
        })
        .then((res) => res.json());
    }
    catch (e) {
    }
}

export const getCV= async (id) => {
  try {
    const response = await fetch(`${API.BASEURL}/student/extra/cv/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (e) {
    console.error("Error fetching cv:", e);
  }
};


export const guardarInfo = async (id, info, option) => {
  let info_json = {};
  if (option === 1) {
    info_json = { habilidades:info };
  } else {
    info_json = { about: info };
  }
  console.log(info_json);
  try {
    const response = await fetch(`${API.BASEURL}/student/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info_json),
    });

    if (!response.ok) {
      throw new Error("Error al guardar la información");
    }

    return await response.json();
  } catch (e) {
    console.error("Error al guardar la información:", e);
    throw e;  // Propagar el error para que pueda ser manejado donde se llame a la función
  }
};
