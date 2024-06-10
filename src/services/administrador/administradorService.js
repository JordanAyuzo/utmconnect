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

export const registerAdmins = async (numberA, name, pname, mname, mail, pass) => {
  const date = new Date();
  const user_json = {
    user_type:'0',
    user_number: parseInt(numberA, 10), 
    name: name,
    paternal_sn : pname,
    maternal_sn : mname,
    email: mail,
    password : pass,
    access_date: date.toString(),
  };
  try {
    return await fetch(API.BASEURL + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_json),
    }).then((res) => res.json());
  } catch (e) {}
};

export const obtenerAdmin = async (id) => {
  try {
    return await fetch(`${API.BASEURL}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    console.error("Error al obtener la informacion del administrador:", e);
  }
};

export const updateAdmins = async (id, oldPassword, newPassword) => {

  const passwordData = {
    password: oldPassword,
    new_password: newPassword,
  };

  try {
    const response = await fetch(`${API.BASEURL}/user/update-password/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    });

    return await response.json();
  } catch (e) {
    console.error("Error al cambiar la contraseña:", e);
  }
};

export const eliminarAdmins = async (id) => {
  try {
    return await fetch(`${API.BASEURL}/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (e) {
    console.error("Error al eliminar el administrador:", e);
  }
}