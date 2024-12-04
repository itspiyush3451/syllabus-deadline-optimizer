document.getElementById('courseForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const courseName = document.getElementById('courseName').value;
    const courseCode = document.getElementById('courseCode').value;

    alert(`Course Added: ${courseName} (${courseCode})`);
    // Further logic to send data to the backend will be added later
});
