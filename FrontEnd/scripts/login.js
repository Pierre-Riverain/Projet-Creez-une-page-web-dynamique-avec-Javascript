import { logIn, LOCAL_STORAGE_CONNEXION_STATUS_KEY } from "./datas.js";
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

        let isConnected = logIn(loginToJson);
        window.localStorage.setItem(LOCAL_STORAGE_CONNEXION_STATUS_KEY, new Boolean(isConnected).toString());

        if (isConnected) {
            console.log("[LOGIN] Connecté avec succès !");
            showLoginMessage("Vous êtes connecté(e) avec succès !", "validate");
            document.location.href = "http://localhost:5501/FrontEnd/index.html";
        } else {
            showLoginMessage("Erreur dans l’identifiant ou le mot de passe.", "error");
        }
    });
}

initLogin();

/*
    Cette fonction permet d'afficher un message pour le login.
*/
function showLoginMessage(messageText, messageLevel) {
    let messageContainer = document.querySelector(".messageContainer");

    if (messageContainer === null || messageContainer === undefined) {
        messageContainer = document.createElement("div");
        messageContainer.classList.add("messageContainer");

        document.querySelector("#login").appendChild(messageContainer);
    }

    switch (messageLevel) {
        case "error":
            messageContainer.style.color = "red";
            break;
        case "validate":
            messageContainer.style.color = "green";
            break;
        default:
            messageContainer.style.color = "black";
            break;
    }
    messageContainer.innerHTML = messageText;
}