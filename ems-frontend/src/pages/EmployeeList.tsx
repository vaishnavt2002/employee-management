import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import EmployeeTable from "../components/employee/EmployeeTable";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

import employeeService from "../services/employeeService";
import type { Employee } from "../constants/employee";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const successMessage = location.state?.message;

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await employeeService.getAllEmployees();

      setEmployees(data);
    } catch (error) {
      console.error(
        "Failed to fetch employees:",
        error
      );

      setError(
        "Failed to load employees. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleAddEmployee = () => {
    navigate("/employees/add");
  };

  const handleRefresh = () => {
    fetchEmployees();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-4">

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Employees</h2>
          <p className="text-muted mb-0">
            Manage employee records
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddEmployee}
        >
          Add Employee
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div
          className="alert alert-success"
          role="alert"
        >
          {successMessage}
        </div>
      )}

      {/* Error */}
      {error && (
        <div>
          <ErrorMessage message={error} />

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleRefresh}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!error && employees.length === 0 && (
        <EmptyState message="No employees found." />
      )}

      {/* Employee Table */}
      {!error && employees.length > 0 && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">

            <span className="text-muted">
              Total Employees: {employees.length}
            </span>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleRefresh}
            >
              Refresh
            </button>

          </div>

          <EmployeeTable
            employees={employees}
          />
        </>
      )}

    </div>
  );
};

export default EmployeeList;