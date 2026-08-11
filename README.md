# Employee Management System (EMS)

A full-stack Employee Management System for managing employee records, with a dashboard for workforce and salary analytics.

The project is a monorepo with two independent apps:

| Folder          | Stack                                   | Purpose                      |
|------------------|------------------------------------------|-------------------------------|
| `ems-backend`   | Java 21, Spring Boot, Spring Data JPA, MySQL | REST API                     |
| `ems-frontend`  | React 19, TypeScript, Vite, React Router, Bootstrap 5, Axios | Web UI                       |

---

## Features

- **Employee CRUD** — create, view, update, and delete employee records (name, email, mobile, department, designation, salary, address, joining date), with server-side validation
- **Paginated employee list**
- **Combined search, filter & sort** — search by name, filter by department/designation, and sort by name/department/designation/salary/joining date, all combinable in a single request
- **Dashboard analytics** — total employee count, department count, designation count, total salary expense, average salary, and per-department/designation breakdowns
- **Centralized error handling** with consistent JSON error responses (validation errors, not-found, duplicate email, invalid filters)

---

## Project Structure

```
employee-management/
├── ems-backend/                # Spring Boot REST API
│   └── src/main/java/com/avh/
│       ├── controller/         # EmployeeController, DashboardController
│       ├── service/            # Business logic
│       ├── repository/         # Spring Data JPA repositories
│       ├── specification/      # Combinable JPA Specifications (search/filter)
│       ├── entity/             # Employee entity
│       ├── dto/                # DashboardStatsDTO
│       ├── exception/          # Global exception handling
│       └── config/             # CORS configuration
└── ems-frontend/               # React + TypeScript SPA
    └── src/
        ├── pages/               # Home, Dashboard, EmployeeList, AddEmployee, EditEmployee, EmployeeDetails, About
        ├── components/          # Reusable UI (forms, tables, filters, layout)
        ├── services/            # Axios API clients (employeeService, dashboardService)
        └── constants/           # API endpoints, dropdown options, types
```

---

## Prerequisites

Make sure the following are installed before you start:

- **Java 21+** (JDK)
- **Maven** (or use the included `mvnw` / `mvnw.cmd` wrapper — no separate install needed)
- **MySQL 8+** running locally (or accessible remotely)
- **Node.js 18+** and **npm**

---

## Backend Setup (`ems-backend`)

### 1. Create the database

The app auto-creates the schema on first run (`createDatabaseIfNotExist=true` + `ddl-auto=update`), so you only need MySQL itself running — no need to manually create the database or tables.

### 2. Configure the database connection

Open `ems-backend/src/main/resources/application.properties` and set your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_management_system?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

> The project includes `spring-dotenv`, so instead of hardcoding credentials you can create an `ems-backend/.env` file (already git-ignored) and reference the values as environment variables, e.g.:
> ```
> DB_USERNAME=root
> DB_PASSWORD=your_mysql_password
> ```
> then in `application.properties`:
> ```properties
> spring.datasource.username=${DB_USERNAME}
> spring.datasource.password=${DB_PASSWORD}
> ```

### 3. Run the backend

From the `ems-backend` folder:

```bash
cd ems-backend

# using the Maven wrapper (recommended, no local Maven install needed)
./mvnw spring-boot:run        # macOS/Linux
mvnw.cmd spring-boot:run      # Windows

# or, if you have Maven installed globally
mvn spring-boot:run
```

The API starts on **http://localhost:8080**.

### 4. Verify it's running

```bash
curl http://localhost:8080/employees/count
```

You should get a JSON number back (`0` on a fresh database).

---

## Frontend Setup (`ems-frontend`)

### 1. Install dependencies

```bash
cd ems-frontend
npm install
```

### 2. Configure the API URL

The frontend reads the backend base URL from an environment variable. Create a `.env` file inside `ems-frontend/`:

```
VITE_API_URL=http://localhost:8080
```

### 3. Run the dev server

```bash
npm run dev
```

The app starts on **http://localhost:5173** (Vite's default port) and proxies API calls to the backend URL configured above.

### 4. Other useful scripts

```bash
npm run build      # type-check and build a production bundle
npm run preview    # preview the production build locally
npm run lint       # run ESLint
```

---

## Running Both Together

1. Start MySQL.
2. Start the backend: `cd ems-backend && ./mvnw spring-boot:run` (port `8080`).
3. Start the frontend: `cd ems-frontend && npm run dev` (port `5173`).
4. Open **http://localhost:5173** in your browser.

> The backend's CORS config only allows requests from `http://localhost:5173`. If you run the frontend on a different port, update `ems-backend/src/main/java/com/avh/config/CorsConfig.java` accordingly.

---

## API Reference

Base URL: `http://localhost:8080`

### Employees — `/employees`

| Method | Endpoint                          | Description                                                        |
|--------|------------------------------------|----------------------------------------------------------------------|
| POST   | `/employees`                      | Create a new employee                                                |
| GET    | `/employees?page=&size=`          | Paginated list of all employees                                      |
| GET    | `/employees/{id}`                 | Get a single employee by ID                                          |
| PUT    | `/employees/{id}`                 | Update an employee                                                   |
| DELETE | `/employees/{id}`                 | Delete an employee                                                   |
| GET    | `/employees/search?name=`         | Search employees by name (partial match)                             |
| GET    | `/employees/department/{department}` | List employees in a department                                    |
| GET    | `/employees/designation/{designation}` | List employees with a designation                                |
| GET    | `/employees/sort/salary`          | List employees sorted by salary                                      |
| GET    | `/employees/sort/joiningDate`     | List employees sorted by joining date                                |
| GET    | `/employees/count`                | Total employee count                                                 |
| GET    | `/employees/filter`               | **Combined** search + filter + sort + pagination (see below)         |

**`GET /employees/filter`** — all query params are optional and combinable:

```
/employees/filter?name=john&department=Engineering&designation=Manager&sortBy=salary&sortDir=desc&page=0&size=10
```

| Param         | Values                                                       |
|---------------|-----------------------------------------------------------------|
| `name`        | Partial, case-insensitive match on employee name                |
| `department`  | Exact, case-insensitive match                                   |
| `designation` | Exact, case-insensitive match                                   |
| `sortBy`      | `name` \| `department` \| `designation` \| `salary` \| `joiningDate` |
| `sortDir`     | `asc` \| `desc` (default `asc`)                                  |
| `page`        | Page number, 0-indexed (default `0`)                             |
| `size`        | Page size (default `10`)                                        |

### Dashboard — `/dashboard`

| Method | Endpoint          | Description                                                                 |
|--------|--------------------|-------------------------------------------------------------------------------|
| GET    | `/dashboard/stats` | Total employees, department count, designation count, total salary expense, average salary, and per-department/designation breakdowns |

---

## Tech Stack

**Backend:** Java 21 · Spring Boot · Spring Data JPA (with JPA Specifications) · MySQL · Bean Validation (Jakarta) · Lombok

**Frontend:** React 19 · TypeScript · Vite · React Router · Axios · Bootstrap 5
