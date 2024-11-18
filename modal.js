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
  console.log("launchModal");
  modalbg.style.display = "block";
}

// close modal event
closeBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

const formFields = [
  {
    id: "first",
    type: "text",
    minLength: 2,
  },
  {
    id: "last",
    type: "text",
    minLength: 2,
  },
  {
    id: "email",
    type: "email",
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  {
    id: "quantity",
    type: "number",
    min: 0,
  },
  {
    id: "location",
    type: "radio",
  },
  {
    id: "checkbox1",
    type: "checkbox",
  },
];

function validate() {
  let isValid = true;

  formFields.forEach((field) => {
    const element = document.getElementById(field.id);
    if (
      field.type === "text" &&
      element.value.trim().length < field.minLength
    ) {
      isValid = false;
      displayError(
        element,
        `Veuillez entrer ${field.minLength} caractères ou plus pour ce champ.`
      );
    } else if (field.type === "email" && !field.regex.test(element.value)) {
      isValid = false;
      displayError(element, "Veuillez entrer une adresse email valide.");
    } else if (
      field.type === "number" &&
      (element.value === "" ||
        isNaN(element.value) ||
        element.value < field.min)
    ) {
      isValid = false;
      displayError(element, "Veuillez entrer un nombre valide.");
    } else if (field.type === "radio") {
      const radios = document.querySelectorAll(`input[name="${field.id}"]`);
      let isChecked = false;
      radios.forEach((radio) => {
        if (radio.checked) {
          isChecked = true;
        }
      });
      if (!isChecked) {
        isValid = false;
        displayError(radios[0], "Vous devez choisir une option.");
      } else {
        hideErrors(radios[0]);
      }
    } else if (field.type === "checkbox" && !element.checked) {
      isValid = false;
      displayError(
        element,
        "Vous devez vérifier que vous acceptez les termes et conditions."
      );
    } else {
      hideErrors(element);
    }
  });

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

function hideErrors(element) {
  let errorDiv = element.nextElementSibling;
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
