const gallery = document.querySelector(".gallery")


//Requêtes HTTP fonction qui sert à récupérer les travaux en ligne sous format json depuis l'API

async function getwork() {
	const response = await fetch("http://localhost:5678/api/works")
	return await response.json()
}

//Fonction suivante cherche à afficher les travaux de façon dynamique avec une boucle for reach

async function displayWorks() {
	const works = await getwork()
	gallery.innerHTML = "" 	//On vide la gallerie avec la fonction innnerHTML
	works.forEach((work)=>{ // Boucle pour faire appel à la fonction createworks qui s'occupe de la mise en page de chaque travaux. Work : pour chaque élément du tableau, work est un paramètre de la fonction forEach
		createworks(work)
	})
}

function createworks(work) {
	const figure = document.createElement("figure")
	const img = document.createElement("img")
	const figcaption = document.createElement("figcaption")
	img.src = work.imageUrl
	figcaption.textContent = work.title
	figure.appendChild(img)
	figure.appendChild(figcaption)
	gallery.appendChild(figure)
	figure.classList.add(".gallery")
}

displayWorks()