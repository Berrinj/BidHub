import { API_URL } from "../constants.js";

const action = "/auth/register";
const method = "post";
const registerURL = API_URL + action;

/**
 * Register a new user by sending the profile data to the API
 *
 * @param {object} profile -The user profile to be registered
 * @throws {Error} If the registration fails or an error occurs during the process.
 * @returns {promise} The result of the registration
 */

export async function register(profile) {
  try {
    const body = JSON.stringify(profile);
    const response = await fetch(registerURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    const result = await response.json();
    console.log(result);
    const successMsg = document.querySelector(".response-msg");
    successMsg.textContent =
      "Profile registered successfully! Now you can log in!";
    const loginBtn = document.querySelector(".login-after-reg");
    loginBtn.classList.remove("d-none");
    const registerBtn = document.querySelector("#registerUserBtn");
    registerBtn.classList.add("d-none");

    if (!response.ok) {
      throw new Error("Register failed: " + result.errors[0].message);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}
