import Modal from "./Modal.js";
import MessageModal from "./MessageModal.js";

import * as Datas from "../datas.js";

export default class PhotoModal extends Modal {
    constructor(bodyContainer) {
        super(bodyContainer);
        this.showReturnButton(true);
        this.setTitle("Ajout photo");
        this.setWidth("630px");
        this.setHeight("670px");
        this.datas = {
            imageFile: "",
            work: new Datas.Work()
        };

        this.photoContentElement = document.createElement("div");
        this.photoFormElement = document.createElement("form");
        this.photoInputFileElement = document.createElement("input");
        this.photoTitleLabelElement = document.createElement("label");
        this.photoTitleTextBoxElement = document.createElement("input");
        this.photoCategoryLabelElement = document.createElement("label");
        this.photoCategorySelectElement = document.createElement("select");
        this.validateButton = document.createElement("input");

        this.#initialize();
        this.#initializePhotoContainerElement();

        this.photoFormElement.appendChild(this.photoInputFileElement);
        this.photoFormElement.appendChild(this.photoContainerElement);
        this.photoFormElement.appendChild(this.photoTitleLabelElement);
        this.photoFormElement.appendChild(this.photoTitleTextBoxElement);
        this.photoFormElement.appendChild(this.photoCategoryLabelElement);
        this.photoFormElement.appendChild(this.photoCategorySelectElement);
        this.photoContentElement.appendChild(this.photoFormElement);
        this.setContent(this.photoContentElement);
        this.addButton(this.validateButton);

        this.#initializeListeners();
    }

    #initialize() {
        this.photoContentElement.id = "addPhoto";

        this.photoInputFileElement.type = "file";
        this.photoInputFileElement.accept = ".jpeg, .png";
        this.photoInputFileElement.id = "input-file";

        this.photoContainerElement = document.createElement("div");
        this.photoTitleLabelElement.innerText = "Titre";
        this.photoTitleLabelElement.htmlFor = "title";

        this.photoTitleTextBoxElement.type = "text";
        this.photoTitleTextBoxElement.id = "title";

        this.photoCategoryLabelElement.innerText = "Catégorie";
        this.photoCategoryLabelElement.htmlFor = "category";

        this.photoCategorySelectElement.id = "category";
        const option = document.createElement(`option`);
        option.value = 0;
        option.innerText = "";
        this.photoCategorySelectElement.appendChild(option);
        Datas.categoriesOfWorks.forEach(categoryOfWork => {

            const option = document.createElement(`option`);
            option.value = categoryOfWork.id;
            option.innerText = categoryOfWork.name;
            this.photoCategorySelectElement.appendChild(option);
        });

        this.validateButton.classList.add("btn");
        this.validateButton.type = "submit";
        this.validateButton.value = "Valider";
        this.validateButton.disabled = true;
    }

    #initializePhotoContainerElement() {
        this.photoContainerElement.classList.add("photo-container-element");

        this.photoIconElement = document.createElement("i");
        this.photoIconElement.classList.add("fa-regular");
        this.photoIconElement.classList.add("fa-image");
        this.photoContainerElement.appendChild(this.photoIconElement);

        this.photoVirtualButtonElement = document.createElement("p");
        this.photoVirtualButtonElement.innerText = "+ Ajouter photo";
        this.photoVirtualButtonElement.classList.add("btn");
        this.photoContainerElement.appendChild(this.photoVirtualButtonElement);

        this.photoParagraph = document.createElement("p");
        this.photoParagraph.innerText = "jpg, png : 4mo max";
        this.photoContainerElement.appendChild(this.photoParagraph);
    }

    #initializeListeners() {
        this.photoInputFileElement.addEventListener("change", event => {
            
            this.datas.imageFile = this.photoInputFileElement.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                this.datas.work.imageUrl = reader.result;
                this.#updatePhotoContainerElement(reader.result);
            });

            reader.readAsDataURL(this.photoInputFileElement.files[0]);
        });

        this.photoContainerElement.addEventListener("click", event => {
            this.photoInputFileElement.click();
        });

        this.photoTitleTextBoxElement.addEventListener("input", event => {
            const value = new String(event.target.value);
            value.trim();
            this.datas.work.title = value;
            if (value.length > 0) {
                this.validateButton.disabled = false;
            } else {
                this.validateButton.disabled = true;
            }

        });

        this.photoCategorySelectElement.addEventListener("change", event => {
            const value = event.target.value;
            if (value > 0) {
                this.datas.work.categoryId = Number(value);
                this.datas.work.category = Datas.getCategoryById(value);
            }
        });
        this.validateButton.addEventListener("submit", event => {
            event.preventDefault();
            console.log(`Evènement intercepté !`);
        });

        this.validateButton.addEventListener("click", event => {
            event.preventDefault();
            const messageModal = new MessageModal(this.bodyContainer);
            let userError = false;
            try {
                if (this.datas.work.imageUrl.length === 0) {
                    userError = true;
                    throw new Error("Vous n'avez pas inséré de photo, veuillez en insérer une !");
                }

                if (this.datas.work.category.id === undefined) {
                    userError = true;
                    throw new Error("Vous n'avez pas sélectionné de catégorie, veuillez en sélectionner une !");
                }

                this.hide("validate", true);
            } catch (error) {
                if (userError) {
                    messageModal.setTitle("Informations manquantes !");
                    messageModal.setMessage(error.message);
                    messageModal.show();
                } else {
                    console.error(error);
                }
            }

        });

    }

    #updatePhotoContainerElement(imageUrl) {
        this.photoContainerElement.innerHTML = "";
        if (!imageUrl) {
            this.photoContainerElement.appendChild(this.photoIconElement);
            this.photoContainerElement.appendChild(this.photoVirtualButtonElement);
            this.photoContainerElement.appendChild(this.photoParagraph);
        } else {
            const image = document.createElement(`img`);
            image.src = imageUrl;
            this.photoContainerElement.appendChild(image);
        }
    }

    deleteModalInDOM() {
        this.background.remove();
    }
}