# Syllabus Deadline Optimizer

The **Syllabus Deadline Optimizer** is a web-based application designed to help professors manage their course syllabi, ensuring that the syllabus is completed on time before semester deadlines. It provides a dynamic platform for defining course topics, scheduling lectures, and tracking progress. This tool aims to streamline the syllabus management process, reduce the chances of missed deadlines, and provide an efficient way for professors to stay on top of their academic planning.




## Features

- **Course Topic Management**: Define and sequence course topics based on the syllabus.
- **Lecture Allocation**: Allocate estimated lecture hours for each topic, with backend logic to automatically divide the time among subtopics.
- **Dynamic Scheduling**: Schedule lectures dynamically based on deadlines and adjust according to progress.
- **Progress Tracking**: Track the completion of topics and manage the overall syllabus progress.
- **User Authentication**: Users can register, log in, and manage their profiles.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
  - JS frameworks: Vanilla JS for frontend logic.
- **Backend**: Java, Spring Boot
  - Spring Data JPA for database interaction.
  - PostgreSQL as the database.
- **Other Tools**:
  - **VS Code** for frontend development.
  - **IntelliJ IDEA** for backend development.



## Setup Instructions

### Prerequisites

- Java 17 or later
- Spring Boot 3.x
- PostgreSQL
- Maven or Gradle for build automation
- Node.js and npm (for frontend development)

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/itspiyush3451/syllabus-deadline-optimizer.git
    cd syllabus-deadline-optimizer/backend
    ```

2. Create a PostgreSQL database and configure your `application.properties` in the `src/main/resources` directory with your database credentials:

    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
    spring.datasource.username=your_db_username
    spring.datasource.password=your_db_password
    ```

3. Run the Spring Boot application:

    ```bash
    ./mvnw spring-boot:run
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd ../frontend
    ```

2. Open `index.html` in your browser to view the application.

### Database Setup

- The backend uses **Spring Data JPA** for automatic database table creation. Ensure your PostgreSQL database is running and configured properly.

### Running the Application

1. Start the backend (Spring Boot application).
2. Open the frontend files (HTML pages) in a browser to interact with the application.

## Contribution

If you'd like to contribute to the project, feel free to fork the repository, create a new branch, and submit a pull request. Please ensure your changes align with the project's goals and follow the existing code structure.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Spring Boot** for providing a comprehensive backend framework.
- **PostgreSQL** for being the reliable database solution.
- **Vanilla JS** for simple frontend development.

## Contact

For any questions or feedback, you can reach out to piyushyadav7666@gmail.com.


