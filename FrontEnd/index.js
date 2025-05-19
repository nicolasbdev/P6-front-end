// Sélection des éléments du DOM
const gallery = document.querySelector(".gallery");
const filtres = document.querySelector(".filtres");
const loginBtn = document.querySelector("#login");
const modeEditBar = document.querySelector("#modeEditBar");
const modifyBtn = document.querySelector("#modifyBtn");  // Sélection du bouton Modifier

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

// Fonction de logout
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
            filtres.style.display = "block"; // Réafficher les filtres après la déconnexion
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
        filtres.style.display = "block"; // Assurer que les filtres sont visibles si l'utilisateur n'est pas connecté
        createFilterButtons(); // Créer les boutons de filtres
    }
    displayWorks(); // Afficher les travaux dès le début
}

