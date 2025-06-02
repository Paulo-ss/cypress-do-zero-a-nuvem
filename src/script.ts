let isPhoneRequired = false;

const phoneLabelSpan: HTMLElement = document.querySelector(".phone-label-span");
const phoneField = document.getElementById("phone") as HTMLInputElement;

document
  .querySelector("#phone-checkbox")
  .addEventListener("change", function () {
    if (this.checked) {
      phoneLabelSpan.style.display = "inline";
    } else {
      phoneLabelSpan.style.display = "none";
    }

    phoneField.required = !isPhoneRequired;
    isPhoneRequired = !isPhoneRequired;
  });

document.getElementById("form").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();

    const firstNameField = document.getElementById(
      "firstName"
    ) as HTMLInputElement;
    const lastNameField = document.getElementById(
      "lastName"
    ) as HTMLInputElement;
    const emailField = document.getElementById("email") as HTMLInputElement;
    const textareaField = document.getElementById(
      "open-text-area"
    ) as HTMLTextAreaElement;
    const productField = document.getElementById(
      "product"
    ) as HTMLSelectElement;
    const helpRadio = document.querySelector(
      'input[value="ajuda"]'
    ) as HTMLInputElement;
    const emailCheckbox = document.getElementById(
      "email-checkbox"
    ) as HTMLInputElement;
    const phoneCheckbox = document.getElementById(
      "phone-checkbox"
    ) as HTMLInputElement;
    const fileField = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const successMessage: HTMLElement = document.querySelector(".success");

    if (
      !firstNameField.value ||
      !lastNameField.value ||
      !emailField.value ||
      !textareaField.value
    ) {
      return showAndHideErrorMessage();
    }

    if (isPhoneRequired && !phoneField.value) {
      return showAndHideErrorMessage();
    }

    if (
      !emailField.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      return showAndHideErrorMessage();
    }

    firstNameField.value = "";
    lastNameField.value = "";
    emailField.value = "";
    textareaField.value = "";
    phoneField.value = "";
    productField.selectedIndex = 0;
    helpRadio.checked = true;
    emailCheckbox.checked = false;
    phoneCheckbox.checked = false;
    fileField.value = "";
    phoneLabelSpan.style.display = "none";
    successMessage.style.display = "block";

    isPhoneRequired = false;

    scroll(0, 0);

    hideMessageAfterTimeout(successMessage);
  },
  false
);

function showAndHideErrorMessage() {
  const errorMessage: HTMLElement = document.querySelector(".error");
  errorMessage.style.display = "block";

  scroll(0, 0);

  hideMessageAfterTimeout(errorMessage);

  return;
}

function hideMessageAfterTimeout(element: HTMLElement) {
  setTimeout(function () {
    element.style.display = "none";
  }, 3000);
}
