import { API_URL_PROFILE, API_KEY } from "../constants.js";
import { load } from "../../storage/index.js";

export async function updateProfile(profileData) {
  try {
    if (!profileData || !profileData.avatar || !profileData.avatar.url) {
      throw new Error("Missing profile data or avatar URL");
    }

    const storage = load("profile");
    const name = storage.name;
    const displayProfileURL = `${API_URL_PROFILE}/${name}`;
    console.log("Profile data to send:", JSON.stringify(profileData));

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
