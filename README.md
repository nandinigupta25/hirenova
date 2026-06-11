# HireNova – AI-Powered Mock Interview Platform

HireNova is a full-stack SaaS application that helps students and job seekers prepare for interviews using AI. It simulates real interviews, evaluates candidate performance, analyzes resumes, and provides personalized feedback.

![HireNova Dashboard](https://img.shields.io/badge/Status-Active-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-cyan)

---

## Features

- **AI Interview Room** — Practice HR, Technical, DSA, System Design, and OOP questions
- **Resume Intelligence** — Upload PDF resume and get skill analysis and improvement suggestions
- **Coding Round** — Monaco editor with Java, Python, and C++ support
- **Analytics Dashboard** — Track performance, topic scores, and readiness index
- **Profile Management** — Update profile picture, bio, and interview history
- **JWT Authentication** — Secure login and registration system

---

## Tech Stack

### Frontend
- React.js 18
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Router DOM
- Axios
- Monaco Editor

### Backend
- Java 25
- Spring Boot 3.5
- Spring Security
- JWT Authentication
- Hibernate/JPA
- Maven

### Database
- PostgreSQL

---

## Getting Started

### Prerequisites
- Node.js v20+
- Java 21+
- PostgreSQL

### Frontend Setup

```bash
git clone https://github.com/nandinigupta25/hirenova.git
cd hirenova
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Backend Setup

```bash
git clone https://github.com/nandinigupta25/hirenova-backend.git
cd hirenova-backend
```

Create `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hirenova
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
jwt.secret=your_jwt_secret
jwt.expiration-ms=86400000
server.port=8080
spring.flyway.enabled=false
```

Then run:

```bash
./mvnw spring-boot:run
```

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | User authentication |
| Register | `/register` | Create new account |
| Dashboard | `/dashboard` | Overview and stats |
| Interview Room | `/interview` | Mock interview session |
| Coding Round | `/coding` | Code editor with problems |
| Resume Analysis | `/resume` | PDF resume analyzer |
| Profile | `/profile` | User profile and history |

---

## Project Structure
---

## Author

**Nandini Gupta**
- GitHub: [@nandinigupta25](https://github.com/nandinigupta25)

---

## License

This project is open source and available under the [MIT License](LICENSE).