import { Link } from "react-router-dom";

interface NavCard {
  to: string;
  title: string;
  description: string;
  cta: string;
}

const navCards: NavCard[] = [
  {
    to: "/dashboard",
    title: "Dashboard",
    description: "View workforce statistics, headcount, and salary breakdowns at a glance.",
    cta: "View Dashboard",
  },
  {
    to: "/employees",
    title: "Employees",
    description: "Browse, search, filter, and manage all employee records.",
    cta: "Manage Employees",
  },
  {
    to: "/employees/add",
    title: "Add Employee",
    description: "Onboard a new employee by adding their details to the system.",
    cta: "Add Employee",
  },
  {
    to: "/about",
    title: "About",
    description: "Learn more about the Employee Management System and its features.",
    cta: "Learn More",
  },
];

const Home = () => {
  return (
    <div className="container mt-4">
      <div className="p-5 mb-4 bg-body-secondary rounded-3 text-center">
        <h1 className="display-5 fw-bold">Employee Management System</h1>
        <p className="lead mb-4">
          Welcome! Manage your organization's employees, track workforce
          statistics, and keep records up to date — all in one place.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link to="/employees" className="btn btn-primary btn-lg">
            View Employees
          </Link>
          <Link to="/dashboard" className="btn btn-outline-secondary btn-lg">
            Go to Dashboard
          </Link>
        </div>
      </div>

      <div className="row g-4">
        {navCards.map((card) => (
          <div key={card.to} className="col-sm-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text text-muted flex-grow-1">
                  {card.description}
                </p>
                <Link to={card.to} className="btn btn-outline-primary mt-2">
                  {card.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
