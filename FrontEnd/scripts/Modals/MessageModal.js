import Modal from "./Modal.js";

/*
    Cett classe représente la modale permettant d'afficher les messages.
*/
export default class MessageModal extends Modal {
    constructor(bodyContainer) {
        super(bodyContainer);
        
        this.setWidth("630px");
        this.setHeight("315px");

        this.messageText = document.createElement(`p`);
        this.firstButton = document.createElement(`input`);
        this.secondButton = document.createElement(`input`);
        this.thirdButton = document.createElement(`input`);

        this.#initialize();
    }

    /*
        Cette fonction initialise les composants de la modale permettant d'afficher des messages.
    */
    #initialize() {
        this.messageText.classList.add("message-text");
        this.setContent(this.messageText);

        this.firstButton.classList.add("btn");
        this.firstButton.type = "submit";
        this.firstButton.value = "Ok";
        
        this.secondButton.classList.add("btn");
        this.secondButton.type = "submit";
        this.secondButton.style.display = "none";
        
        this.thirdButton.classList.add("btn");
        this.thirdButton.type = "submit";
        this.thirdButton.style.display = "none";

        this.addButton(this.firstButton);
        this.addButton(this.secondButton);
        this.addButton(this.thirdButton);

        this.#initializeListeners();
    }

    /*
        Cette fonction initialise les évènements des boutons de cette modale.
    */
    #initializeListeners() {
        this.firstButton.addEventListener("click", event => {
            this.#onButtonClick(event.target, this.firstButtonClickListener);
        });

        this.secondButton.addEventListener("click", event => {
            this.#onButtonClick(event.target, this.secondButtonClickListener);
        });

        this.thirdButton.addEventListener("click", event => {
            this.#onButtonClick(event.target, this.thirdButtonClickListener);
        });
    }

    /*
        Cette fonction est appelé lorsque l'utilisateur clique sur un bouton.
    */
    #onButtonClick(eventTarget, clickListener) {
        this.datas = eventTarget.value;
        this.hide(eventTarget.value, true);

        if (clickListener !== null && "function" === typeof clickListener) {
            clickListener(eventTarget);
        }
    }

    setFirstButton(value, clickListener = null) {
        this.firstButton.value = value;
        this.firstButtonClickListener = clickListener;
    }
    
    setSecondButton(value, clickListener = null) {
        this.secondButton.value = value;
        this.secondButton.style.display = "block";
        this.secondButtonClickListener = clickListener;
    }
    
    setThirdButton(value, clickListener = null) {
        this.thirdButton.value = value;
        this.thirdButton.style.display = "block";
        this.thirdButtonClickListener = clickListener;
    }

    setMessage(message) {
        this.messageText.innerText = message;
    }
}