const LOCAL_STORAGE_WORKS_KEY = "works";
const LOCAL_STORAGE_CATEGORIES_OF_WORKS_KEY = "categoriesOfWorks";
const LOCAL_STORAGE_CONNEXION_KEY = "connected";

export let works = window.localStorage.getItem(LOCAL_STORAGE_WORKS_KEY);
export let categoriesOfWorks = window.localStorage.getItem(LOCAL_STORAGE_CATEGORIES_OF_WORKS_KEY);

let listOfConnexionListeners = [];

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
        localStorage.setItem(LOCAL_STORAGE_WORKS_KEY, valueWorks);
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
        localStorage.setItem(LOCAL_STORAGE_CATEGORIES_OF_WORKS_KEY, valuesCategoriesOfWorks);
    } else {
        categoriesOfWorks = JSON.parse(categoriesOfWorks);
    }
}

/*
    Cette fonction va sauvegarder les données modifiées au serveur et localement.
*/
export async function saveModifiedDatas(datasModified) {
    
}