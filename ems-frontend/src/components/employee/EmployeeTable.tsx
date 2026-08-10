import type { Employee } from "../../constants/employee";

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable = ({
  employees,
}: EmployeeTableProps) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Joining Date</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.employeeName}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>
              <td>{employee.salary}</td>
              <td>{employee.joiningDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;