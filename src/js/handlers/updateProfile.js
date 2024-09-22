import { updateProfile } from "../api/profile/update.js";

/**
 * @name setUpdateProfileFormListener
 * @description Register the form listener for the update profile form and extract the form data and send a request to the API to update the profile
 * @throws {Error} If the update fails or an error occurs
 * @returns {promise} The result of the update
 */

export async function setUpdateProfileFormListener() {
  const form = document.querySelector("#updateProfileForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const profile = {
      avatar: {
        url: formData.get("update-avatar"),
        alt: "",
      },
      bio: formData.get("update-bio"),
    };
    try {
      await updateProfile(profile);
      setTimeout(() => {
        window.location.href = "/profile/";
      }, 1000);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  });
}
