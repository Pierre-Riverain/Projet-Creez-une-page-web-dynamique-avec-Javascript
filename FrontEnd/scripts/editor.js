import { updateWorksDisplay } from "./index.js";
import GalleryModal from "./Modals/GalleryModal.js";
import * as Datas from "./datas.js";
import MessageModal from "./Modals/MessageModal.js";

let galleryModal;

/*
    Cette fonction va ajouter la bannière en haut de la page, au dessus de 
    l'en-tête.
*/
export function addBannerEditor(bodyContainer) {
    const bannerEditorMode = document.createElement("section");
    bannerEditorMode.classList.add("banner-editor-mode");
    bannerEditorMode.style.display = "flex";

    const bannerEditorModeDiv = document.createElement("div");

    const bannerEditorModeIcon = document.createElement("i");
    bannerEditorModeIcon.classList.add("fa-regular");
    bannerEditorModeIcon.classList.add("fa-pen-to-square");
    bannerEditorModeDiv.appendChild(bannerEditorModeIcon);

    const bannerEditorModeParagraph = document.createElement("p");
    bannerEditorModeParagraph.innerText = "Mode édition";
    bannerEditorModeDiv.appendChild(bannerEditorModeParagraph);
    bannerEditorMode.appendChild(bannerEditorModeDiv);

    const bannerEditorModeButton = document.createElement("input");
    bannerEditorModeButton.classList.add("btn");
    bannerEditorModeButton.type = "Submit";
    bannerEditorModeButton.value = "publier les changements";
    bannerEditorMode.appendChild(bannerEditorModeButton);
    bodyContainer.prepend(bannerEditorMode);
}

export function deleteBodyMargin(elementHTML) {
    elementHTML.style.marginLeft = `-${document.body.style.marginLeft}`;
    elementHTML.style.marginRight = document.body.style.marginRight;
}

/*
    Cette fonction modifie le lien vers la connexion en lien de déconnexion et de sortie du mode éditeur.
*/
export function modifyLinkLogin() {
    const linkLoginLogout = document.querySelector(".login-logout-link");
    linkLoginLogout.innerHTML = "Logout";
    linkLoginLogout.addEventListener("click", (event) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        const messageModal = new MessageModal(document.body);
        messageModal.setTitle("Information");
        messageModal.setMessage("Vous vous êtes déconnecté !");
        messageModal.show();
        location.reload();
    });
}

/*
    Cette fonction va cacher les filtres des travaux.
*/
export function hideButtonsFilter() {
    const filtersContainer = document.querySelector(".filters");
    filtersContainer.style.display = "none";
}

/*
    Cette fonction va ajouter les boutons qui permettent de modifier les différents éléments de la page d'accueil.
*/
export function addModifyButtons(bodyContainer) {
    const introductionFigure = document.querySelector("#introduction figure");
    const introductionFigureModifyButton = createModifyButton();
    introductionFigureModifyButton.style.marginTop = "15px";
    introductionFigureModifyButton.style.marginLeft = "57px";
    introductionFigure.appendChild(introductionFigureModifyButton);

    const introductionArticle = document.querySelector("#introduction article");
    const introductionArticleModifyButton = createModifyButton();
    introductionArticleModifyButton.style.marginBottom = "19px";
    introductionArticle.prepend(introductionArticleModifyButton);

    const portfolio = document.querySelector("#portfolio");
    const portfolioTitle = document.querySelector("#portfolio h2");
    const portfolioModifyButton = createModifyButton();
    portfolioModifyButton.style.marginBottom = "30px";
    portfolioModifyButton.addEventListener("click", (event) => {
        const promise = new Promise((resolve, reject) => {
            if (!galleryModal) {
                galleryModal = new GalleryModal(document.body);
            }
            galleryModal.addEventListener("onHide", event => {
                resolve(galleryModal.getDatas());
            });
            galleryModal.setDatas(Datas.works);
            
            galleryModal.show();

        }).then(newListOfWorks => {
            Datas.setWorks(newListOfWorks);
            updateWorksDisplay(newListOfWorks, ".gallery");
        }).catch(cause => {
            console.error(cause);
        });
    });

    const portfolioTitleContainer = document.createElement("div");
    portfolioTitleContainer.classList.add("portfolio-title-container");
    portfolioTitleContainer.appendChild(portfolioTitle);
    portfolioTitleContainer.appendChild(portfolioModifyButton);
    portfolio.prepend(portfolioTitleContainer);
}

/*
    Cette fonction va créer les boutons qui vont permettre de modifier les différents éléments de la page d'accueil.
*/
function createModifyButton() {
    const buttonModify = document.createElement("div");
    buttonModify.type = "submit";
    buttonModify.classList.add("btn-modify");

    const buttonModifyIcon = document.createElement("i");
    buttonModifyIcon.classList.add("fa-regular");
    buttonModifyIcon.classList.add("fa-pen-to-square");
    buttonModify.appendChild(buttonModifyIcon);

    const buttonModifyParagraph = document.createElement("p");
    buttonModifyParagraph.innerText = "modifier";
    buttonModify.appendChild(buttonModifyParagraph);

    return buttonModify;
}