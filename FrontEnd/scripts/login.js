import { logIn } from "./datas.js";
/*
    Cette fonction initalise le listener du formulaire de connexion.
*/
function initLogin() {
    const formLogIn = document.querySelector("#login-form");
    formLogIn.addEventListener("submit", (event) => {
        event.preventDefault();
        const login = {
            email: document.getElementById("login-e-mail").value,
            password: document.getElementById("login-mot-de-passe").value
        };

        const loginToJson = JSON.stringify(login);

        logIn(loginToJson);
    });
}

initLogin();