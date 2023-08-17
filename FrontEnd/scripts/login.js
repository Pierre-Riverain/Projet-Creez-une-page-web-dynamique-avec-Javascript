
/*
    Cette fonction envoie la requête de connexion et enregistre le résultat obtenu du
    serveur.
*/
async function logIn(login) {

    const answerLogIn = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: login
    });

    return answerLogIn;
}

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

        logIn(loginToJson).then((answer) => {
            if (answer.ok) {
                return answer.json();
            } else {
                switch (answer.status) {
                    case 401:
                        showLoginMessage("Le mot de passe est incorrect. Veuillez rééssayer.", "error");
                        break;
                    case 404:
                        showLoginMessage("Vos coordonnées n'ont pas été reconnues. Veuillez rééssayer.", "error");
                        break;
                }
                return;
            }
        }).then((valueAnswer) => {
            if(valueAnswer !== null || valueAnswer !== undefined) {
                localStorage.setItem("token", valueAnswer.token);
                localStorage.setItem("userId", valueAnswer.userId);
                showLoginMessage("Vous êtes connecté(e) avec succès !", "validate");

                document.location.href = "./index.html";
            }
        });
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