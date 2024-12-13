document.addEventListener("DOMContentLoaded", function () {
  // Get the forms by their IDs
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // Validate the register form
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value.trim();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      let isValid = true;

      // Name validation
      if (name === "") {
        alert("Full Name is required");
        isValid = false;
      }

      // Email validation
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (email === "") {
        alert("Email is required");
        isValid = false;
      } else if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        isValid = false;
      }

      // Password validation
      if (password === "") {
        alert("Password is required");
        isValid = false;
      } else if (password.length < 6) {
        alert("Password should be at least 6 characters long");
        isValid = false;
      }

      // Confirm Password validation
      if (confirmPassword !== password) {
        alert("Passwords do not match");
        isValid = false;
      }

      // Submit form via fetch if all validations pass
      if (isValid) {
        const user = {
          username: username,
          name: name,
          email: email,
          password: password,
        };

        fetch("http://localhost:8081/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            alert("User registered successfully!");
            registerForm.reset();
          })
          .catch((error) => {
            console.error("Error:", error); // Detailed error logging
            alert("An error occurred during registration. Please try again.");
          });
      }
    });
  }

  // Validate the login form
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      let isValid = true;

      // Username validation (not empty)
      if (username === "") {
        alert("Username  is required");
        isValid = false;
      }

      // Password validation (not empty)
      if (password === "") {
        alert("Password is required");
        isValid = false;
      }

      // Submit form via fetch if all validations pass
      if (isValid) {
        const user = {
          username: username,
          password: password,
        };

        // Send POST request to login endpoint
        fetch("http://localhost:8081/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              // alert("Login successful!");
              localStorage.setItem("loggedInUser", JSON.stringify(user)); // Save user details
              window.location.href = "../pages/dashboard.html"; // Redirect to dashboard
            } else {
              alert("Invalid credentials");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred during login.");
          });
      }
    });
  }
});
