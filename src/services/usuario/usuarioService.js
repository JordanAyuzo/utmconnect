import * as API from "../utils/consts.js";

export const obtenerUsuario = async (id) => {
  try {
    const response = await fetch(`${API.BASEURL}/user/${id}`, {
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

export const ingresar = async (user, pass) => {
  const user_json = {
    email: user,
    password: pass,
  };
  try {
    return await fetch(API.BASEURL + "/user/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_json),
    }).then((res) => res.json());
  } catch (e) {}
};

export const register = async (csvFile) => {
  try {
    const formData = new FormData();
    formData.append("file", csvFile);

        return await fetch(API.BASEURL + "/student/upload", {
            method: 'POST',
            body: formData
        })
        .then((res) => res.json());
    }
    catch (e) {
        // Manejo de errores
    }
}

export const cambiarPassword = async (id, oldPassword, newPassword) => {
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
    console.error("Error changing password:", e);
  }
};

export const uploadImage = async (id,image) => {
  console.log("Hace la consulta");
  try {
    const formData = new FormData();
    formData.append("file", image);
        return await fetch(`${API.BASEURL}/user/extra/image/${id}`, {
            method: 'POST',
            body: formData
        })
        .then((res) => res.json());
    }
    catch (e) {
    }
}
