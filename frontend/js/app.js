// Add/Edit/Delete topics
document
  .getElementById("syllabus-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const topicName = document.getElementById("topic-name").value;
    const topicDeadline = document.getElementById("topic-deadline").value;

    const tableBody = document
      .getElementById("syllabus-table")
      .querySelector("tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${topicName}</td>
        <td>${topicDeadline}</td>
        <td>Pending</td>
        <td>
            <button class="mark-completed">Mark Completed</button>
            <button class="delete-topic">Delete</button>
        </td>
    `;
    tableBody.appendChild(row);

    document.getElementById("topic-name").value = "";
    document.getElementById("topic-deadline").value = "";
  });

// Mark topic as completed
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("mark-completed")) {
    e.target.parentElement.parentElement.cells[2].innerText = "Completed";
    e.target.remove();
  }

  if (e.target.classList.contains("delete-topic")) {
    e.target.parentElement.parentElement.remove();
  }
});

const topics = JSON.parse(localStorage.getItem("topics")) || [];

function saveTopic(topicData) {
  topics.push(topicData);
  localStorage.setItem("topics", JSON.stringify(topics));
}

function getTopics() {
  return JSON.parse(localStorage.getItem("topics")) || [];
}

export { saveTopic, getTopics };
