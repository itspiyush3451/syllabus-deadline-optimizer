# Syllabus Deadline Optimizer

![GitHub](https://img.shields.io/github/license/itspiyush3451/syllabus-deadline-optimizer)
![GitHub last commit](https://img.shields.io/github/last-commit/itspiyush3451/syllabus-deadline-optimizer)
![GitHub issues](https://img.shields.io/github/issues/itspiyush3451/syllabus-deadline-optimizer)

The **Syllabus Deadline Optimizer** is a web-based application designed to help professors manage their course syllabi, ensuring that the syllabus is completed on time before semester deadlines. It provides a dynamic platform for defining course topics, scheduling lectures, and tracking progress. This tool aims to streamline the syllabus management process, reduce the chances of missed deadlines, and provide an efficient way for professors to stay on top of their academic planning.



##  Features

### Core Features
- **Course Topic Management**: Define and sequence course topics based on the syllabus.
- **Lecture Allocation**: Allocate estimated lecture hours for each topic, with backend logic to automatically divide the time among subtopics.
- **Dynamic Scheduling**: Schedule lectures dynamically based on deadlines and adjust according to progress.
- **Progress Tracking**: Track the completion of topics and manage the overall syllabus progress.
- **User Authentication**: Users can register, log in, and manage their profiles.

### Advanced Features
- **Real-time Updates**: WebSocket integration for instant progress updates
- **AI-powered Optimization**: Smart deadline scheduling and resource allocation
- **Interactive Dashboard**: Visual representation of course progress and deadlines
- **Role-based Access Control**: Different permissions for professors and students
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies Used

### Frontend
- **HTML5, CSS3, JavaScript**
  - Vanilla JS for frontend logic
  - Responsive design principles
  - Modern UI/UX practices
  - WebSocket for real-time updates

### Backend
- **Java, Spring Boot**
  - Spring Data JPA for database interaction
  - Spring Security for authentication
  - JWT for secure token management
  - WebSocket for real-time communication

### Database
- **MySQL**
  - Optimized database schema
  - Efficient query performance
  - Data persistence and integrity

### Development Tools
- **VS Code** for frontend development
- **IntelliJ IDEA** for backend development
- **Git** for version control
- **Maven** for dependency management

##  Setup Instructions

### Prerequisites

- Java 17 or later
- Spring Boot 3.x
- MySQL 8.0 or later
- Maven 3.6 or later
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/itspiyush3451/syllabus-deadline-optimizer.git
   cd syllabus-deadline-optimizer/backend
   ```

2. Configure database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/syllabus_optimizer
   spring.datasource.username=root
   spring.datasource.password=root
   ```

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   python -m http.server 5500
   ```

3. Access the application at `http://localhost:5500`

##  Project Structure

```
syllabus-deadline-optimizer/
├── backend/
│   └── syllabus-deadline-optimizer-backend/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   └── resources/
│       │   └── test/
│       └── pom.xml
├── frontend/
│   ├── css/
│   ├── js/
│   ├── img/
│   ├── pages/
│   └── index.html
└── README.md
```

##  Security Features

- JWT-based authentication
- Password encryption using BCrypt
- CORS configuration
- XSS protection
- Input validation
- Secure session management

##  Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgements

- **Spring Boot** for providing a comprehensive backend framework
- **MySQL** for being the reliable database solution
- **Vanilla JS** for simple frontend development
- All contributors who have helped shape this project

##  Contact

Piyush Yadav - [piyus3451@gmail.com](mailto:piyus3451@gmail.com)

Project Link: [https://github.com/itspiyush3451/syllabus-deadline-optimizer](https://github.com/itspiyush3451/syllabus-deadline-optimizer)

##  Future Enhancements

- Mobile application development
- Integration with learning management systems
- Advanced analytics and reporting
- AI-powered study recommendations
- Calendar integration with popular platforms
- Multi-language support
- Offline mode support
