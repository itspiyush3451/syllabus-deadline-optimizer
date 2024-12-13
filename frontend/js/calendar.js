document.addEventListener("DOMContentLoaded", () => {
  const calendarTable = document.getElementById("calendar-table");
  const addTopicForm = document.getElementById("add-subject-form");

  // Function to fetch topics from the backend
  function fetchTopics() {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => {
        renderCalendar(data);
      });
  }

  // Function to render the calendar with topics
  function renderCalendar(topics) {
    calendarTable.innerHTML = `
      <tr>
          <th>Course</th>
          <th>Topic</th>
          <th>Subtopics</th>
          <th>Deadline</th>
          <th>Actions</th>
      </tr>
    `;

    topics.forEach((topic) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${topic.course}</td>
        <td>${topic.name}</td>
        <td>${topic.subtopics}</td>
        <td>${topic.deadline}</td>
        <td>
            <button class="edit-button" onclick="editTopic(${topic.id})">Edit</button>
            <button class="delete-button" onclick="deleteTopic(${topic.id})">Delete</button>
        </td>
      `;
      calendarTable.appendChild(row);
    });
  }

  // Function to edit a topic
  window.editTopic = function (id) {
    fetch(`/api/events/${id}`)
      .then(response => response.json())
      .then(topic => {
        document.getElementById("course").value = topic.course;
        document.getElementById("subject-name").value = topic.name;
        document.getElementById("estimated-lectures").value = topic.estimatedLectures;
        document.getElementById("chapter-sequence").value = topic.sequence;
        document.getElementById("modules").value = topic.subtopics;
        document.getElementById("deadline-date").value = topic.deadline;
        document.get ElementById("status").value = topic.status;
        document.getElementById("action").value = "update";
        document.getElementById("original-subject-name").value = topic.name;
      });
  };

  // Function to delete a topic
  window.deleteTopic = function (id) {
    fetch(`/api/events/${id}`, {
      method: 'DELETE',
    }).then(() => {
      fetchTopics();
    });
  };

  // Handling the form submission for adding or updating a topic
  addTopicForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const course = document.getElementById("course").value;
    const topicName = document.getElementById("subject-name").value;
    const estimatedLectures = parseInt(document.getElementById("estimated-lectures").value);
    const topicSequence = document.getElementById("chapter-sequence").value;
    const subtopics = document.getElementById("modules").value.split(",").map(item => item.trim());
    const deadline = document.getElementById("deadline-date").value;
    const status = document.getElementById("status").value;
    const action = document.getElementById("action").value;
    const originalTopicName = document.getElementById("original-subject-name").value;

    const lectureSchedule = distributeLectures(estimatedLectures, subtopics.length);
    const eventData = {
      course,
      name: topicName,
      estimatedLectures,
      sequence: topicSequence,
      subtopics: subtopics.join(", "),
      deadline,
      status,
      lectureSchedule,
    };

    if (action === "update") {
      fetch(`/api/events/${originalTopicName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      }).then(() => {
        addTopicForm.reset();
        fetchTopics();
      });
    } else {
      fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      }).then(() => {
        addTopicForm.reset();
        fetchTopics();
      });
    }
  });

  fetchTopics();
});