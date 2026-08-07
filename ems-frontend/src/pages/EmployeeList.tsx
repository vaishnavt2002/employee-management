import { useEffect, useState } from "react";
import type { Employee } from "../constants/employee";
import employeeService from "../services/employeeService";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import EmployeeTable from "../components/employee/EmployeeTable";

const EmployeeList = () => {

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(()=>{
    fetchEmployees();
  },[])

  const fetchEmployees = async () =>{
    try{
      setLoading(true);
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    }
    catch (err) {
      console.error(err);
      setError("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  }
  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error} />;

  if (employees.length === 0)
    return <EmptyState message="No employees found." />;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employees</h2>

      <EmployeeTable employees={employees} />
    </div>
  );
};

export default EmployeeList;