import { useState } from "react";
import { useNavigate } from "react-router-dom";

import EmployeeForm from "../components/employee/EmployeeForm";
import employeeService from "../services/employeeService";
import type { Employee } from "../constants/employee";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const initialValues: Employee = {
    employeeName: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
    salary: 0,
    address: "",
    joiningDate: "",
  };

  const handleSubmit = async (employee: Employee) => {
    try {
      setIsSubmitting(true);
      setError("");

      await employeeService.createEmployee(employee);

      navigate("/employees", {
        state: {
          message: "Employee created successfully.",
        },
      });
    } catch (error) {
      console.error(error);
      setError("Unable to create employee. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Employee</h2>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <EmployeeForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AddEmployee;