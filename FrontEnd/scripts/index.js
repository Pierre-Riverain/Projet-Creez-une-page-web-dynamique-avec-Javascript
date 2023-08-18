import * as Datas from "./datas.js";
import * as Editor from "./editor.js";

await Datas.loadWorksDatas();
await Datas.loadCategoriesOfWorksDatas();
Datas.updateWorksDisplay(Datas.works, ".gallery");

/*
    Ce bloc de code vérifie si l'utilisateur s'est connecté. Si c'est le cas, le script entre en mode édition.
*/
if (localStorage.getItem("token") !== null) {
    Editor.addBannerEditor(document.body);
    Editor.modifyLinkLogin();
    Editor.addModifyButtons();
}

/*
    Cette fonction initialise les filtres en ajoutant les boutons.
*/
function initButtonsFilter() {
    if (localStorage.getItem("token") !== null) {
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

            Datas.updateWorksDisplay(Datas.works, ".gallery");
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
                Datas.updateWorksDisplay(filteredWorks, ".gallery");
            });

            filtersContainer.appendChild(buttonFilter);
        }
    }
}

initButtonsFilter();