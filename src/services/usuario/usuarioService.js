import * as API from "../utils/consts.js";

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

    return await fetch(API.BASEURL + "/register", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  } catch (e) {
    // Manejo de errores
  }
};