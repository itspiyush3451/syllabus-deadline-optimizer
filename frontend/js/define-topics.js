document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("define-topic-form");
  const courseSelect = document.getElementById("course-select");
  const moduleContainer = document.getElementById("module-container");
  const addModuleButton = document.getElementById("add-module-btn");
  const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];

  // Populate course dropdown with stored courses
  storedCourses.forEach((course) => {
    const option = document.createElement("option");
    option.value = course;
    option.textContent = course;
    courseSelect.appendChild(option);
  });

  // Add new course to dropdown and localStorage
  document.getElementById("create-course-btn").addEventListener("click", () => {
    const newCourse = document.getElementById("new-course-name").value.trim();
    if (newCourse && !storedCourses.includes(newCourse)) {
      storedCourses.push(newCourse);
      localStorage.setItem("courses", JSON.stringify(storedCourses));
      const option = document.createElement("option");
      option.value = newCourse;
      option.textContent = newCourse;
      courseSelect.appendChild(option);
      document.getElementById("new-course-name").value = "";
    } else {
      alert("Course already exists or is invalid.");
    }
  });

  // Add module functionality
  addModuleButton.addEventListener("click", () => {
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
    removeBtn.addEventListener("click", () => {
      moduleDiv.remove();
    });
    moduleDiv.appendChild(removeBtn);

    moduleContainer.appendChild(moduleDiv);
  });

  // Save topic data
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedCourse = courseSelect.value;
    const subjectName = document.getElementById("subject-name").value.trim();
    const estimatedLectures = parseInt(
      document.getElementById("estimated-lectures").value,
      10
    );
    const deadlineDate = document.getElementById("deadline-date").value;

    const moduleInputs = document.querySelectorAll(".module-name");
    const modules = Array.from(moduleInputs)
      .map((input) => input.value.trim())
      .filter((name) => name);

    if (
      !selectedCourse ||
      !subjectName ||
      !estimatedLectures ||
      !deadlineDate
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    if (modules.length === 0) {
      alert("Please add at least one module.");
      return;
    }

    const topics = JSON.parse(localStorage.getItem("topics")) || [];
    topics.push({
      course: selectedCourse,
      subject: subjectName,
      totalLectures: estimatedLectures,
      completedLectures: 0, // Default completed lectures is 0
      deadline: deadlineDate,
      modules,
    });
    localStorage.setItem("topics", JSON.stringify(topics));

    alert("Topic saved successfully!");
    form.reset();
    moduleContainer.innerHTML = ""; // Clear modules
  });
});
