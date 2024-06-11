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

export const modificarAlumno = async (id, alumno) => {
  try {
    const response = await fetch(`${API.BASEURL}/student/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alumno),
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.error("Error al modificar el alumno:", e);
  }
}

export const getAlumnosByCompany = async (rfc, status) => {
  try {
    return await fetch(`${API.BASEURL}/applicants?status=${status}&empresa_rfc=${rfc}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
}


export const changeAlumnosByCompanyStatus = async (id, status) => {
  try {
    return await fetch(`${API.BASEURL}/applicants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
}
export const getVacanteRecomendadas = async (id) => {
  try {
    const response = await fetch(`${API.BASEURL}/student/recommendedOffer/${id}`, {
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


//ver las vacantes que aun no ah aplicado: 
export const getVacanteSinAplicar = async (id) => {
  try {
    const response = await fetch(`${API.BASEURL}/applicants/free/${id}`, {
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

export const applicantToCompany = async (matricula, offerID) => {
  try {
    const response = await fetch(`${API.BASEURL}/applicants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matricula: matricula, offer_id: offerID }),
    });

    if (!response.ok) {
      // Lanza un error si la respuesta no es OK (2xx)
      const errorResponse = await response.json();
      throw new Error(`Error ${response.status}: ${errorResponse.message || response.statusText}`);
    }

    return await response.json();
  } catch (e) {
    console.error("Error al aplicar a la empresa: ", e);
    throw e; // Rethrow the error to be handled by the caller if needed
  }
};