import * as Datas from "./datas.js";
import * as Editor from "./editor.js";

// alert(`localStorage.getItem("token") => ${localStorage.getItem("token")}\nlocalStorage.getItem("userId") => ${localStorage.getItem("userId")}`);
const token = localStorage.getItem("token") !== null;

await Datas.loadWorksDatas();
await Datas.loadCategoriesOfWorksDatas();

if (localStorage.getItem("trace") !== null) {
    console.log(`trace => ${localStorage.getItem("trace")}`);
    localStorage.removeItem("trace");
}

if (localStorage.getItem("trace2") !== null) {
    console.log(`trace2 => ${localStorage.getItem("trace2")}`);
    localStorage.removeItem("trace2");
}

if (token) {
    Editor.addBannerEditor(document.body);
    Editor.modifyLinkLogin();
    Editor.addModifyButtons();
}

/*  
    Cette fonction va mettre à jour l'affichage de la liste des travaux sur la page web. 
    Le premier paramètre de cette fonction prend en valeur la liste des travaux, le second prend
    en valeur le container où seront ajoutés les travaux, et le troisième, qui est facultatiif (false par défaut)
    indique s'il faut appliquer la mise en page éditeur.
*/
export function updateWorksDisplay(works, containerElementIdentifier, editorMode = false) {
    const containerElement = document.querySelector(containerElementIdentifier);
    containerElement.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
        const work = works[i];

        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");

        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;

        const figcaptionElement = document.createElement("figcaption");
        if (editorMode) {
            const figureButtonsContainerElement = document.createElement("div");
            figureButtonsContainerElement.classList.add("figure-buttons-container");

            const trashElement = document.createElement("i");
            trashElement.classList.add("fa-solid");
            trashElement.classList.add("fa-trash-can");
            trashElement.classList.add("btn-trash");
            trashElement.dataset.id = work.id;
            trashElement.addEventListener("click", event => {
                let workToDelete;
                const modifiedListOfWorks = works.filter(workToFilter => {
                    if (Number(workToFilter.id) === Number(event.target.dataset.id)) {
                        workToDelete = workToFilter;
                    }
                    return Number(workToFilter.id) !== Number(event.target.dataset.id);
                });
                const updateListEvent = new CustomEvent("updateListOfWorks", {
                    detail: {
                        listOfWorksUpdated: modifiedListOfWorks,
                        work: workToDelete,
                        action: "deleted"
                    },
                    bubbles: true
                });

                localStorage.setItem("trace", "1");

                containerElement.dispatchEvent(updateListEvent);
            });
            figureButtonsContainerElement.appendChild(trashElement);
            figureElement.appendChild(figureButtonsContainerElement);
            figcaptionElement.innerText = "éditer";
        } else {
            figcaptionElement.innerText = work.title;
        }
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        containerElement.appendChild(figureElement);
    }
}

updateWorksDisplay(Datas.works, ".gallery");

/*
    Cette fonction initialise les filtres en ajoutant les boutons 
*/
function initButtonsFilter() {
    if (token) {
        Editor.hideButtonsFilter();
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

            updateWorksDisplay(Datas.works, ".gallery");
        });
        filtersContainer.appendChild(buttonNoFilter);

        for (let i = 0; i < Datas.categoriesOfWorks.length; i++) {

            const buttonFilter = document.createElement("input");
            buttonFilter.type = "submit";
            buttonFilter.classList.add("btn");

            const categoryOfWork = Datas.categoriesOfWorks[i];

            if (i === 3) {
                buttonFilter.value = "Hôtels & restaurants";
            } else {
                buttonFilter.value = categoryOfWork.name;
            }
            buttonFilter.dataset.categoryOfWork_name = categoryOfWork.name;
            buttonFilter.addEventListener("click", (event) => {

                document.querySelector(".filters .btn_selected").classList.remove("btn_selected");
                event.target.classList.add("btn_selected");

                const filteredWorks = Datas.works.filter(function (work) {

                    return event.target.dataset.categoryOfWork_name === work.category.name;
                });
                updateWorksDisplay(filteredWorks, ".gallery");
            });

            filtersContainer.appendChild(buttonFilter);
        }
    }
}

initButtonsFilter();