// Sélection des éléments du DOM
const gallery = document.querySelector(".gallery");
const filtres = document.querySelector(".filtres");

const token = localStorage.getItem("token")
const login = document.getElementById("#login")


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

// Initialisation de l'application
displayWorks();
createFilterButtons();


function logout() {
    if(token) {
        login.textContent = "logout"
        filtres.remove ("")
    }
}
