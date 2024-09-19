import { updateProfile } from "../api/profile/update.js";
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
    console.log(profile);
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
