import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmployeeForm from "../components/employee/EmployeeForm";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

import employeeService from "../services/employeeService";
import type { Employee } from "../constants/employee";

const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await employeeService.getEmployeeById(Number(id));
        setEmployee(data);
      } catch (error) {
        console.error("Failed to fetch employee:", error);
        setError("Failed to load employee.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (updatedEmployee: Employee) => {
    try {
      setIsSubmitting(true);
      setError("");

      await employeeService.updateEmployee(Number(id), updatedEmployee);

      navigate(`/employees/${id}`, {
        state: { message: "Employee updated successfully." },
      });
    } catch (error) {
      console.error("Failed to update employee:", error);
      setError("Unable to update employee. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error && !employee) {
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
      <h2 className="mb-4">Edit Employee</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <EmployeeForm
        initialValues={employee}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Update Employee"
      />
    </div>
  );
};

export default EditEmployee;