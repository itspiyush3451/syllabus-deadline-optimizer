document.addEventListener('DOMContentLoaded', function () {
    const topicList = document.getElementById('topicList');
    const progressFill = document.getElementById('progressFill');
    const completedCount = document.getElementById('completedCount');
    const totalCount = document.getElementById('totalCount');

    // Example topics array with completion status
    let topics = [
        { name: "Topic 1", completed: false },
        { name: "Topic 2", completed: true },
        { name: "Topic 3", completed: false },
        { name: "Topic 4", completed: true }
    ];

    // Function to update the progress bar
    function updateProgressBar() {
        const totalTopics = topics.length;
        const completedTopics = topics.filter(topic => topic.completed).length;
        const progressPercentage = (completedTopics / totalTopics) * 100;

        // Update the progress bar
        progressFill.style.width = `${progressPercentage}%`;

        // Update the progress info
        completedCount.textContent = completedTopics;
        totalCount.textContent = totalTopics;
    }

    // Function to toggle topic completion
    function toggleCompletion(index) {
        topics[index].completed = !topics[index].completed;
        updateProgressBar();
        renderTopics();
    }

    // Function to render topics in the list
    function renderTopics() {
        topicList.innerHTML = ''; // Clear the current list

        topics.forEach((topic, index) => {
            const li = document.createElement('li');
            li.classList.add('topic-item');
            li.innerHTML = `
                <span class="${topic.completed ? 'completed' : ''}">${topic.name}</span>
                <button class="toggle-btn" onclick="toggleCompletion(${index})">${topic.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
            `;
            topicList.appendChild(li);
        });
    }

    // Initialize the progress and render topics
    renderTopics();
    updateProgressBar();
});
