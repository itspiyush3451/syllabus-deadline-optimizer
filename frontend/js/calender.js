document.addEventListener("DOMContentLoaded", () => {
  const calendarTable = document.getElementById("calendar-table");
  const addTopicForm = document.getElementById("add-topic-form");

  // Retrieve topics from local storage
  const topics = JSON.parse(localStorage.getItem("topics")) || [];

  // Function to render the calendar with topics
  function renderCalendar() {
    calendarTable.innerHTML = `
            <tr>
                <th>Course</th>
                <th>Topic</th>
                <th>Deadline</th>
                <th>Actions</th>
            </tr>
        `;

    topics.forEach((topic) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${topic.course}</td>
                <td>${topic.name}</td>
                <td>${topic.deadline}</td>
                <td>
                    <button class="edit-button" onclick="editTopic('${topic.name}')">Edit</button>
                    <button class="delete-button" onclick="deleteTopic('${topic.name}')">Delete</button>
                </td>
            `;
      calendarTable.appendChild(row);
    });
  }

  // Function to edit a topic
  window.editTopic = function (topicName) {
    const topic = topics.find((t) => t.name === topicName);
    if (topic) {
      document.getElementById("course").value = topic.course;
      document.getElementById("topic-name").value = topic.name;
      document.getElementById("estimated-hours").value = topic.estimatedHours;
      document.getElementById("topic-sequence").value = topic.sequence;
      document.getElementById("subtopics").value = topic.subtopics.join(", ");
      document.getElementById("deadline-date").value = topic.deadline;
      document.getElementById("status").value = topic.status;
      document.getElementById("action").value = "update";
      document.getElementById("original-topic-name").value = topicName;
    }
  };

  // Function to delete a topic
  window.deleteTopic = function (topicName) {
    const updatedTopics = topics.filter((t) => t.name !== topicName);
    localStorage.setItem("topics", JSON.stringify(updatedTopics));
    renderCalendar();
  };

  // Handling the form submission for adding or updating a topic
  addTopicForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const course = document.getElementById("course").value;
    const topicName = document.getElementById("topic-name").value;
    const estimatedHours = document.getElementById("estimated-hours").value;
    const topicSequence = document.getElementById("topic-sequence").value;
    const subtopics = document
      .getElementById("subtopics")
      .value.split(",")
      .map((item) => item.trim());
    const deadline = document.getElementById("deadline-date").value;
    const status = document.getElementById("status").value;
    const action = document.getElementById("action").value;
    const originalTopicName = document.getElementById(
      "original-topic-name"
    ).value;

    if (action === "update") {
      const updatedTopics = topics.map((topic) => {
        if (topic.name === originalTopicName) {
          return {
            course,
            name: topicName,
            estimatedHours,
            sequence: topicSequence,
            subtopics,
            deadline,
            status,
          };
        }
        return topic;
      });
      localStorage.setItem("topics", JSON.stringify(updatedTopics));
    } else {
      const newTopic = {
        course,
        name: topicName,
        estimatedHours,
        sequence: topicSequence,
        subtopics,
        deadline,
        status,
      };
      topics.push(newTopic);
      localStorage.setItem("topics", JSON.stringify(topics));
    }

    addTopicForm.reset();
    renderCalendar();
  });

  renderCalendar();
});
