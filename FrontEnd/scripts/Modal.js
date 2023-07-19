import { updateWorksDisplay } from "./index.js";
import * as Datas from "./datas.js";
/*
    Cette classe permet de créer et personnaliser les modales.
*/
export class Modal {
    constructor(bodyContainer) {
        this.background = document.createElement("section");
        this.modal = document.createElement("div");
        this.header = document.createElement("div");
        this.title = document.createElement("h2");
        this.content = document.createElement("div");
        this.footerLine = document.createElement("div");
        this.buttonsContainer = document.createElement("div");
        
        this.initialise();
        bodyContainer.appendChild(this.background);
    }

    /*
        Cette fonction initialise la modale.
    */
    initialise() {
        this.background.classList.add("background--modal");
        this.modal.classList.add("modal");
        this.title.classList.add("modal--title");
        this.content.classList.add("modal--content");
        this.buttonsContainer.classList.add("modal--buttons-container");
        this.footerLine.classList.add("modal--footer-line");

        this.initialiseHeader();

        this.modal.appendChild(this.header);
        this.modal.appendChild(this.title);
        this.modal.appendChild(this.content);
        this.modal.appendChild(this.footerLine);
        this.modal.appendChild(this.buttonsContainer);

        this.background.appendChild(this.modal);
    }

    /*
        Cette fonction initialise l'en-tête de la modale. Elle lui ajoute un bouton pour fermer la fenêtre.
    */
    initialiseHeader() {
        this.header.classList.add("modal--header");
        const closeButton = document.createElement("i");
        closeButton.classList.add("fa-solid");
        closeButton.classList.add("fa-xmark");
        closeButton.classList.add("closeButton");
        closeButton.addEventListener("click", event => {
            const hideEvent = new CustomEvent("onHide", {
                detail: {
                    actionTarget: "close",
                    datas: this.datas
                }
            });
            this.dispatchEvent(hideEvent);
            this.hide();
        });
        this.header.appendChild(closeButton);

        const returnButton = document.createElement("i");
            returnButton.classList.add("fa-solid");
            returnButton.classList.add("fa-arrow-left");
            returnButton.classList.add("returnButton");
            returnButton.addEventListener("click", event => {
                const hideEvent = new CustomEvent("onHide", {
                    detail: {
                        actionTarget: "return",
                        datas: this.datas
                    }
                });
                this.dispatchEvent(hideEvent);
                this.hide();
            });
            returnButton.style.display = "none";
            this.header.appendChild(returnButton);
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
        Cette fonction permet de définir la modale parente à cette modale. Dans le cas où une modale parente à été défini, un bouton retour
        est ajouté à l'en-tête de la modale fille, permettant de retourner vers la modale parente et déclencher un évènement "onHide" avec 
        l'action "cance".
    */
    setParentModal(parentModal) {
        this.parentModal = parentModal;

        if (this.parentModal !== null || this.parentModal !== undefined) {
            document.querySelector("returnButton").style.display = "block";
        } else {
            document.querySelector("returnButton").style.display = "none";
        }
    }
    /*
        Cette fonction affiche la modale.
    */
    show() {
        this.background.style.display = "block";
    }

    /*
        Cette fonction ferme cette modale.
    */
    hide() {
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

/*
    Cette fonction créé et affiche la modale qui permet d'éditer la galerie.
*/
export function createAndShowGalleryModal(bodyContainer, works) {
    const promise = new Promise((resolve, reject) => {
        const galleryModal = new Modal(bodyContainer);
        galleryModal.setTitle("Galerie Photo");
        galleryModal.setDatas(works);
        galleryModal.setWidth("630px");
        galleryModal.setHeight("731px");

        const galleryEditorElement = document.createElement("div");
        galleryEditorElement.classList.add("gallery-editor");
        galleryEditorElement.addEventListener("updateListOfWorks", event => {
            galleryModal.dispatchEvent(new CustomEvent("updateListOfWorks", {
                detail: {
                    listOfWorksUpdated: event.detail.listOfWorksUpdated
                }
            }));
        });
        galleryModal.setContent(galleryEditorElement);
        updateWorksDisplay(works, ".gallery-editor", true);
    
        const addImageButton = document.createElement("input");
        addImageButton.type = "submit";
        addImageButton.classList.add("btn");
        addImageButton.value = "Ajouter une photo";
        addImageButton.addEventListener("submit", event => {
            event.preventDefault();
    
        });
        galleryModal.addButton(addImageButton);
    
        const deleteGalleryButton = document.createElement("a");
        deleteGalleryButton.classList.add("modal--red-link");
        deleteGalleryButton.innerText = "Supprimer la galerie";
        deleteGalleryButton.addEventListener("click", event => {
            galleryModal.setDatas([]);
            updateWorksDisplay(galleryModal.getDatas(), ".gallery-editor", true);
        });
        galleryModal.addButton(deleteGalleryButton);
        galleryModal.addEventListener("onHide", event => {
            resolve(galleryModal.getDatas());
        });
        galleryModal.addEventListener("updateListOfWorks", event => {
            galleryModal.setDatas(event.detail.listOfWorksUpdated);
            updateWorksDisplay(event.detail.listOfWorksUpdated, ".gallery-editor", true);
        });
        galleryModal.show();
    });

    return promise;
}

/*
    Cette fonction créé et affiche la modale qui permet de créer ou de modifier un "travail" / une photo.
*/
export function createAndShowAddPhotoModal(bodyContainer, work) {
    const promise = new Promise((resolve, reject) => {
        const existWork = work !== undefined && work !== null;

        const addPhotoModal = new Modal(bodyContainer);
        addPhotoModal.setTitle("Ajout photo");
        addPhotoModal.setWidth("630px");
        addPhotoModal.setHeight("670px");        

        const addPhotoContentElement = document.createElement("div");
        
        const photoContainerElement = document.createElement("div");

        const formAddPhotoElement = document.createElement("form");
        
        const labelTitleElement = document.createElement("label");
        labelTitle.innerText = "Titre";
        labelTitle.htmlFor = "title";

        const textBoxTitleElement = document.createElement("input");
        textBoxTitleElement.type = "text";
        textBoxTitleElement.name = "title";

        const labelCategoryElement = document.createElement("label");
        labelCategoryElement.innerText = "Catgorie";
        labelCategoryElement.htmlFor = "category";

        const comboBoxCategoryElement = document.createElement("select");
        comboBoxCategoryElement.name = "category";
        
        let listOfCategoriesOfWorks = null;
        
        if (existWork) {
            addPhotoModal.setDatas(work);

            const selectedCategoryOfWorkOption = document.createElement("option");
            textBoxTitleElement.value = work.title;
            selectedCategoryOfWorkOption.innerText = work.category.name;
            selectedCategoryOfWorkOption.dataset.categoryOfWork = work.category;
            comboBoxCategoryElement.appendChild(selectedCategoryOfWorkOption);
            listOfCategoriesOfWorks = categoriesOfWorks.filter(category => {
                return category !== selectedCategoryOfWork;
            })
        } else {
            
            listOfCategoriesOfWorks = Datas.categoriesOfWorks;
        }

        for (let i = 0; i < listOfCategoriesOfWorks.length; i++) {
            const categoryOfWork = listOfCategoriesOfWorks[i];

            const categoryOfWorkOption = document.createElement("option");
            categoryOfWorkOption.innerText = categoryOfWork.name;
            categoryOfWorkOption.dataset.categoryOfWork = categoryOfWork;

            comboBoxCategoryElement.appendChild(categoryOfWorkOption);
        }

        const buttonValidate = document.createElement("input");
        buttonValidate.type = "submit";
        buttonValidate.classList.add("btn");
        buttonValidate.addEventListener("submit", event => {
            event.preventDefault();
            addPhotoModal.addEventListener("onHide", event => {


            });
            resolve();
        });

        addPhotoContentElement.appendChild(photoContainerElement);
        formAddPhotoElement.appendChild(labelTitle);
        formAddPhotoElement.appendChild(textBoxTitleElement);
        formAddPhotoElement.appendChild(labelCategoryElement);
        formAddPhotoElement.appendChild(comboBoxCategoryElement);
        addPhotoContentElement.appendChild(formAddPhotoElement);
        addPhotoModal.setContent(addPhotoContentElement);
        addPhotoModal.addButton(buttonValidate);
    });

    return promise;
}