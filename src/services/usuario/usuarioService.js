import * as API from "../utils/consts.js"

export const ingresar = async (user, pass) => {
    const user_json = {
        "user": user,
        "pass": pass
    }
    try {
        return await fetch(API.BASEURL + "v1/user/sign-in", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user_json)
        })
            .then((res) => res.json())
    }
    catch (e) {
    }
}