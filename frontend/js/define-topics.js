document.addEventListener("DOMContentLoaded", () => {
  // Selectors for elements
  const courseSelect = document.getElementById("course-select");
  const createCourseBtn = document.getElementById("create-course-btn");
  const newCourseInput = document.getElementById("new-course-name");
  const addSubtopicBtn = document.getElementById("add-subtopic-btn");
  const subtopicsContainer = document.getElementById("subtopics-container");
  const saveTopicBtn = document.getElementById("save-topic-btn");

  // Array to store subtopics
  let subtopics = [];

  /**
   * Add a new course to the course dropdown
   */
  createCourseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const newCourse = newCourseInput.value.trim();
    if (newCourse === "") {
      alert("Please enter a course name.");
      return;
    }

    // Add new course to the dropdown
    const option = document.createElement("option");
    option.value = newCourse;
    option.textContent = newCourse;
    courseSelect.appendChild(option);

    // Clear input field
    newCourseInput.value = "";
    alert(`Course "${newCourse}" added successfully.`);
  });

  /**
   * Add a new subtopic input field
   */
  addSubtopicBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const subtopicIndex = subtopics.length + 1;
    const subtopicDiv = document.createElement("div");
    subtopicDiv.classList.add("subtopic");

    subtopicDiv.innerHTML = `
            <input type="text" class="subtopic-input form-control" placeholder="Subtopic ${subtopicIndex}" />
            <button class="remove-subtopic-btn btn btn-danger">Remove</button>
        `;

    subtopicsContainer.appendChild(subtopicDiv);
    subtopics.push(subtopicDiv);

    // Add event listener for remove button
    subtopicDiv
      .querySelector(".remove-subtopic-btn")
      .addEventListener("click", (event) => {
        event.preventDefault();
        subtopicsContainer.removeChild(subtopicDiv);
        subtopics = subtopics.filter((item) => item !== subtopicDiv);
      });
  });

  /**
   * Save or update the topic
   */
  saveTopicBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Gather form data
    const selectedCourse = courseSelect.value;
    const topicName = document.getElementById("topic-name").value.trim();
    const estimatedHours = document
      .getElementById("estimated-hours")
      .value.trim();
    const topicSequence = document
      .getElementById("topic-sequence")
      .value.trim();
    const deadlineDate = document.getElementById("deadline-date").value;

    // Validate required fields
    if (!selectedCourse) {
      alert("Please select or create a course.");
      return;
    }
    if (!topicName) {
      alert("Please enter a topic name.");
      return;
    }
    if (!estimatedHours || isNaN(estimatedHours) || estimatedHours <= 0) {
      alert("Please enter a valid estimated hours.");
      return;
    }
    if (!topicSequence || isNaN(topicSequence) || topicSequence <= 0) {
      alert("Please enter a valid topic sequence.");
      return;
    }
    if (!deadlineDate) {
      alert("Please select a deadline date.");
      return;
    }

    // Collect subtopics
    const subtopicInputs = document.querySelectorAll(".subtopic-input");
    const subtopicsData = Array.from(subtopicInputs)
      .map((input) => input.value.trim())
      .filter(Boolean);

    // Prepare topic data
    const topicData = {
      course: selectedCourse,
      topicName: topicName,
      estimatedHours: Number(estimatedHours),
      sequence: Number(topicSequence),
      subtopics: subtopicsData,
      deadline: deadlineDate,
    };

    // For now, log the topic data
    console.log("Saved Topic:", topicData);
    alert("Topic saved successfully!");

    // Clear inputs (if needed)
    document.getElementById("topic-name").value = "";
    document.getElementById("estimated-hours").value = "";
    document.getElementById("topic-sequence").value = "";
    document.getElementById("deadline-date").value = "";
    subtopicsContainer.innerHTML = "";
    subtopics = [];
  });
});
