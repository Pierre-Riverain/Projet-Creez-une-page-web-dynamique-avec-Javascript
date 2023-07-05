import { loadWorksDatas, loadCategoriesOfWorksDatas, works, categoriesOfWorks } from "./datas.js";
import * as editorMode from "./editor.js";

const token = localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined;
console.log(`=====> Statut de la connexion : ${(token ? "connecté" : "non connecté")}.`);

await loadWorksDatas();
await loadCategoriesOfWorksDatas();

if (token) {
    console.log(document.body.style.margin);
    editorMode.addBannerEditor(document.body);
    editorMode.modifyLinkLogin();
    editorMode.addModifyButtons();
}

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

updateWorksDisplay(works, ".gallery");

/*
    Cette fonction initialise les filtres en ajoutant les boutons 
*/
function initButtonsFilter() {
    if (token) {
        editorMode.hideButtonsFilter();
    } else {
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
}

initButtonsFilter();