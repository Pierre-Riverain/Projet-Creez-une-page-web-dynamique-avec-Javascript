/*
    Cette classe permet de créer et personnaliser les modales.
*/
export default class Modal {
    constructor(bodyContainer) {
        this.bodyContainer = bodyContainer;
        this.background = document.createElement("section");
        this.modal = document.createElement("div");
        this.header = document.createElement("div");
        this.title = document.createElement("h2");
        this.content = document.createElement("div");
        this.footerLine = document.createElement("div");
        this.buttonsContainer = document.createElement("div");
        
        this.#initialize();
        bodyContainer.appendChild(this.background);
    }

    /*
        Cette fonction initialise la modale.
    */
    #initialize() {
        this.background.classList.add("background--modal");
        this.modal.classList.add("modal");
        this.title.classList.add("modal--title");
        this.content.classList.add("modal--content");
        this.buttonsContainer.classList.add("modal--buttons-container");
        this.footerLine.classList.add("modal--footer-line");

        this.#initializeHeader();

        this.modal.appendChild(this.header);
        this.modal.appendChild(this.title);
        this.modal.appendChild(this.content);
        this.modal.appendChild(this.footerLine);
        this.modal.appendChild(this.buttonsContainer);
        
        this.modal.addEventListener("click", event => {
            event.stopPropagation();
        });        
        this.background.addEventListener("click", event => {
            this.hide(true, "background");
        });
        this.background.appendChild(this.modal);
    }

    /*
        Cette fonction initialise l'en-tête de la modale. Elle lui ajoute un bouton pour fermer la fenêtre.
    */
    #initializeHeader() {
        this.header.classList.add("modal--header");
        this.closeButton = document.createElement("i");
        this.closeButton.classList.add("fa-solid");
        this.closeButton.classList.add("fa-xmark");
        this.closeButton.classList.add("closeButton");
        this.closeButton.addEventListener("click", event => {
            this.hide("close", true);
        });
        this.header.appendChild(this.closeButton);

        this.returnButton = document.createElement("i");
        this.returnButton.classList.add("fa-solid");
        this.returnButton.classList.add("fa-arrow-left");
        this.returnButton.classList.add("returnButton");
        this.returnButton.addEventListener("click", event => {
            this.hide("return", true);
        });
        this.returnButton.style.display = "none";
        this.header.appendChild(this.returnButton);
    }

    /*
        Cette fonction attribue un titre à la modale.
    */
    setTitle(title) {
        this.title.innerText = title;
    }

    /*
        Cette fonction attribue la largeur de la modale.
    */
    setWidth(width) {
        this.modal.style.width = width;
    }

    /*
        Cette fonction attribue la hauteur de la modale.
    */
    setHeight(height) {
        this.modal.style.height = height;
    }

    /*
        Cette fonction attribue un contenu à la modale.
    */
    setContent(content) {
        this.content.innerHTML = "";
        this.content.appendChild(content);
    }

    /*
        Cette fonction permet d'ajouter des données à la modale.
    */
    setDatas(datas) {
        this.datas = datas;
    }

    /*
        Cette fonction permet d'obtenir les données de la modale.
    */
    getDatas() {
        return this.datas;
    }


    /*
        Cette fonction permet d'ajouter un bouton à la modale.
        */
    addButton(button) {
        this.buttonsContainer.appendChild(button);
    }

    /*
        Cette fonction permet d'afficher le bouton retour ou non suivant le booléen passé en paramètre.
    */
    showReturnButton(showReturnButton) {
        if (showReturnButton) {
            this.returnButton.style.display = "block";
        } else {
            this.returnButton.style.display = "none";
        }
    }
    /*
        Cette fonction affiche la modale.
    */
    show() {
        this.background.style.display = "block";
        this.modal.dispatchEvent(new CustomEvent("onShow"));
    }

    /*
        Cette fonction ferme cette modale et envoie un évènement si les paramètres ont été défini.
    */
    hide(actionTarget, sendDatas=false) {
        if (actionTarget) {
            let hideEvent;

            if (sendDatas) {
                hideEvent = new CustomEvent("onHide", {
                    detail: {
                        actionTarget: actionTarget,
                        datas: this.datas
                    }
                });
            } else {
                hideEvent = new CustomEvent("onHide", {
                    detail: {
                        actionTarget: actionTarget
                    }
                })
            }
            this.dispatchEvent(hideEvent);
        }
        this.background.style.display = "none";
    }

    /*
        Cette fonction permet d'envoyer un évènement suite à une action effectué à la modale.
    */
    dispatchEvent(event) {
        this.modal.dispatchEvent(event);
    }

    /*
        Cette fonction permet d'ajouter un écouteur lorsqu'un évènement se produit.
    */
    addEventListener(event, listener) {
        this.modal.addEventListener(event, listener);
    }
}