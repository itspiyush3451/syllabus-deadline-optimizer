document.addEventListener("DOMContentLoaded", () => {
  const progressTable = document
    .getElementById("progress-table")
    .getElementsByTagName("tbody")[0];

  // Function to render the progress table
  function renderProgressTable(progressData) {
    progressTable.innerHTML = "";

    progressData.forEach((entry, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${entry.course}</td>
        <td>${entry.topic}</td>
        <td>${entry.status}</td>
        <td>${entry.completion}%</td>
        <td>
          <button class="edit-button" onclick="editProgress(${entry.id})">Edit</button>
          <button class="delete-button" onclick="deleteProgress(${entry.id})">Delete</button>
        </td>
      `;

      progressTable.appendChild(row);
    });
  }

  // Fetch and render progress data
  function fetchProgress() {
    fetch("/api/progress")
      .then((response) => response.json())
      .then((progressData) => {
        renderProgressTable(progressData);
      })
      .catch((error) => console.error("Error fetching progress data:", error));
  }

  // Function to edit progress of a topic
  window.editProgress = function (id) {
    fetch(`/api/progress/${id}`)
      .then((response) => response.json())
      .then((entry) => {
        const newStatus = prompt("Enter new status:", entry.status);
        const newCompletion = prompt(
          "Enter new completion percentage:",
          entry.completion
        );

        if (newStatus && newCompletion) {
          const updatedEntry = {
            ...entry,
            status: newStatus,
            completion: parseInt(newCompletion, 10),
          };

          fetch(`/api/progress/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEntry),
          })
            .then(() => {
              fetchProgress(); // Refresh progress table
            })
            .catch((error) => console.error("Error updating progress:", error));
        }
      })
      .catch((error) => console.error("Error fetching progress entry:", error));
  };

  // Function to delete a progress entry
  window.deleteProgress = function (id) {
    fetch(`/api/progress/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchProgress(); // Refresh progress table
      })
      .catch((error) => console.error("Error deleting progress entry:", error));
  };

  // Example of adding a new progress entry
  document
    .getElementById("add-progress-btn")
    ?.addEventListener("click", function () {
      const newEntry = {
        course: "Sample Course",
        topic: "Sample Topic",
        status: "In Progress",
        completion: 50,
      };

      fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      })
        .then(() => {
          fetchProgress(); // Refresh progress table
        })
        .catch((error) => console.error("Error adding progress:", error));
    });

  fetchProgress();
});
