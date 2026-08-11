import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import ConfirmationDialog from "../components/common/ConfirmationDialog";

import employeeService from "../services/employeeService";
import type { Employee } from "../constants/employee";

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await employeeService.getEmployeeById(Number(id));
        setEmployee(data);
      } catch (error) {
        console.error("Failed to fetch employee:", error);
        setError("Failed to load employee details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await employeeService.deleteEmployee(Number(id));

      navigate("/employees", {
        state: { message: "Employee deleted successfully." },
      });
    } catch (error) {
      console.error("Failed to delete employee:", error);
      setError("Failed to delete employee. Please try again.");
      setShowConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Details</h2>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(`/employees/edit/${employee.id}`)}
          >
            Edit
          </button>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => setShowConfirm(true)}
          >
            Delete
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/employees")}
          >
            Back
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <tbody>
          <tr><th>ID</th><td>{employee.id}</td></tr>
          <tr><th>Name</th><td>{employee.employeeName}</td></tr>
          <tr><th>Email</th><td>{employee.email}</td></tr>
          <tr><th>Mobile</th><td>{employee.mobile}</td></tr>
          <tr><th>Department</th><td>{employee.department}</td></tr>
          <tr><th>Designation</th><td>{employee.designation}</td></tr>
          <tr><th>Salary</th><td>{employee.salary}</td></tr>
          <tr><th>Address</th><td>{employee.address}</td></tr>
          <tr><th>Joining Date</th><td>{employee.joiningDate}</td></tr>
        </tbody>
      </table>

      <ConfirmationDialog
        show={showConfirm}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employee.employeeName}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
        isProcessing={isDeleting}
      />
    </div>
  );
};

export default EmployeeDetails;