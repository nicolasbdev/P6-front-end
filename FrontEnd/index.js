const gallery = document.querySelector(".gallery")


//Requêtes HTTP fonction qui sert à récupérer les travaux en ligne sous format json depuis l'API

async function getwork() {
	const response = await fetch("http://localhost:5678/api/works")
	return await response.json()
}

//Fonction suivante cherche à afficher les travaux de façon dynamique avec une boucle for reach

async function displayWorks() {
	const works = await getwork()
	gallery.innerHTML = ""
	works.forEach((work)=>{
		createworks(work)
	})
}