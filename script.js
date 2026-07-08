// Copy-email buttons
const copyButtons = document.querySelectorAll(".js-copy-email");
const toast = document.getElementById("copy-toast");
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2000);
}

copyButtons.forEach((el) => {
  el.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = el.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied!");
    } catch {
      showToast(email);
    }
  });
});

// Contact form
const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const errorText = document.getElementById("form-error");

const requiredFields = Array.from(
  form.querySelectorAll("input[required], textarea[required]"),
);

function clearErrorState() {
  errorText.textContent = "";
  errorText.style.color = "#ffd6d6";
  requiredFields.forEach((field) => field.classList.remove("is-error"));
}

function validateForm() {
  const invalid = [];
  requiredFields.forEach((field) => {
    const value = field.value.trim();
    if (!value) {
      invalid.push(field);
      return;
    }
    if (field.getAttribute("type") === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        invalid.push(field);
      }
    }
  });
  return invalid;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrorState();

  const invalid = validateForm();
  if (invalid.length > 0) {
    invalid.forEach((field) => field.classList.add("is-error"));
    errorText.textContent =
      "Please check your information. All fields are required and the email must be valid.";
    invalid[0].focus();
    return;
  }

  submitBtn.classList.add("is-loading");
  submitBtn.disabled = true;
  submitBtn.setAttribute("aria-busy", "true");

  try {
    const formData = new FormData(form);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      errorText.style.color = "var(--color-success)";
      errorText.textContent =
        "Message sent successfully. I will get back to you soon!";
      form.reset();
    } else {
      errorText.textContent =
        data.message || "Something went wrong. Please try again.";
    }
  } catch {
    errorText.textContent =
      "Network error. Please check your connection and try again.";
  } finally {
    submitBtn.classList.remove("is-loading");
    submitBtn.disabled = false;
    submitBtn.removeAttribute("aria-busy");
  }
});

form.addEventListener("reset", () => {
  clearErrorState();
});

requiredFields.forEach((field) => {
  field.addEventListener("input", () => {
    field.classList.remove("is-error");
    if (errorText.textContent) {
      errorText.textContent = "";
    }
  });
});
