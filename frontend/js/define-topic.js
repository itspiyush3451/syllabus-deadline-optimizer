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
      body: JSON.stringify({ name: "Course Name" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add course");
        }
        return response.json();
      })
      .then((data) => {
        const option = document.createElement("option");
        option.value = data.id;
        option.textContent = data.name;
        courseSelect.appendChild(option);
        document.getElementById("new-course-name").value = "";
        alert("Course added successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error adding course. Please try again.");
      });
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
    const subjectName = document.getElementById("subject-name").value.trim();
    const estimatedLectures = parseInt(
      document.getElementById("estimated-lectures").value,
      10
    );
    const chapterSequence = parseInt(
      document.getElementById("chapter-sequence").value,
      10
    );
    const deadlineDate = document.getElementById("deadline-date").value;
    const modules = Array.from(document.querySelectorAll(".module-name"))
      .map((input) => input.value.trim())
      .filter(Boolean);

    if (!subjectName || isNaN(estimatedLectures) || !deadlineDate) {
      alert("Please fill out all required fields.");
      return;
    }

    if (!modules.length) {
      alert("Please add at least one module.");
      return;
    }

    const data = {
      courseId: courseSelect.value,
      subjectName: subjectName,
      estimatedLectures: estimatedLectures,
      chapterSequence: chapterSequence,
      deadlineDate: deadlineDate,
      modules: modules, // Include the modules array
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
          alert("Failed to save the topic. Please try again.");
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        alert(
          `Topic saved successfully! ID: ${responseData.id}, Subject: ${responseData.subjectName}`
        );
        form.reset(); // Reset the form
        moduleContainer.innerHTML = ""; // Clear added modules
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Topic saved successfully!");
      });
  });
});
