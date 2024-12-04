document.addEventListener('DOMContentLoaded', function () {
    const calendarElement = document.getElementById('calendar');
    const taskList = document.getElementById('taskList');

    // Example events array with tasks and completion status
    const events = [
        { date: "2024-12-05", title: "Topic 1 Lecture", completed: false },
        { date: "2024-12-10", title: "Topic 2 Lecture", completed: true },
        { date: "2024-12-15", title: "Topic 3 Lecture", completed: false },
        { date: "2024-12-20", title: "Topic 4 Lecture", completed: true }
    ];

    // Function to render the calendar
    function renderCalendar() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // 0-based (0=January)
        const currentYear = currentDate.getFullYear();

        // Create the calendar month grid
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const totalDaysInMonth = lastDayOfMonth.getDate();
        let html = "<table class='calendar-table'>";
        html += "<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>";
        let dayOfWeek = firstDayOfMonth.getDay(); // Day of the week for the 1st day of the month
        html += "<tr>";

        // Blank spaces before the first day of the month
        for (let i = 0; i < dayOfWeek; i++) {
            html += "<td></td>";
        }

        // Loop through all the days in the month
        for (let day = 1; day <= totalDaysInMonth; day++) {
            if (dayOfWeek === 7) {
                html += "</tr><tr>";
                dayOfWeek = 0;
            }
            const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

            // Check if there are events on this day
            const event = events.find(event => event.date === dateString);
            html += `<td class="calendar-day${event ? ' event-day' : ''}" data-date="${dateString}">${day}</td>`;
            dayOfWeek++;
        }

        // Fill the remaining empty cells for the last week of the month
        while (dayOfWeek < 7) {
            html += "<td></td>";
            dayOfWeek++;
        }

        html += "</tr></table>";
        calendarElement.innerHTML = html;

        // Add click event to calendar days
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.addEventListener('click', function () {
                const date = this.getAttribute('data-date');
                const event = events.find(event => event.date === date);
                if (event) {
                    renderTaskList(event);
                }
            });
        });
    }

    // Function to render tasks associated with a date
    function renderTaskList(event) {
        taskList.innerHTML = ''; // Clear the current task list

        const li = document.createElement('li');
        li.classList.add('task-item');
        li.innerHTML = `
            <span>${event.title}</span>
            <button class="toggle-btn" onclick="toggleCompletion('${event.date}')">${event.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
        `;
        taskList.appendChild(li);
    }

    // Function to toggle completion status of a task
    function toggleCompletion(date) {
        const event = events.find(event => event.date === date);
        if (event) {
            event.completed = !event.completed;
            renderCalendar();
            renderTaskList(event);
        }
    }

    // Initialize the calendar
    renderCalendar();
});
