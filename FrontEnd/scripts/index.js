import { loadWorksDatas, loadCategoriesOfWorksDatas, works, categoriesOfWorks, LOCAL_STORAGE_CONNEXION_STATUS_KEY } from "./datas.js";
import { editorMode } from "./editor.js";

await loadWorksDatas();
await loadCategoriesOfWorksDatas();

/*  
    Cette fonction va mettre à jour l'affichage de la liste des travaux sur la page web. 
    Le premier paramètre de cette fonction prend en valeur la liste des travaux, le second prend
    en valeur le container où seront ajoutés les travaux.
*/
function updateWorksDisplay(works, containerElementIdentifier) {
    const containerElement = document.querySelector(containerElementIdentifier);
    containerElement.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
        const work = works[i];

        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        figureElement.appendChild(imageElement);

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = work.title;
        figureElement.appendChild(figcaptionElement);

        containerElement.appendChild(figureElement);
    }
}

updateWorksDisplay(works,".gallery");

/*
    Cette fonction initialise les filtres en ajoutant les boutons 
*/
function initButtonsFilter(btnSelected) {

    const filtersContainer = document.querySelector(".filters");

    const buttonNoFilter = document.createElement("input");
    buttonNoFilter.type = "submit";
    buttonNoFilter.value = "Tous";
    buttonNoFilter.classList.add("btn");
    buttonNoFilter.classList.add("btn_selected");
    buttonNoFilter.addEventListener("click", (event) => {

        document.querySelector(".filters .btn_selected").classList.remove("btn_selected");
        event.target.classList.add("btn_selected");

        updateWorksDisplay(works, ".gallery");
    });
    filtersContainer.appendChild(buttonNoFilter);

    for (let i = 0; i < categoriesOfWorks.length; i++) {

        const buttonFilter = document.createElement("input");
        buttonFilter.type = "submit";
        buttonFilter.classList.add("btn");

        const categoryOfWork = categoriesOfWorks[i];

        if (i === 3) {
            buttonFilter.value = "Hôtels & restaurants";
        } else {
            buttonFilter.value = categoryOfWork.name;
        }
        buttonFilter.dataset.categoryOfWork_name = categoryOfWork.name;
        buttonFilter.addEventListener("click", (event) => {

            document.querySelector(".filters .btn_selected").classList.remove("btn_selected");
            event.target.classList.add("btn_selected");

            const filteredWorks = works.filter(function (work) {

                return event.target.dataset.categoryOfWork_name === work.category.name;
            });
            updateWorksDisplay(filteredWorks, ".gallery");
        });

        filtersContainer.appendChild(buttonFilter);
    }
}

initButtonsFilter();

/*
    Cette fonction indique si l'utilisateur est connecté.
*/
export function isConnected() {
    const connexion = window.localStorage.getItem(LOCAL_STORAGE_CONNEXION_STATUS_KEY);
    if (connexion !== undefined && connexion !== null) {
        return connexion === "true";
    } else {
        console.log(`[IS_CONNECTED] Aucune donnée n'est présente localement en ce qui concerne l'utilisateur.`);
        return false;
    }
}

if (isConnected()) {
    console.log("[INDEX] Un utilisateur s'est connecté, entrée en mode édition !");
    const bodyContainer = document.body;
    editorMode(bodyContainer);
} else {
    console.log("[INDEX] Aucun utilisateur n'est connecté actuellement.");
}