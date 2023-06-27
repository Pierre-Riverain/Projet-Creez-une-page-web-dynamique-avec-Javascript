const WORKS_KEY = "works";
const CATEGORIES_OF_WORKS_KEY = "categoriesOfWorks";

let connexionStatus;

export let works = window.localStorage.getItem(WORKS_KEY);
export let categoriesOfWorks = window.localStorage.getItem(CATEGORIES_OF_WORKS_KEY);

/*
    Cette fonction charge les données des travaux présent localement ou 
    s'il n'y aucune donnée présente localement, elle va les télécharger 
    depuis le serveur.
*/
export async function loadWorksDatas() {

    if (works === null) {
        const answer = await fetch("http://localhost:5678/api/works");
        works = await answer.json();

        const valueWorks = JSON.stringify(works);
        window.localStorage.setItem(WORKS_KEY, valueWorks);
    } else {
        works = JSON.parse(works);
    }
}

/*
    Cette fonction charge les données des catégories présent localement ou 
    s'il n'y aucune donnée présente localement, elle va les télécharger 
    depuis le serveur.
*/
export async function loadCategoriesOfWorksDatas() {
    if (categoriesOfWorks === null) {
        const answer = await fetch("http://localhost:5678/api/categories");
        categoriesOfWorks = await answer.json();

        const valuesCategoriesOfWorks = JSON.stringify(categoriesOfWorks);
        window.localStorage.setItem(CATEGORIES_OF_WORKS_KEY, valuesCategoriesOfWorks);
    } else {
        categoriesOfWorks = JSON.parse(categoriesOfWorks);
    }
}

/*
    Cette fonction envoie la requête de connexion.
*/
export async function logIn(login) {
    const answerLogIn = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: login
    });

    if (answerLogIn.ok) {
        connexionStatus = answerLogIn;
    }

    return answerLogIn;
}