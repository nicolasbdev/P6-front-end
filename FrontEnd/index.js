// Sélection des éléments du DOM
const gallery = document.querySelector(".gallery");
const filtres = document.querySelector(".filtres");
const loginBtn = document.querySelector("#login");
const modeEditBar = document.querySelector("#modeEditBar");

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

// Fonction pour récupérer les catégories (filtres)
async function getFilters() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}

// Fonction pour créer les boutons de filtres
async function createFilterButtons() {
    const categories = await getFilters();

    // Création du bouton "Tous"
    const allBtn = document.createElement("button");
    allBtn.textContent = "Tous";
    allBtn.id = "0";
    allBtn.classList.add("filter-btn");
    filtres.appendChild(allBtn);

    // Création d'un bouton par catégorie
    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.id = category.id;
        button.classList.add("filter-btn");
        filtres.appendChild(button);
    });

    // Ensuite, on ajoute les événements de clic
    addFilterEvents();
}

// Fonction pour ajouter les événements sur les boutons filtres
async function addFilterEvents() {
    const allWorks = await getWorks();
    const buttons = document.querySelectorAll(".filtres button");

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const btnId = event.target.id;
            gallery.innerHTML = "";

            if (btnId !== "0") {
                const filteredWorks = allWorks.filter(work => work.categoryId == btnId);
                filteredWorks.forEach(work => {
                    createWorkElement(work);
                });
            } else {
                displayWorks(); // Réaffiche tous les travaux
            }
        });
    });
}

function logout() {
    const token = localStorage.getItem("token");
    const login = document.querySelector("nav #login");

    if (token && login) { // Vérifie que login existe avant de manipuler
        login.textContent = "Logout";
        login.setAttribute("href", "#");
        filtres.style.display = "none"; // Masquer les filtres lors de la connexion

        // Ajouter la barre Mode édition
        modeEditBar.classList.add("edition");
        const icon = document.createElement("i");
        const edit = document.createElement("span");
        modeEditBar.appendChild(icon);
        modeEditBar.appendChild(edit);
        icon.classList.add("fa-regular", "fa-pen-to-square");
        edit.textContent = "Mode édition";
// Créer le bouton Modifier avec icône directement
const buttonModif = document.createElement("button");
buttonModif.classList.add("button-modifier");

// Créer l'icône de modification
const modifyIcon = document.createElement("i");
modifyIcon.classList.add("fa-regular", "fa-pen-to-square");

// Ajouter l'icône PUIS le texte dans le bouton
buttonModif.appendChild(modifyIcon);
buttonModif.append(" Modifier"); // texte après l’icône

// Ajouter le bouton au header
const portfolioHeader = document.querySelector(".portfolio-header");
portfolioHeader.appendChild(buttonModif);

        // Ajouter l'événement "click" après avoir ajouté le bouton
        buttonModif.addEventListener("click", () => {
            openModal(containerModals); // Ouverture de la modal lors du clic sur le bouton Modifier
        });

        // Event pour logout
        login.addEventListener("click", () => {
            localStorage.removeItem("token");
            // Ne pas recharger la page, juste réinitialiser le texte et masquer les éléments
            login.textContent = "Login"; 
            modeEditBar.style.display = "none"; // Cacher la barre de mode édition
            document.querySelector(".button-modifier").style.display = "none"; // Cacher le bouton Modifier
            filtres.style.display = "block"; // Réafficher les filtres après la déconnexion
            buttonModif.style.display = "none"; // Masquer le bouton Modifier après la déconnexion
        });
    }
}

// Vérification du token à l'ouverture de la page
window.onload = () => {
    const token = localStorage.getItem("token");
    const loginBtn = document.querySelector("#login");
    const modeEditBar = document.querySelector("#modeEditBar"); 

    if (token) {
        logout(); // Affichage en mode connecté
        displayWorks();
    } else {
        if (loginBtn) loginBtn.textContent = "Login";
        if (modeEditBar) modeEditBar.style.display = "none"; // <-- Force le masquage ici de la barre lorsqu'on est déconnecter 
        filtres.style.display = "block";
        createFilterButtons();
    }
    displayWorks();
};
