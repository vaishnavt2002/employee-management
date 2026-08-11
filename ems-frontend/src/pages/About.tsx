const features = [
  "Browse employees with pagination for large datasets",
  "Search employees by name",
  "Filter by department or designation",
  "Sort by salary or joining date",
  "Add, edit, and delete employee records",
  "Dashboard with headcount and salary analytics",
];

const About = () => {
  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h2>About</h2>
        <p className="text-muted mb-0">Employee Management System</p>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <p className="mb-0">
            The Employee Management System (EMS) is a web application for
            managing an organization's workforce. It provides a simple,
            centralized way to maintain employee records and gain insight into
            key workforce metrics such as headcount and salary distribution
            across departments and designations.
          </p>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header fw-semibold">Key Features</div>
        <ul className="list-group list-group-flush">
          {features.map((feature) => (
            <li key={feature} className="list-group-item">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="card shadow-sm">
        <div className="card-header fw-semibold">Technology</div>
        <div className="card-body">
          <p className="mb-0">
            Built with a React + TypeScript frontend styled with Bootstrap, and
            a Spring Boot REST API backend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
