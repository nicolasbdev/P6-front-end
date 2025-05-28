// Sélection des éléments
const form = document.querySelector("#login_form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#mot_de_passe");
const errorMessage = document.querySelector(".error_message");

// Écoute de la soumission du formulaire
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await login();
});

// Fonction de connexion
async function login() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Vérification des champs
  if (!email || !password) {
    errorMessage.textContent = "Veuillez remplir tous les champs.";
    return;
  }

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Connexion réussie : stocke le token et redirige
      localStorage.setItem("token", data.token);
      window.location.href = "index.html"; // à adapter selon ta page d'admin
    } else {
      errorMessage.textContent = data.message || "E-mail ou mot de passe incorrect.";
    }
  } catch (error) {
    console.error("Erreur :", error);
    errorMessage.textContent = "Une erreur est survenue. Veuillez réessayer plus tard.";
  }
}
