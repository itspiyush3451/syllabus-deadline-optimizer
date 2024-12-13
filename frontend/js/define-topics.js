document.addEventListener("DOMContentLoaded", function () {
  const createCourseBtn = document.getElementById("create-course-btn");
  const courseSelect = document.getElementById("course-select");
  const addModuleBtn = document.getElementById("add-module-btn");
  const moduleContainer = document.getElementById("module-container");
  const form = document.getElementById("define-topic-form");

  // Add course functionality
  createCourseBtn.addEventListener("click", function () {
    const newCourseName = document
      .getElementById("new-course-name")
      .value.trim();

    if (!newCourseName) {
      alert("Please enter a course name.");
      return;
    }

    // Fetch request to add the course
    fetch("http://localhost:8081/api/courses/getCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCourseName }),
    })
      .then((response) => response.json())
      .then((data) => {
        const option = document.createElement("option");
        option.value = data.id;
        option.textContent = data.name;
        courseSelect.appendChild(option);
        document.getElementById("new-course-name").value = "";
        alert("Course added successfully!");
      })
      .catch((error) => console.error("Error:", error));
  });

  // Add module functionality
  addModuleBtn.addEventListener("click", function () {
    const moduleDiv = document.createElement("div");
    moduleDiv.classList.add("module-item");

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("module-name");
    input.placeholder = "Enter module name";
    moduleDiv.appendChild(input);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.classList.add("remove-module-btn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      moduleDiv.remove();
    });
    moduleDiv.appendChild(removeBtn);

    moduleContainer.appendChild(moduleDiv);
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate fields
    const modules = Array.from(document.querySelectorAll(".module-name"))
      .map((input) => input.value.trim())
      .filter(Boolean);

    if (!modules.length) {
      alert("Please add at least one module.");
      return;
    }

    const data = {
      courseId: courseSelect.value,
      subjectName: document.getElementById("subject-name").value.trim(),
      estimatedLectures: parseInt(
        document.getElementById("estimated-lectures").value,
        10
      ),
      chapterSequence: parseInt(
        document.getElementById("chapter-sequence").value,
        10
      ),
      deadlineDate: document.getElementById("deadline-date").value,
      modules: modules, // Include the modules array,
    };

    fetch("http://localhost:8081/api/topics/addTopic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error : ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        alert(
          `Topic saved successfully! ID: ${responseData.id}, Name: ${responseData.name}`
        );
        form.reset(); // Reset the form
      })
      .catch((error) => console.error("Error:", error));
  });
});
