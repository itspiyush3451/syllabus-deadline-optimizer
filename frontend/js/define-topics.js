document.addEventListener("DOMContentLoaded", function () {
  const createCourseBtn = document.getElementById("create-course-btn");
  const courseSelect = document.getElementById("course-select");
  const addModuleBtn = document.getElementById("add-module-btn");
  const moduleContainer = document.getElementById("module-container");

  // Add course functionality
  createCourseBtn.addEventListener("click", function () {
    const newCourseName = document.getElementById("new-course-name").value;

    if (!newCourseName) {
      alert("Please enter a course name.");
      return;
    }

    // AJAX request to add the course to the backend
    fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCourseName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add course");
        }
        return response.json(); // Only attempt to parse if the response is valid
      })
      .then((data) => {
        if (data) {
          const option = document.createElement("option");
          option.value = data.id; // assuming `id` is returned from the backend
          option.textContent = data.name; // assuming `name` is returned from the backend
          courseSelect.appendChild(option);
          document.getElementById("new-course-name").value = "";
          alert("Course added successfully!");
        } else {
          alert("Course creation failed.");
        }
      })
      .catch((error) => console.error("Error:", error));
  });

  // Add module functionality
  addModuleBtn.addEventListener("click", function () {
    const moduleDiv = document.createElement("div");
    moduleDiv.classList.add("modules");

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("module-name", "form-control");
    input.placeholder = "Enter module name";
    moduleDiv.appendChild(input);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.classList.add("btn", "btn-danger", "remove-module-btn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      moduleDiv.remove();
    });
    moduleDiv.appendChild(removeBtn);

    moduleContainer.appendChild(moduleDiv);
  });

  // Prevent form submission and handle topic save/update
  const form = document.getElementById("define-topic-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      course: courseSelect.value,
      subjectName: document.getElementById("subject-name").value,
      estimatedLectures: document.getElementById("estimated-lectures").value,
      chapterSequence: document.getElementById("chapter-sequence").value,
      modules: Array.from(document.querySelectorAll(".module-name")).map(
        (input) => input.value
      ),
      deadlineDate: document.getElementById("deadline-date").value,
    };

    fetch("/api/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save topic");
        }
        return response.json(); // Ensure a valid JSON response
      })
      .then((data) => {
        if (data) {
          alert("Topic saved successfully!");
          form.reset(); // Reset the form after successful submission
        } else {
          alert("Failed to save the topic.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while saving the topic.");
      });
  });
});
