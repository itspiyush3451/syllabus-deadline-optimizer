document.addEventListener("DOMContentLoaded", () => {
  const topicForm = document.getElementById("define-topic-form");
  const topicList = document.getElementById("topic-list");
  const topics = JSON.parse(localStorage.getItem("topics")) || [];

  // Function to render topics
  function renderTopics() {
    topicList.innerHTML = "";

    topics.forEach((topic) => {
      const topicItem = document.createElement("div");
      topicItem.className = "topic-item";

      const subtopicsDetails = topic.subtopics
        .map(
          (sub, index) =>
            `<li>${sub} (Lecture ${topic.lectureSchedule[index]})</li>`
        )
        .join("");

      topicItem.innerHTML = `
        <h3>${topic.name} (${topic.course})</h3>
        <p>Estimated Lectures: ${topic.estimatedLectures}</p>
        <p>Sequence: ${topic.sequence}</p>
        <p>Deadline: ${topic.deadline}</p>
        <p>Status: ${topic.status}</p>
        <ul>${subtopicsDetails}</ul>
        <button onclick="editTopic('${topic.name}')">Edit</button>
        <button onclick="deleteTopic('${topic.name}')">Delete</button>
      `;

      topicList.appendChild(topicItem);
    });
  }

  // Function to distribute lectures among subtopics
  function distributeLectures(totalLectures, subtopicCount) {
    const lectures = Array(subtopicCount).fill(
      Math.floor(totalLectures / subtopicCount)
    );
    let remainingLectures = totalLectures % subtopicCount;

    for (let i = 0; remainingLectures > 0; i++, remainingLectures--) {
      lectures[i]++;
    }

    return lectures;
  }

  // Add or update a topic
  topicForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const course = document.getElementById("course").value;
    const name = document.getElementById("topic-name").value;
    const estimatedLectures = parseInt(
      document.getElementById("estimated-lectures").value
    );
    const sequence = document.getElementById("topic-sequence").value;
    const subtopics = document
      .getElementById("subtopics")
      .value.split(",")
      .map((sub) => sub.trim());
    const deadline = document.getElementById("deadline-date").value;
    const status = document.getElementById("status").value;
    const action = document.getElementById("action").value;
    const originalTopicName = document.getElementById(
      "original-topic-name"
    ).value;

    const lectureSchedule = distributeLectures(
      estimatedLectures,
      subtopics.length
    );

    if (action === "update") {
      // Update existing topic
      const updatedTopics = topics.map((topic) => {
        if (topic.name === originalTopicName) {
          return {
            course,
            name,
            estimatedLectures,
            sequence,
            subtopics,
            deadline,
            status,
            lectureSchedule,
          };
        }
        return topic;
      });
      localStorage.setItem("topics", JSON.stringify(updatedTopics));
    } else {
      // Add new topic
      const newTopic = {
        course,
        name,
        estimatedLectures,
        sequence,
        subtopics,
        deadline,
        status,
        lectureSchedule,
      };
      topics.push(newTopic);
      localStorage.setItem("topics", JSON.stringify(topics));
    }

    topicForm.reset();
    renderTopics();
  });

  // Edit a topic
  window.editTopic = function (topicName) {
    const topic = topics.find((t) => t.name === topicName);
    if (topic) {
      document.getElementById("course").value = topic.course;
      document.getElementById("topic-name").value = topic.name;
      document.getElementById("estimated-lectures").value =
        topic.estimatedLectures;
      document.getElementById("topic-sequence").value = topic.sequence;
      document.getElementById("subtopics").value = topic.subtopics.join(", ");
      document.getElementById("deadline-date").value = topic.deadline;
      document.getElementById("status").value = topic.status;
      document.getElementById("action").value = "update";
      document.getElementById("original-topic-name").value = topicName;
    }
  };

  // Delete a topic
  window.deleteTopic = function (topicName) {
    const updatedTopics = topics.filter((t) => t.name !== topicName);
    localStorage.setItem("topics", JSON.stringify(updatedTopics));
    renderTopics();
  };

  renderTopics();
});
document.addEventListener("DOMContentLoaded", () => {
  const topicForm = document.getElementById("define-topic-form");
  const topicList = document.getElementById("topic-list");
  const topics = JSON.parse(localStorage.getItem("topics")) || [];

  // Function to render topics
  function renderTopics() {
    topicList.innerHTML = "";

    topics.forEach((topic) => {
      const topicItem = document.createElement("div");
      topicItem.className = "topic-item";

      const subtopicsDetails = topic.subtopics
        .map(
          (sub, index) =>
            `<li>${sub} (Lecture ${topic.lectureSchedule[index]})</li>`
        )
        .join("");

      topicItem.innerHTML = `
        <h3>${topic.name} (${topic.course})</h3>
        <p>Estimated Lectures: ${topic.estimatedLectures}</p>
        <p>Sequence: ${topic.sequence}</p>
        <p>Deadline: ${topic.deadline}</p>
        <p>Status: ${topic.status}</p>
        <ul>${subtopicsDetails}</ul>
        <button onclick="editTopic('${topic.name}')">Edit</button>
        <button onclick="deleteTopic('${topic.name}')">Delete</button>
      `;

      topicList.appendChild(topicItem);
    });
  }

  // Function to distribute lectures among subtopics
  function distributeLectures(totalLectures, subtopicCount) {
    const lectures = Array(subtopicCount).fill(
      Math.floor(totalLectures / subtopicCount)
    );
    let remainingLectures = totalLectures % subtopicCount;

    for (let i = 0; remainingLectures > 0; i++, remainingLectures--) {
      lectures[i]++;
    }

    return lectures;
  }

  // Add or update a topic
  topicForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const course = document.getElementById("course").value;
    const name = document.getElementById("topic-name").value;
    const estimatedLectures = parseInt(
      document.getElementById("estimated-lectures").value
    );
    const sequence = document.getElementById("topic-sequence").value;
    const subtopics = document
      .getElementById("subtopics")
      .value.split(",")
      .map((sub) => sub.trim());
    const deadline = document.getElementById("deadline-date").value;
    const status = document.getElementById("status").value;
    const action = document.getElementById("action").value;
    const originalTopicName = document.getElementById(
      "original-topic-name"
    ).value;

    const lectureSchedule = distributeLectures(
      estimatedLectures,
      subtopics.length
    );

    if (action === "update") {
      // Update existing topic
      const updatedTopics = topics.map((topic) => {
        if (topic.name === originalTopicName) {
          return {
            course,
            name,
            estimatedLectures,
            sequence,
            subtopics,
            deadline,
            status,
            lectureSchedule,
          };
        }
        return topic;
      });
      localStorage.setItem("topics", JSON.stringify(updatedTopics));
    } else {
      // Add new topic
      const newTopic = {
        course,
        name,
        estimatedLectures,
        sequence,
        subtopics,
        deadline,
        status,
        lectureSchedule,
      };
      topics.push(newTopic);
      localStorage.setItem("topics", JSON.stringify(topics));
    }

    topicForm.reset();
    renderTopics();
  });

  // Edit a topic
  window.editTopic = function (topicName) {
    const topic = topics.find((t) => t.name === topicName);
    if (topic) {
      document.getElementById("course").value = topic.course;
      document.getElementById("topic-name").value = topic.name;
      document.getElementById("estimated-lectures").value =
        topic.estimatedLectures;
      document.getElementById("topic-sequence").value = topic.sequence;
      document.getElementById("subtopics").value = topic.subtopics.join(", ");
      document.getElementById("deadline-date").value = topic.deadline;
      document.getElementById("status").value = topic.status;
      document.getElementById("action").value = "update";
      document.getElementById("original-topic-name").value = topicName;
    }
  };

  // Delete a topic
  window.deleteTopic = function (topicName) {
    const updatedTopics = topics.filter((t) => t.name !== topicName);
    localStorage.setItem("topics", JSON.stringify(updatedTopics));
    renderTopics();
  };

  renderTopics();
});
