import type { Employee } from "../constants/employee";

export interface EmployeeFormErrors {
  employeeName?: string;
  email?: string;
  mobile?: string;
  department?: string;
  designation?: string;
  salary?: string;
  address?: string;
  joiningDate?: string;
}

export const validateEmployee = (
  employee: Employee
): EmployeeFormErrors => {
  const errors: EmployeeFormErrors = {};

  if (!employee.employeeName.trim()) {
    errors.employeeName = "Employee name is required.";
  }

  if (!employee.email.trim()) {
    errors.email = "Email is required.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (!employee.mobile.trim()) {
    errors.mobile = "Mobile number is required.";
  } else if (!/^\d{10}$/.test(employee.mobile)) {
    errors.mobile = "Mobile number must contain exactly 10 digits.";
  }

  if (!employee.department) {
    errors.department = "Department is required.";
  }

  if (!employee.designation) {
    errors.designation = "Designation is required.";
  }

  if (employee.salary <= 0) {
    errors.salary = "Salary must be greater than zero.";
  }

  if (!employee.address.trim()) {
    errors.address = "Address is required.";
  }

  if (!employee.joiningDate) {
    errors.joiningDate = "Joining date is required.";
  } else {
    const today = new Date();
    const selectedDate = new Date(employee.joiningDate);

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      errors.joiningDate = "Joining date cannot be in the future.";
    }
  }

  return errors;
};