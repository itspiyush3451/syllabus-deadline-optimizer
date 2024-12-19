document.addEventListener("DOMContentLoaded", () => {
  const calendarTable = document.getElementById("calendar-table");
  const form = document.getElementById("add-subject-form");

  const TOPICS_KEY = "topics";

  // Load topics from localStorage
  function loadTopics() {
    return JSON.parse(localStorage.getItem(TOPICS_KEY)) || [];
  }

  // Save topics to localStorage
  function saveTopics(topics) {
    localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
  }

  // Render the calendar table
  function renderCalendar() {
    const topics = loadTopics();
    calendarTable.innerHTML = `
      <thead>
        <tr>
          <th>Course</th>
          <th>Subject</th>
          <th>Estimated Lectures</th>
          <th>Completed Lectures</th>
          <th>Modules</th>
          <th>Deadline</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${topics
          .map(
            (topic, index) => `
            <tr>
              <td>${topic.course}</td>
              <td>${topic.subject}</td>
              <td>${topic.totalLectures}</td>
              <td>${topic.completedLectures || 0}</td>
              <td>${topic.modules.join(", ")}</td>
              <td>${topic.deadline}</td>
              <td>${topic.status}</td>
              <td>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
              </td>
            </tr>
          `
          )
          .join("")}
      </tbody>
    `;
  }

  // Handle form submission (Add/Update topic)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const topics = loadTopics();
    const action = document.getElementById("action").value;
    const originalSubjectName = document.getElementById(
      "original-subject-name"
    ).value;

    const newTopic = {
      course: document.getElementById("course").value,
      subject: document.getElementById("subject-name").value,
      totalLectures: parseInt(
        document.getElementById("estimated-lectures").value,
        10
      ),
      modules: document
        .getElementById("modules")
        .value.split(",")
        .map((mod) => mod.trim()),
      chapterSequence: parseInt(
        document.getElementById("chapter-sequence").value,
        10
      ),
      deadline: document.getElementById("deadline-date").value,
      status: document.getElementById("status").value,
      completedLectures: 0,
    };

    if (action === "edit") {
      const index = topics.findIndex(
        (topic) => topic.subject === originalSubjectName
      );
      if (index !== -1) topics[index] = newTopic;
    } else {
      topics.push(newTopic);
    }

    saveTopics(topics);
    renderCalendar();
    form.reset();
  });

  // Handle edit and delete actions
  calendarTable.addEventListener("click", (e) => {
    const topics = loadTopics();
    const index = e.target.dataset.index;

    if (e.target.classList.contains("edit-btn")) {
      const topic = topics[index];
      document.getElementById("course").value = topic.course;
      document.getElementById("subject-name").value = topic.subject;
      document.getElementById("estimated-lectures").value = topic.totalLectures;
      document.getElementById("modules").value = topic.modules.join(", ");
      document.getElementById("chapter-sequence").value = topic.chapterSequence;
      document.getElementById("deadline-date").value = topic.deadline;
      document.getElementById("status").value = topic.status;
      document.getElementById("original-subject-name").value = topic.subject;
      document.getElementById("action").value = "edit";
    } else if (e.target.classList.contains("delete-btn")) {
      topics.splice(index, 1);
      saveTopics(topics);
      renderCalendar();
    }
  });

  renderCalendar();
});
