const gallery = document.querySelector(".gallery")

const filtres = document.querySelector(".filtres")

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

//Requête pour récupérer les catégories des travaux // Question sur le code ci-dessous

async function getfilters() {
	const response = await fetch("http://localhost:5678/api/categories")
	return await response.json()
}

//Afficher les boutons des filtres // Pourquoi on réutilise le paramètres category ? Pourquoi n'y a-ti pas button.class ? On utilise le tableau du fichier json

async function buttonfiltres() {
	const buttons = await getfilters()
	buttons.forEach(category=>{
		const button = document.createElement("button")
		button.textContent = category.name
		button.id = category.id
		filtres.appenChild(button)
		
	})

// Question également sur le code ci-dessous. Il me semble que cela consiste à créer des Id pour tous les boutons avec la classe .filtres Est-ce le cas ? 

// On avait déjà déclaré la constante buttons au-dessus. Pourquoi le fait-on à nouvau ?

}

async function createCategories() {
	const listcategories = await getfilters()
	const buttons = document.querySelectorAll(".filtres button")
	buttons.forEach((button)=>{
		button.addEventListener("click", (event)=>{
			btnId = event.target.id
			gallery.innerHTML = ""
			if(btnId !=="0"){
				const fitlerWork = listcategories.filter((work)=>{
			return work.categoryId == btnId})

		})

	})}