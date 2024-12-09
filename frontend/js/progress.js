document.addEventListener("DOMContentLoaded", () => {
  const progressTable = document
    .getElementById("progress-table")
    .getElementsByTagName("tbody")[0];

  // Retrieve progress data from localStorage (can be saved in a structure like an array of objects)
  const progressData = JSON.parse(localStorage.getItem("progressData")) || [];

  // Function to render the progress table
  function renderProgressTable() {
    // Clear the table before rendering new rows
    progressTable.innerHTML = "";

    progressData.forEach((entry, index) => {
      const row = document.createElement("tr");

      // Create table cells for each progress entry
      row.innerHTML = `
        <td>${entry.course}</td>
        <td>${entry.topic}</td>
        <td>${entry.status}</td>
        <td>${entry.completion}%</td>
        <td>
          <button class="edit-button" onclick="editProgress(${index})">Edit</button>
          <button class="delete-button" onclick="deleteProgress(${index})">Delete</button>
        </td>
      `;

      progressTable.appendChild(row);
    });
  }

  // Function to edit progress of a topic
  window.editProgress = function (index) {
    const entry = progressData[index];
    const newStatus = prompt("Enter new status:", entry.status);
    const newCompletion = prompt(
      "Enter new completion percentage:",
      entry.completion
    );

    if (newStatus && newCompletion) {
      // Update the progress data with the new values
      progressData[index] = {
        ...entry,
        status: newStatus,
        completion: parseInt(newCompletion, 10),
      };
      localStorage.setItem("progressData", JSON.stringify(progressData));
      renderProgressTable();
    }
  };

  // Function to delete a progress entry
  window.deleteProgress = function (index) {
    progressData.splice(index, 1); // Remove the entry from the array
    localStorage.setItem("progressData", JSON.stringify(progressData)); // Save updated data
    renderProgressTable();
  };

  // Example of adding a new progress entry (you might use a form or other methods to capture these)
  // This is for testing purposes.
  document
    .getElementById("add-progress-btn")
    ?.addEventListener("click", function () {
      const newEntry = {
        course: "Sample Course",
        topic: "Sample Topic",
        status: "In Progress",
        completion: 50,
      };
      progressData.push(newEntry);
      localStorage.setItem("progressData", JSON.stringify(progressData));
      renderProgressTable();
    });

  renderProgressTable();
});
