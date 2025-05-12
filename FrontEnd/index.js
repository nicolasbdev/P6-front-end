// Sélection des éléments du DOM
const gallery = document.querySelector(".gallery");
const filtres = document.querySelector(".filtres");
const loginBtn = document.querySelector("#login");
const modeEditBar = document.querySelector("#modeEditBar");
const modifyBtn = document.createElement("button");

// Fonction pour récupérer les travaux depuis l'API
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

// Fonction pour afficher tous les travaux
async function displayWorks() {
    const works = await getWorks();
    gallery.innerHTML = ""; // On vide la galerie
    works.forEach(work => {
        createWorkElement(work);
    });
}

// Fonction pour créer les éléments HTML pour chaque travail
function createWorkElement(work) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = work.imageUrl;
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    figure.classList.add("gallery-item"); // Tu peux styliser avec cette classe
    gallery.appendChild(figure);
}

// Fonction de logout
function logout() {
    const token = localStorage.getItem("token");
    const login = document.querySelector("nav #login"); // Sélection plus précise

    if (token && login) { // Vérifie que login existe avant de manipuler
        login.textContent = "Logout";
        login.setAttribute("href", "#");
        filtres.innerHTML = ""; // Supprimer les filtres

        // Ajouter la barre Mode édition
        modeEditBar.classList.add("edition");
        const icon = document.createElement("i");
        const edit = document.createElement("span");
        modeEditBar.appendChild(icon);
        modeEditBar.appendChild(edit);
        icon.classList.add("fa-regular", "fa-pen-to-square");
        edit.textContent = "Mode édition";

        // Bouton Modifier
        const projet = document.querySelector("#portfolio");
        projet.classList.add("modif-edition");
        const buttonModif = document.createElement("button");
        const iconModif = document.createElement("i");
        projet.appendChild(iconModif);
        projet.appendChild(buttonModif);
        iconModif.classList.add("fa-regular", "fa-pen-to-square");
        buttonModif.textContent = "Modifier";
        buttonModif.classList.add("button-modifier");

        // Event pour logout
        login.addEventListener("click", () => {
            localStorage.removeItem("token");
            // Ne pas recharger la page, juste réinitialiser le texte et masquer les éléments
            login.textContent = "Login"; 
            modeEditBar.style.display = "none"; // Cacher la barre de mode édition
            document.querySelector(".modif-edition").style.display = "none"; // Cacher le bouton Modifier
            filtres.innerHTML = ""; // Réinitialiser les filtres si nécessaire
        });
    }
}

// Vérification du token à l'ouverture de la page
window.onload = () => {
    const token = localStorage.getItem("token");
    if (token) {
        logout(); // Si le token est présent, exécuter le logout et l'affichage de la page
        displayWorks(); // Réafficher les travaux après la connexion
    } else {
        const loginBtn = document.querySelector("#login");
        if (loginBtn) {
            loginBtn.textContent = "Login"; // Si aucun token, bouton Login
        }
    }
}