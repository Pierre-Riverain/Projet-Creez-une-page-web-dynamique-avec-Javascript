import Modal from "./Modal.js";

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

    #initializeListeners() {
        this.firstButton.addEventListener("click", event => {
            this.#onButtonClick(event.target);
        });

        this.secondButton.addEventListener("click", event => {
            this.#onButtonClick(event.target);
        });

        this.thirdButton.addEventListener("click", event => {
            this.#onButtonClick(event.target);
        });
    }

    #onButtonClick(eventTarget) {
        this.datas = eventTarget.value;
        this.hide(eventTarget.value, true);
    }

    setFirstButton(value) {
        this.firstButton.value = value;
    }

    setSecondButton(value) {
        this.secondButton.value = value;
        this.secondButton.style.display = "block";
    }

    setThirdButton(value) {
        this.thirdButton.value = value;
        this.thirdButton.style.display = "block";
    }

    setMessage(message) {
        this.messageText.innerText = message;
    }
}