document.addEventListener("DOMContentLoaded", () => {
  const calendarTable = document.getElementById("calendar-table");
  const addTopicForm = document.getElementById("add-subject-form");
  const API_BASE_URL = "http://localhost:8081/api/calendar";
  
  // WebSocket connection
  const socket = new SockJS('http://localhost:8081/ws');
  const stompClient = Stomp.over(socket);
  
  // Connect to WebSocket
  stompClient.connect({}, frame => {
    console.log('Connected to WebSocket');
    stompClient.subscribe('/topic/events', message => {
      const data = JSON.parse(message.body);
      if (typeof data === 'string') {
        showNotification(data);
      } else {
        fetchTopics(); // Refresh the table when we get an update
      }
    });
  });

  // Notification system
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Fetch topics from the backend
  async function fetchTopics() {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      renderCalendar(data);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
      showNotification("Unable to load topics. Please try again later.");
    }
  }

  // Render calendar topics
  function renderCalendar(topics) {
    calendarTable.innerHTML = `
      <thead>
        <tr>
          <th>Course</th>
          <th>Topic</th>
          <th>Subtopics</th>
          <th>Deadline</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${topics.map(topic => `
          <tr>
            <td>${topic.course}</td>
            <td>${topic.name}</td>
            <td>${topic.subtopics}</td>
            <td>${topic.deadline}</td>
            <td>${topic.status}</td>
            <td>
              <button class="edit-button" data-id="${topic.id}">Edit</button>
              <button class="delete-button" data-id="${topic.id}">Delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;

    // Attach event listeners
    document.querySelectorAll(".edit-button").forEach(btn => 
      btn.addEventListener("click", () => editTopic(btn.dataset.id))
    );
    document.querySelectorAll(".delete-button").forEach(btn => 
      btn.addEventListener("click", () => deleteTopic(btn.dataset.id))
    );
  }

  // Edit topic
  async function editTopic(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const topic = await response.json();

      // Populate form fields
      document.getElementById("course").value = topic.course;
      document.getElementById("subject-name").value = topic.name;
      document.getElementById("estimated-lectures").value = topic.estimatedLectures;
      document.getElementById("chapter-sequence").value = topic.sequence;
      document.getElementById("modules").value = topic.subtopics;
      document.getElementById("deadline-date").value = topic.deadline;
      document.getElementById("status").value = topic.status;
      document.getElementById("action").value = "update";
      document.getElementById("original-subject-name").value = topic.name;
    } catch (error) {
      console.error("Failed to edit topic:", error);
      showNotification("Unable to fetch topic details. Please try again.");
    }
  }

  // Delete topic
  async function deleteTopic(id) {
    if (!confirm("Are you sure you want to delete this topic?")) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      await fetchTopics();
      showNotification("Topic deleted successfully!");
    } catch (error) {
      console.error("Failed to delete topic:", error);
      showNotification("Unable to delete topic. Please try again.");
    }
  }

  // Optimize deadlines
  async function optimizeDeadlines() {
    try {
      const response = await fetch(`${API_BASE_URL}/optimize`, {
        method: "POST",
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const optimizedEvents = await response.json();
      renderCalendar(optimizedEvents);
      showNotification("Deadlines optimized successfully!");
    } catch (error) {
      console.error("Failed to optimize deadlines:", error);
      showNotification("Unable to optimize deadlines. Please try again.");
    }
  }

  // Form submission for adding or updating a topic
  addTopicForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Validate inputs
    const course = document.getElementById("course").value.trim();
    const topicName = document.getElementById("subject-name").value.trim();
    const estimatedLectures = parseInt(document.getElementById("estimated-lectures").value, 10);
    const topicSequence = document.getElementById("chapter-sequence").value.trim();
    const subtopics = document.getElementById("modules").value.split(",").map(item => item.trim());
    const deadline = document.getElementById("deadline-date").value.trim();
    const status = document.getElementById("status").value.trim();
    const action = document.getElementById("action").value;
    const originalTopicName = document.getElementById("original-subject-name").value.trim();

    if (!course || !topicName || !deadline || !subtopics.length) {
      showNotification("Please fill in all required fields.");
      return;
    }

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

    try {
      const endpoint = action === "update" 
        ? `${API_BASE_URL}/${originalTopicName}`
        : API_BASE_URL;
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
      await fetchTopics();
      showNotification(action === "update" ? "Topic updated successfully!" : "Topic added successfully!");
    } catch (error) {
      console.error("Failed to save topic:", error);
      showNotification("Failed to save topic. Please try again.");
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

  // Add optimize button to the page
  const optimizeButton = document.createElement('button');
  optimizeButton.textContent = 'Optimize Deadlines';
  optimizeButton.className = 'optimize-button';
  optimizeButton.onclick = optimizeDeadlines;
  document.querySelector('main').appendChild(optimizeButton);

  // Add some CSS for the new elements
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #4CAF50;
      color: white;
      padding: 15px;
      border-radius: 5px;
      z-index: 1000;
      animation: slideIn 0.5s ease-out;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .optimize-button {
      background-color: #2196F3;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin: 20px;
      font-size: 16px;
      transition: background-color 0.3s;
    }

    .optimize-button:hover {
      background-color: #1976D2;
    }
  `;
  document.head.appendChild(style);

  // Initial load
  fetchTopics();
});
