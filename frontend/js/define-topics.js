document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('defineTopicForm');
    const topicsList = document.getElementById('topicsUL');

    // Function to add a topic
    function addTopic(e) {
        e.preventDefault();

        const topic = document.getElementById('topic').value;
        const deadline = document.getElementById('deadline').value;

        // Create a new list item for the topic
        const li = document.createElement('li');
        li.classList.add('topic-item');
        
        li.innerHTML = `
            <span class="topic-name">${topic}</span> - <span class="topic-deadline">${deadline}</span>
            <button class="remove-btn" onclick="removeTopic(this)">Remove</button>
        `;

        // Append the topic to the list
        topicsList.appendChild(li);

        // Reset the form
        form.reset();
    }

    // Function to remove a topic
    function removeTopic(button) {
        const topicItem = button.parentElement;
        topicsList.removeChild(topicItem);
    }

    // Handle form submission
    form.addEventListener('submit', addTopic);
});
