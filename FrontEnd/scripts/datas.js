const LOCAL_STORAGE_WORKS_KEY = "works";
const LOCAL_STORAGE_CATEGORIES_OF_WORKS_KEY = "categoriesOfWorks";

export let works = null;
export let categoriesOfWorks = null;

let idAvailable = 1;

/*
    Cette fonction charge les données des travaux présent localement ou 
    s'il n'y aucune donnée présente localement, elle va les télécharger 
    depuis le serveur.
*/
export async function loadWorksDatas() {
    // works = window.localStorage.getItem(LOCAL_STORAGE_WORKS_KEY);

    if (works === null) {
        const answer = await fetch("http://localhost:5678/api/works");
        works = await answer.json();

        const valueWorks = JSON.stringify(works);
        localStorage.setItem(LOCAL_STORAGE_WORKS_KEY, valueWorks);
    } else {
        works = JSON.parse(works);
    }
    idAvailable = works[works.length-1].id + 1;
}

/*
    Cette fonction charge les données des catégories présent localement ou 
    s'il n'y aucune donnée présente localement, elle va les télécharger 
    depuis le serveur.
*/
export async function loadCategoriesOfWorksDatas() {
    categoriesOfWorks = window.localStorage.getItem(LOCAL_STORAGE_CATEGORIES_OF_WORKS_KEY);

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
    Cette fonction va mettre à jour la liste des travaux.
*/
export function setWorks(worksToUpdate) {
    works = worksToUpdate;
}

/*
    Ce constructeur permet de créer un nouveau "travail" / une nouvelle photo à intégrer dans la galerie. 
*/
export function Work() {
    this.id = idAvailable++;
    this.title = "";
    this.imageUrl = "";
    this.categoryId = 0;
    this.userId = localStorage.getItem("userId");
    this.category = {}
}

/*
    Cette fonction permet d'obtenir une catégorie suivant son identifiant.
*/
export function getCategoryById(id) {
    let categoryOfWork;
    categoriesOfWorks.forEach(categoryOfWorkTemp => {
        if (Number(categoryOfWorkTemp.id) === Number(id)) {
            categoryOfWork = categoryOfWorkTemp;
        }
    });

    return categoryOfWork;
}