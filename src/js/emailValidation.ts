const emailForm = document.getElementById(
  "email-form",
) as HTMLFormElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const emailError = document.getElementById("email-error") as HTMLElement;

function getEmailPattern(): RegExp {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
}


function showError(message: string) {
  if (!emailError || !emailInput) return;
  emailError.textContent = message;
  emailError.style.display = "block";
  emailInput.classList.add("invalid");
}

function clearError() {
  if (!emailError || !emailInput) return;
  emailError.textContent = "";
  emailError.style.display = "none";
  emailInput.classList.remove("invalid");
}

function handleFormSubmit(event: Event) {
  if (!emailInput) return;
  event.preventDefault();

  const emailValue = emailInput.value.trim();

  if (!emailValue) {
    showError("Whoops! It looks like you forgot to add your email");
    return;
  }

  if (!getEmailPattern().test(emailValue)) {
    showError("Please provide a valid email address");
    return;
  }

  clearError();
  console.log("Email submitted:", emailValue);
}

emailForm.addEventListener("submit", handleFormSubmit);
