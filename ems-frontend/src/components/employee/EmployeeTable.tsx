import { useNavigate } from "react-router-dom";
import type { Employee } from "../../constants/employee";

interface EmployeeTableProps {
  employees: Employee[];
  onDeleteClick: (employee: Employee) => void;
}

const EmployeeTable = ({
  employees,
  onDeleteClick,
}: EmployeeTableProps) => {
  const navigate = useNavigate();

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
            <th>Actions</th>
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
              <td>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => navigate(`/employees/${employee.id}`)}
                  >
                    View
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => navigate(`/employees/edit/${employee.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDeleteClick(employee)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;