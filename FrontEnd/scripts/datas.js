const LOCAL_STORAGE_WORKS_KEY = "works";
const LOCAL_STORAGE_CATEGORIES_OF_WORKS_KEY = "categoriesOfWorks";

export let works = null;
export let categoriesOfWorks = null;

let idAvailable = 1;
localStorage.removeItem(LOCAL_STORAGE_WORKS_KEY);

/*
    Cette fonction charge les données des travaux présent localement ou 
    s'il n'y aucune donnée présente localement, elle va les télécharger 
    depuis le serveur.
*/
export async function loadWorksDatas() {
    works = window.localStorage.getItem(LOCAL_STORAGE_WORKS_KEY);

    if (works === null) {
        const answer = await fetch("http://localhost:5678/api/works");
        works = await answer.json();

        const valueWorks = JSON.stringify(works);
        localStorage.setItem(LOCAL_STORAGE_WORKS_KEY, valueWorks);
    } else {
        works = JSON.parse(works);
    }
    idAvailable = works[works.length - 1].id + 1;
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
    Cette fonction va mettre à jour l'affichage de la liste des travaux sur la page web. 
    Le premier paramètre de cette fonction prend en valeur le container où seront ajoutés les travaux, et le second, qui est facultatiif (false par défaut)
    indique s'il faut appliquer la mise en page éditeur.
*/
export function updateWorksDisplay(worksList, containerElementIdentifier, editorMode = false) {
    const containerElement = document.querySelector(containerElementIdentifier);
    containerElement.innerHTML = "";

    for (let i = 0; i < worksList.length; i++) {
        const work = worksList[i];

        containerElement.appendChild(createWorkDisplay(work, editorMode));
    }
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

/*
    Cette fonction va créé un élément HTML figure qui va afficher le travail passé en paramètres.
*/
export function createWorkDisplay(work, editorMode = false) {
    const figureElement = document.createElement("figure");

    const imageElement = document.createElement("img");

    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;

    const figcaptionElement = document.createElement("figcaption");
    if (editorMode) {
        figureElement.id = `work-${work.id}-editor`;

        const figureButtonsContainerElement = document.createElement("div");
        figureButtonsContainerElement.classList.add("figure-buttons-container");

        const trashElement = document.createElement("i");
        trashElement.classList.add("fa-solid");
        trashElement.classList.add("fa-trash-can");
        trashElement.classList.add("btn-trash");
        trashElement.dataset.id = work.id;
        trashElement.addEventListener("click", event => {
            const selectedWork = works.filter(currentWork => {
                return Number(currentWork.id) === Number(event.target.dataset.id);
            });
            deleteWork(selectedWork[0]);
        });
        figureButtonsContainerElement.appendChild(trashElement);
        figureElement.appendChild(figureButtonsContainerElement);
        figcaptionElement.innerText = "éditer";
    } else {
        figureElement.id = `work-${work.id}`;

        figcaptionElement.innerText = work.title;
    }
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);

    return figureElement;
}

/*
    Cette fonction va envoyer une requête d'un nouveau travail au serveur.
*/
export function createNewWork(work, imageFile) {
    const newWorkDatas = new FormData();
    newWorkDatas.append("image", imageFile);
    newWorkDatas.append("title", work.title);
    newWorkDatas.append("category", work.category.id);

    document.querySelector(`.gallery`).appendChild(createWorkDisplay(work));
    document.querySelector(`.gallery-editor`).appendChild(createWorkDisplay(work, true));

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: new Headers({ "Authorization": `Bearer ${localStorage.getItem("token")}` }),
        body: newWorkDatas
    }).then(result => {
    });

    works.push(work);

    saveListeOfWorksInLocalStorage();
}

/*
    Cette fonction va envoyer une requête d'une suppression d'un travail au serveur.
*/
export function deleteWork(work) {
    
    document.getElementById(`work-${work.id}`).remove();
    document.getElementById(`work-${work.id}-editor`).remove();
    
    fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: "DELETE",
        headers: new Headers({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
    }).then(result => {
    });
    
    const workFiltered = works.filter(workToFilter => {
        return Number(workToFilter.id) !== Number(work.id);
    });
    works = workFiltered;

    saveListeOfWorksInLocalStorage();
}

/*
    Cette fonction permet d'enregistrer localement les modifications apportés.
*/
function saveListeOfWorksInLocalStorage() {
    const valueWorks = JSON.stringify(works);
    localStorage.setItem(LOCAL_STORAGE_WORKS_KEY, valueWorks);
}