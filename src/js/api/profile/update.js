import { API_URL_PROFILE, API_KEY } from "../constants.js";
import { load } from "../../storage/index.js";

/**
 * @name updateProfile
 * @description Update a profile
 * @param {*} profileData - The profile data to update, including the avatar URL and bio at this point in time.
 * @returns - The updated profile data
 */

export async function updateProfile(profileData) {
  try {
    if (!profileData || !profileData.avatar || !profileData.avatar.url) {
      throw new Error("Missing profile data or avatar URL");
    }

    const storage = load("profile");
    const name = storage.name;
    const displayProfileURL = `${API_URL_PROFILE}/${name}`;

    const response = await fetch(displayProfileURL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${load("token")}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(profileData),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update profile");
  }
}
