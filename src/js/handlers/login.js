import { login } from "../api/auth/login.js";

/**
 * Register the form listener for the login form
 * Extract the form data and send a request to the API to login
 */

export function loginFormListener() {
  const form = document.querySelector(".loginForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const profile = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await login(profile);
    } catch (error) {
      console.error("Error logging in profile:", error);
    }
  });
}
