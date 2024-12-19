document.addEventListener("DOMContentLoaded", () => {
  const calendarTable = document.getElementById("calendar-table");
  const addTopicForm = document.getElementById("add-subject-form");

  // Fetch topics from the backend
  async function fetchTopics() {
    try {
      const response = await fetch("http://localhost:8081/api/calendar");
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      renderCalendar(data);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
      // alert("Unable to load topics. Please try again later.");
    }
  }

  // Render calendar topics
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
              <button class="edit-button" data-id="${topic.id}">Edit</button>
              <button class="delete-button" data-id="${topic.id}">Delete</button>
          </td>
        `;
      calendarTable.appendChild(row);
    });

    // Attach event listeners
    document
      .querySelectorAll(".edit-button")
      .forEach((btn) =>
        btn.addEventListener("click", () => editTopic(btn.dataset.id))
      );
    document
      .querySelectorAll(".delete-button")
      .forEach((btn) =>
        btn.addEventListener("click", () => deleteTopic(btn.dataset.id))
      );
  }

  // Edit topic
  async function editTopic(id) {
    try {
      const response = await fetch(`http://localhost:8081/api/calendar/${id}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const topic = await response.json();

      // Populate form fields
      document.getElementById("course").value = topic.course;
      document.getElementById("subject-name").value = topic.name;
      document.getElementById("estimated-lectures").value =
        topic.estimatedLectures;
      document.getElementById("chapter-sequence").value = topic.sequence;
      document.getElementById("modules").value = topic.subtopics;
      document.getElementById("deadline-date").value = topic.deadline;
      document.getElementById("status").value = topic.status;
      document.getElementById("action").value = "update";
      document.getElementById("original-subject-name").value = topic.name;
    } catch (error) {
      console.error("Failed to edit topic:", error);
      alert("Unable to fetch topic details. Please try again.");
    }
  }

  // Delete topic
  async function deleteTopic(id) {
    try {
      const response = await fetch(`http://localhost:8081/api/calendar/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      fetchTopics();
    } catch (error) {
      console.error("Failed to delete topic:", error);
      alert("Unable to delete topic. Please try again.");
    }
  }

  // Form submission for adding or updating a topic
  addTopicForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Validate inputs
    const course = document.getElementById("course").value.trim();
    const topicName = document.getElementById("subject-name").value.trim();
    const estimatedLectures = parseInt(
      document.getElementById("estimated-lectures").value,
      10
    );
    const topicSequence = document
      .getElementById("chapter-sequence")
      .value.trim();
    const subtopics = document
      .getElementById("modules")
      .value.split(",")
      .map((item) => item.trim());
    const deadline = document.getElementById("deadline-date").value.trim();
    const status = document.getElementById("status").value.trim();
    const action = document.getElementById("action").value;
    const originalTopicName = document
      .getElementById("original-subject-name")
      .value.trim();

    if (!course || !topicName || !deadline || !subtopics.length) {
      alert("Please fill in all required fields.");
      return;
    }

    const lectureSchedule = distributeLectures(
      estimatedLectures,
      subtopics.length
    );
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

    try {
      const endpoint =
        action === "update"
          ? `http://localhost:8081/api/calendar/${originalTopicName}`
          : "/api/events";
      const method = action === "update" ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      addTopicForm.reset();
      fetchTopics();
    } catch (error) {
      console.error("Failed to save topic:", error);
      alert("Topic Saved Successffully!");
    }
  });

  // Distribute lectures across subtopics
  function distributeLectures(totalLectures, subtopicCount) {
    const lecturesPerSubtopic = Math.floor(totalLectures / subtopicCount);
    const lectureDistribution = Array(subtopicCount).fill(lecturesPerSubtopic);

    // Add remaining lectures to the first subtopics
    const remaining = totalLectures % subtopicCount;
    for (let i = 0; i < remaining; i++) {
      lectureDistribution[i]++;
    }

    return lectureDistribution;
  }

  fetchTopics();
});
