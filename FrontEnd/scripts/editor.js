import { LOCAL_STORAGE_CONNEXION_STATUS_KEY } from "./datas.js";

/*
    Cette fonction active et initialise le mode édition quand l'utilisateur s'est connecté.
*/
export function editorMode(bodyContainer) { 
    console.log("[EDITOR_MODE] Initialisation.");

    addBannerEditor(bodyContainer);
    modifyLinkLogin();
    hideButtonsFilter();
}

/*
    Cette fonction va ajouter la bannière en haut de la page, au dessus de 
    l'en-tête.
*/
function addBannerEditor(bodyContainer) {
    console.log("[EDITOR_MODE] Construction de la bannière de publication des changements.");
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
    bannerEditorModeButton.addEventListener("click", (event) => {
        /*
            TODO: 
                Appeler la fonction permettant d'écrire les modifications dans le local storage et envoyer ces
                données modifiés au serveur.
        */
    });
    bannerEditorMode.appendChild(bannerEditorModeButton);

    bodyContainer.prepend(bannerEditorMode);
}

/*
    Cette fonction modifie le lien vers la connexion en lien de déconnexion et de sortie du mode éditeur.
*/
function modifyLinkLogin() {
    console.log("[EDITOR_MODE] Modification du lien vers la connexion.");
    const linkLoginLogout = document.querySelector(".login-logout-link");
    linkLoginLogout.innerHTML = "Logout";
    linkLoginLogout.addEventListener("click", (event) => {
        console.log("[EDITOR_MODE] Sortie du mode éditeur.");
        window.localStorage.setItem(LOCAL_STORAGE_CONNEXION_STATUS_KEY, "false");
        //TODO: Ajouter une modale pour indiquer à l'utilisateur qu'il s'est déconnecté.
        window.location.reload();
    });
}

/*
    Cette fonction va cacher les filtres des travaux.
*/
function hideButtonsFilter() {
    console.log("[EDITOR_MODE] Désactivation des filtres.");
    const filtersContainer = document.querySelector(".filters");
    filtersContainer.style.display = "none";
}

/*
    Cette fonction va ajouter les boutons qui permettent de modifier les différents éléments de la page d'accueil.
*/
function addModifyButton(bodyContainer) {
    console.log("[EDITOR_MODE] Ajout des boutons de modifications.");
    
    const introductionFigure = document.querySelector("#introduction figure");
    const introductionFigureModifyButton = createModifyButton();
    introductionFigureModifyButton.style.marginTop = "15px";
    introductionFigure.appendChild(introductionFigureModifyButton);
    
    const introductionArticle = document.querySelector("#introduction article");
    const introductionArticleModifyButton = createModifyButton();
    introductionArticleModifyButton.style.marginBottom = "19px";
    introductionArticle.prepend(introductionArticleModifyButton);

    const portfolio = document.querySelector("#portfolio");
    const portfolioTitle = document.querySelector("#portfolio h2");
    const portfolioTitleContainer = document.createElement("div");
    portfolioTitleContainer.classList.add("portfolio-title-container");
    portfolioTitleContainer.appendChild(portfolioTitle);
    portfolioTitleContainer.appendChild(createModifyButton());
    portfolio.prepend(portfolioTitleContainer);

}

/*
    Cette fonction va créer les boutons qui vont permettre de modifier les différents éléments de la page d'accueil.
*/
function createModifyButton() {
    console.log("[EDITOR_MODE] Création d'un bouton de modification.");
    const buttonModify = document.createElement("div");
    buttonModify.type = "submit";
    buttonModify.classList.add("btn-modify");
    
    const buttonModifyIcon = document.createElement("i");
    buttonModifyIcon.classList.add("fa-regular");
    buttonModifyIcon.classList.add("fa-pen-to-square");
    buttonModify.appendChild(buttonModifyIcon);

    const buttonModifyParagraph = document.createElement("p");
    buttonModifyParagraph.innerText = "modifier";
    
    return buttonModify;
}