import { useState } from "react";
import type { Employee } from "../../constants/employee";
import { validateEmployee, type EmployeeFormErrors } from "../../utils/employeeValidation";
import { DEPARTMENTS } from "../../constants/departments";
import { DESIGNATIONS } from "../../constants/designations";

interface EmployeeFormProps {
  initialValues: Employee;
  onSubmit: (employee: Employee) => Promise<void>;
  isSubmitting?: boolean;
}

const EmployeeForm = ({
  initialValues,
  onSubmit,
  isSubmitting = false,
}: EmployeeFormProps) => {
  const [employee, setEmployee] = useState<Employee>(initialValues);
  const [errors, setErrors] = useState<EmployeeFormErrors>({});

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setEmployee((previous) => ({
      ...previous,
      [name]:
        name === "salary"
          ? Number(value)
          : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validationErrors = validateEmployee(employee);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await onSubmit(employee);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Employee Name */}
      <div className="mb-3">
        <label className="form-label">
          Employee Name
        </label>

        <input
          type="text"
          name="employeeName"
          value={employee.employeeName}
          onChange={handleChange}
          className={`form-control ${
            errors.employeeName ? "is-invalid" : ""
          }`}
          disabled={isSubmitting}
        />

        {errors.employeeName && (
          <div className="invalid-feedback">
            {errors.employeeName}
          </div>
        )}
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          className={`form-control ${
            errors.email ? "is-invalid" : ""
          }`}
          disabled={isSubmitting}
        />

        {errors.email && (
          <div className="invalid-feedback">
            {errors.email}
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="mb-3">
        <label className="form-label">
          Mobile
        </label>

        <input
          type="text"
          name="mobile"
          value={employee.mobile}
          onChange={handleChange}
          maxLength={10}
          className={`form-control ${
            errors.mobile ? "is-invalid" : ""
          }`}
          disabled={isSubmitting}
        />

        {errors.mobile && (
          <div className="invalid-feedback">
            {errors.mobile}
          </div>
        )}
      </div>

      {/* Department */}
      <div className="mb-3">
        <label className="form-label">
          Department
        </label>

        <select
          name="department"
          value={employee.department}
          onChange={handleChange}
          className={`form-select ${
            errors.department ? "is-invalid" : ""
          }`}
          disabled={isSubmitting}
        >
          <option value="">Select Department</option>

          {DEPARTMENTS.map((department) => (
            <option
              key={department}
              value={department}
            >
              {department}
            </option>
          ))}
        </select>

        {errors.department && (
          <div className="invalid-feedback">
            {errors.department}
          </div>
        )}
      </div>

      {/* Designation */}
      <div className="mb-3">
        <label className="form-label">
          Designation
        </label>

        <select
          name="designation"
          value={employee.designation}
          onChange={handleChange}
          className={`form-select ${
            errors.designation ? "is-invalid" : ""
          }`}
          disabled={isSubmitting}
        >
          <option value="">Select Designation</option>

          {DESIGNATIONS.map((designation) => (
            <option
              key={designation}
              value={designation}
            >
              {designation}
            </option>
          ))}
        </select>

        {errors.designation && (
          <div className="invalid-feedback">
            {errors.designation}
          </div>
        )}
      </div>

      {/* Salary */}
      <div className="mb-3">
        <label className="form-label">
          Salary
        </label>

        <input
          type="number"
          name="salary"
          value={employee.salary || ""}
          onChange={handleChange}
          min="0"
          className={`form-control ${
            errors.salary ? "is-invalid" : ""
          }`}
          disabled={isSubmitting}
        />

        {errors.salary && (
          <div className="invalid-feedback">
            {errors.salary}
          </div>
        )}
      </div>

      {/* Address */}
      <div className="mb-3">
        <label className="form-label">
          Address
        </label>

        <textarea
          name="address"
          value={employee.address}
          onChange={handleChange}
          rows={3}
          className={`form-control ${
            errors.address ? "is-invalid" : ""
          }`}
          disabled={isSubmitting}
        />

        {errors.address && (
          <div className="invalid-feedback">
            {errors.address}
          </div>
        )}
      </div>

      {/* Joining Date */}
      <div className="mb-3">
        <label className="form-label">
          Joining Date
        </label>

        <input
          type="date"
          name="joiningDate"
          value={employee.joiningDate}
          onChange={handleChange}
          className={`form-control ${
            errors.joiningDate ? "is-invalid" : ""
          }`}
          disabled={isSubmitting}
        />

        {errors.joiningDate && (
          <div className="invalid-feedback">
            {errors.joiningDate}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;