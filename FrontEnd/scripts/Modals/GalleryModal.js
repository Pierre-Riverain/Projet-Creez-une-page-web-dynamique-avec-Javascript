import Modal from './Modal.js';
import PhotoModal from './PhotoModal.js';

import { updateWorksDisplay } from "../index.js";

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

    #initializeListeners() {
        this.addImageButton.addEventListener("submit", event => {
            event.preventDefault();
            console.log(`Evènement intercepté !`);
        });
        this.addImageButton.addEventListener("click", event => {
            event.preventDefault();
            new Promise((resolve, reject) => {
                this.photoModal = new PhotoModal(this.bodyContainer);
                this.photoModal.addEventListener("onHide", event => {
                    this.photoModal.deleteModalInDOM();
                    if (event.detail.actionTarget === "validate") {

                        resolve(this.photoModal.getDatas());
                    } else {
                        reject(event.detail.actionTarget);
                    }
                });

                this.photoModal.show();
            }).then(result => {
                const modifiedListOfWorks = this.getDatas();
                modifiedListOfWorks.push(result.work);
                const updateListEvent = new CustomEvent("updateListOfWorks", {
                    detail: {
                        listOfWorksUpdated: modifiedListOfWorks,
                        work: result.work,
                        imageFile: result.imageFile,
                        action: "added"
                    },
                    bubbles: true
                });
                this.dispatchEvent(updateListEvent);
                this.show();
            });
            this.hide();
        });

        this.deleteGalleryButton.addEventListener("submit", event => {
            event.preventDefault();
            console.log(`Evènement intercepté !`);
        });
        this.deleteGalleryButton.addEventListener("click", event => {

            this.getDatas.forEach(async work => {
                this.#sendWorkToDeleteToServer(work);
            });
            this.setDatas([]);
            updateWorksDisplay(this.getDatas(), ".gallery-editor", true);
        });

        this.addEventListener("updateListOfWorks", event => {
            event.stopImmediatePropagation();
            this.setDatas(event.detail.listOfWorksUpdated);
            updateWorksDisplay(event.detail.listOfWorksUpdated, ".gallery-editor", true);
            switch (event.detail.action) {
                case "added":
                    this.#sendNewWorkToServer(event.detail.work, event.detail.imageFile);
                    break;
                case "deleted":
                    this.#sendWorkToDeleteToServer(event.detail.work);
                    break;
            }
            localStorage.setItem("trace2", "Fin de l'évènement de mise à jour !");

            return false;
        });

        this.addEventListener("onShow", event => {
            updateWorksDisplay(this.getDatas(), ".gallery-editor", true);
        });
    }

    async #sendNewWorkToServer(work, imageFile) {
        const newWorkDatas = new FormData();
        newWorkDatas.append("image", imageFile);
        newWorkDatas.append("title", work.title);
        newWorkDatas.append("category", work.category.id);

        const answer = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: new Headers({ "Authorization": `Bearer ${localStorage.getItem("token")}` }),
            body: newWorkDatas
        });

        localStorage.setItem("trace", `[#sendNewWorkToServer(work, imageFile)] Server response : (${answer.status} - ${answer.statusText})`);
    }
    
    async #sendWorkToDeleteToServer(work) {
        if (localStorage.getItem("token") === null) {
            console.error(`token => ${localStorage.getItem("token")}`);
        } else {
            
        }
        
        const answer = await fetch(`http://localhost:5678/api/works/${work.id}`, {
            method: "DELETE",
            headers: new Headers({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
        });
        
        localStorage.setItem("trace", `[#sendWorkToDeleteToServer(work)] Server response : (${answer.status} - ${answer.statusText})`);
    }
}