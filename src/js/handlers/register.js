import { register } from "../api/auth/register.js";

/**
 * @name registerFormListener
 * @description Event listener for the register form, extract the form data and send a request to the API to register
 * @param {array} profile - The profile data to be registered
 * @throws {Error} If the registration fails or an error occurs
 * @returns {promise} The result of the registration
 */

export function registerFormListener() {
  const form = document.querySelector(".registerForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const profile = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      bio: formData.get("bio") || "",
      avatar: {
        url:
          formData.get("avatar") ||
          "https://images.unsplash.com/photo-1666635376182-347aa9fb37ed?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: formData.get("avatar-alt"),
      },
      banner: {
        url:
          formData.get("banner") ||
          "https://images.unsplash.com/photo-1666635376182-347aa9fb37ed?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: formData.get("banner-alt"),
      },
      venueManager: formData.has("venueManager"),
    };

    try {
      const response = await register(profile);
      if (response.ok) {
        const successMsg = document.querySelector(".response-msg");
        successMsg.textContent =
          "Profile registered successfully! Now you can log in!";
        const loginBtn = document.querySelector(".login-after-reg");
        loginBtn.classList.remove("d-none");
        const registerBtn = document.querySelector("#registerUserBtn");
        registerBtn.classList.add("d-none");
      }
    } catch (error) {
      console.error("Error registering profile:", error);
    }
  });
}
