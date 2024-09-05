import { register } from "../api/auth/register.js";

/**
 * Event listener for the register form
 * Extract the form data and send a request to the API to register
 * @param {array} profile - The profile data to be registered
 */

// export function registerFormListener() {
//   const form = document.querySelector(".registerForm");

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const formData = new FormData(form);
//     const profile = Object.fromEntries(formData.entries());

//     //send it to the API
//     register(profile);
//     console.log(profile);
//   });
// }
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
      venueManager: formData.has("venueManager"), // Assuming checkbox or boolean field
    };

    try {
      // Ensure the profile object is formatted as expected by the API
      console.log("Profile data being sent:", profile);

      await register(profile);
      console.log("Profile registered successfully:", profile);

      //   // Hide the modal after successful registration
      //   const registerModal = bootstrap.Modal.getInstance(
      //     document.getElementById("registerModal"),
      //   );
      //   if (registerModal) {
      //     registerModal.hide();
      //   }
    } catch (error) {
      console.error("Error registering profile:", error);
    }
  });
}
