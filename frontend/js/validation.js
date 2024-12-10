// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the forms by their IDs
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // Validate the register form
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      let isValid = true;

      // Name validation (not empty)
      if (name === "") {
        alert("Full Name is required");
        isValid = false;
      }

      // Email validation (not empty and correct format)
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (email === "") {
        alert("Email is required");
        isValid = false;
      } else if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        isValid = false;
      }

      // Password validation (not empty, length check)
      if (password === "") {
        alert("Password is required");
        isValid = false;
      } else if (password.length < 6) {
        alert("Password should be at least 6 characters long");
        isValid = false;
      }

      // Confirm Password validation (should match password)
      if (confirmPassword !== password) {
        alert("Passwords do not match");
        isValid = false;
      }

      // Submit form if all validations pass
      if (isValid) {
        registerForm.submit();
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
        alert("Username or Email is required");
        isValid = false;
      }

      // Password validation (not empty)
      if (password === "") {
        alert("Password is required");
        isValid = false;
      }

      // Submit form if all validations pass
      if (isValid) {
        loginForm.submit();
      }
    });
  }
});
// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the forms by their IDs
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // Validate the register form
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      let isValid = true;

      // Name validation (not empty)
      if (name === "") {
        alert("Full Name is required");
        isValid = false;
      }

      // Email validation (not empty and correct format)
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (email === "") {
        alert("Email is required");
        isValid = false;
      } else if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        isValid = false;
      }

      // Password validation (not empty, length check)
      if (password === "") {
        alert("Password is required");
        isValid = false;
      } else if (password.length < 6) {
        alert("Password should be at least 6 characters long");
        isValid = false;
      }

      // Confirm Password validation (should match password)
      if (confirmPassword !== password) {
        alert("Passwords do not match");
        isValid = false;
      }

      // Submit form if all validations pass
      if (isValid) {
        registerForm.submit();
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
        alert("Username or Email is required");
        isValid = false;
      }

      // Password validation (not empty)
      if (password === "") {
        alert("Password is required");
        isValid = false;
      }

      // Submit form if all validations pass
      if (isValid) {
        loginForm.submit();
      }
    });
  }
});
