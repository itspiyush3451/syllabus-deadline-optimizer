document.addEventListener("DOMContentLoaded", () => {
  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // Check if user object exists and has a username property
  if (user && user.username) {
    document.getElementById("usernameDisplay").textContent = user.username;
  } else {
    console.error("User data is missing or invalid.");
    document.getElementById("usernameDisplay").textContent = "Guest"; // Fallback text
  }
});
