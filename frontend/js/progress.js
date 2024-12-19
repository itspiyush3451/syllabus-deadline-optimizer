document.addEventListener("DOMContentLoaded", () => {
  const progressTableBody = document.querySelector("#progress-table tbody");

  // Fetch topics from localStorage
  const topics = JSON.parse(localStorage.getItem("topics")) || [];

  // Populate progress table
  function loadProgressTable() {
    progressTableBody.innerHTML = ""; // Clear existing rows

    topics.forEach((topic, index) => {
      const row = document.createElement("tr");

      // Add course name
      const courseCell = document.createElement("td");
      courseCell.textContent = topic.course;
      row.appendChild(courseCell);

      // Add subject name
      const subjectCell = document.createElement("td");
      subjectCell.textContent = topic.subject;
      row.appendChild(subjectCell);

      // Add completed lectures
      const lecturesCell = document.createElement("td");
      lecturesCell.textContent = `${topic.completedLectures}/${topic.totalLectures}`;
      row.appendChild(lecturesCell);

      // Add percentage
      const percentageCell = document.createElement("td");
      const percentage = (
        (topic.completedLectures / topic.totalLectures) *
        100
      ).toFixed(1);
      percentageCell.textContent = `${percentage}%`;
      row.appendChild(percentageCell);

      // Add actions
      const actionsCell = document.createElement("td");

      // Update button
      const updateBtn = document.createElement("button");
      updateBtn.textContent = "Update";
      updateBtn.addEventListener("click", () => {
        const newCompleted = prompt(
          `Enter completed lectures for ${topic.subject}:`,
          topic.completedLectures
        );
        if (
          newCompleted !== null &&
          !isNaN(newCompleted) &&
          newCompleted <= topic.totalLectures
        ) {
          topic.completedLectures = parseInt(newCompleted, 10);
          saveProgress();
          loadProgressTable();
        } else {
          alert("Invalid input. Please enter a valid number.");
        }
      });
      actionsCell.appendChild(updateBtn);

      // Mark Complete button
      const markCompleteBtn = document.createElement("button");
      markCompleteBtn.textContent = "Mark Complete";
      markCompleteBtn.addEventListener("click", () => {
        topic.completedLectures = topic.totalLectures; // Mark all lectures as completed
        saveProgress();
        loadProgressTable();
      });
      actionsCell.appendChild(markCompleteBtn);

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        if (confirm(`Are you sure you want to delete "${topic.subject}"?`)) {
          topics.splice(index, 1); // Remove topic from the array
          saveProgress();
          loadProgressTable();
        }
      });
      actionsCell.appendChild(deleteBtn);

      row.appendChild(actionsCell);

      progressTableBody.appendChild(row);
    });
  }

  // Save progress back to localStorage
  function saveProgress() {
    localStorage.setItem("topics", JSON.stringify(topics));
  }

  // Initial load
  loadProgressTable();
});
