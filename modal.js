function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// form validation
function validate() {
  let isValid = true;

  // First name validation
  const firstName = document.getElementById("first");
  if (firstName.value.trim().length < 2) {
    isValid = false;
    displayError(
      firstName,
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
  } else {
    hideError(firstName);
  }

  // Last name validation
  const lastName = document.getElementById("last");
  if (lastName.value.trim().length < 2) {
    isValid = false;
    displayError(
      lastName,
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
  } else {
    hideError(lastName);
  }

  // Email validation
  const email = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    isValid = false;
    displayError(email, "Veuillez entrer une adresse email valide.");
  } else {
    hideError(email);
  }

  // Quantity validation
  const quantity = document.getElementById("quantity");
  if (quantity.value === "" || isNaN(quantity.value) || quantity.value < 0) {
    isValid = false;
    displayError(quantity, "Veuillez entrer un nombre valide.");
  } else {
    hideError(quantity);
  }

  // Location validation
  const locations = document.querySelectorAll('input[name="location"]');
  let locationChecked = false;
  locations.forEach((location) => {
    if (location.checked) {
      locationChecked = true;
    }
  });
  if (!locationChecked) {
    isValid = false;
    displayError(locations[0], "Vous devez choisir une option.");
  } else {
    hideError(locations[0]);
  }

  // Terms validation
  const terms = document.getElementById("checkbox1");
  if (!terms.checked) {
    isValid = false;
    displayError(
      terms,
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
  } else {
    hideError(terms);
  }

  if (isValid) {
    closeModal();
    alert("Merci ! Votre réservation a été reçue.");
  }

  return isValid;
}

function displayError(element, message) {
  let errorDiv = element.nextElementSibling;
  if (!errorDiv || !errorDiv.classList.contains("error-message")) {
    errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    element.parentNode.insertBefore(errorDiv, element.nextSibling);
  }
  errorDiv.textContent = message;
  element.classList.add("error");
}

function hideError(element) {
  const errorDiv = element.nextElementSibling;
  if (errorDiv && errorDiv.classList.contains("error-message")) {
    errorDiv.remove();
  }
  element.classList.remove("error");
}

// form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validate()) {
    // Si le formulaire est valide, vous pouvez le soumettre ici
    console.log("Formulaire soumis avec succès");
  }
});
