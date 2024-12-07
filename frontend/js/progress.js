document.addEventListener("DOMContentLoaded", () => {
  const progressTable = document.getElementById("progress-table");

  // Retrieve topics from local storage
  const topics = JSON.parse(localStorage.getItem("topics")) || [];

  function renderProgress() {
    progressTable.innerHTML = `
            <tr>
                <th>Course</th>
                <th>Topic</th>
                <th>Estimated Hours</th>
                <th>Topic Sequence</th>
                <th>Subtopics</th>
                <th>Deadline</th>
                <th>Status</th>
            </tr>
        `;
    topics.forEach((topic) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${topic.course}</td>
                <td>${topic.name}</td>
                <td>${topic.estimatedHours}</td>
                <td>${topic.sequence}</td>
                <td>${topic.subtopics.join(", ")}</td>
                <td>${topic.deadline}</td>
                <td>${topic.status}</td>
            `;
      progressTable.appendChild(row);
    });
  }

  renderProgress();
});
