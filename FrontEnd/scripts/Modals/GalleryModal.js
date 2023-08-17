import Modal from './Modal.js';
import PhotoModal from './PhotoModal.js';

import * as Datas from "../datas.js";
/*
    Cette classe représente la modale d'édition de la galerie.
*/
export default class GalleryModal extends Modal {
    constructor(bodyContainer) {
        super(bodyContainer);
        this.setTitle("Galerie Photo");
        this.setWidth("630px");
        this.setHeight("731px");

        this.galleryEditorElement = document.createElement("div");
        this.galleryEditorElement.classList.add("gallery-editor");
        this.setContent(this.galleryEditorElement);

        this.addImageButton = document.createElement("input");
        this.addImageButton.type = "submit";
        this.addImageButton.classList.add("btn");
        this.addImageButton.value = "Ajouter une photo";
        this.addButton(this.addImageButton);

        this.deleteGalleryButton = document.createElement("a");
        this.deleteGalleryButton.classList.add("modal--red-link");
        this.deleteGalleryButton.innerText = "Supprimer la galerie";
        this.addButton(this.deleteGalleryButton);

        this.#initializeListeners();
    }

    /*
        Cette fonction initialise les captures des évènements des composants de la modale.
    */
    #initializeListeners() {
        this.addImageButton.addEventListener("submit", event => {
            event.preventDefault();
        });
        this.addImageButton.addEventListener("click", event => {
            event.preventDefault();

            new Promise((resolve, reject) => {
                this.photoModal = new PhotoModal(this.bodyContainer);
                this.photoModal.addEventListener("onHide", event => {
                    resolve();
                });

                this.photoModal.show();
            }).then(() => {
                this.show();
            });
            this.hide();
        });

        this.deleteGalleryButton.addEventListener("submit", event => {
            event.preventDefault();
        });
        this.deleteGalleryButton.addEventListener("click", event => {
            event.preventDefault();

            this.getDatas.forEach(work => {
                Datas.deleteWork(work);
            });
        });

        this.addEventListener("onShow", event => {
            Datas.updateWorksDisplay(Datas.works, ".gallery-editor", true);
        });
    }
}