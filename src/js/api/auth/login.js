import { API_URL } from "../constants.js";
import * as storage from "../../storage/index.js";
const action = "/auth/login";
const method = "post";

/** create a new user session by sending the profile data to the API, create API key and save the token and profile in local storage on successful login, display an error message on failed login, and redirect to the landing page on successful login.
 * @param {object} profile -The user profile to be logged in
 * @throws {Error} If the login fails or an error occurs during the process.
 * @returns {promise} The result of the login
 */

export async function login(profile) {
  try {
    const loginURL = API_URL + action;
    const body = JSON.stringify(profile);
    const response = await fetch(loginURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });
    if (response.ok) {
      const { accessToken, ...profile } = (await response.json()).data;
      storage.save("token", accessToken);
      storage.save("profile", profile);

      //reload the current page
      window.location.reload();

      return profile;
    }
    throw new Error("Login failed");
  } catch (error) {
    console.error(error);
  }
}
