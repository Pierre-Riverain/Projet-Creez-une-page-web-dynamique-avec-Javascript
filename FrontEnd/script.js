let works = window.localStorage.getItem("works");

if (works === null) {
    const answer = await fetch("http://portfolio-sophie-bluel.pierreriverain.fr:5678/api/works"); //http://localhost:5678/api/works
    works = await answer.json();
    
    const valueWorks = JSON.stringify(works);
    window.localStorage.setItem("works", valueWorks);
} else {
    works = JSON.parse(works);
}

/*  
    Cette fonction va mettre à jour l'affichage de la liste des travaux sur la page web. 
    Le paramètre de cette fonction prend en valeur la liste des travaux.
*/
function updateWorksDisplay(works) {
    let galleryElementContainer = document.querySelector(".gallery");
    galleryElementContainer.innerHTML = "";

    for(let i = 0; i < works.length; i++) {
        const work = works[i];

        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        figureElement.appendChild(imageElement);

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = work.title;
        figureElement.appendChild(figcaptionElement);

        galleryElementContainer.appendChild(figureElement);
    }
}

updateWorksDisplay(works);