import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import EmployeeTable from "../components/employee/EmployeeTable";
import Pagination from "../components/common/Pagination";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import ConfirmationDialog from "../components/common/ConfirmationDialog";
import SearchBar from "../components/employee/SearchBar";
import FilterComponent, {
  type SortOption,
  type SortDir,
} from "../components/employee/FilterComponent";

import employeeService from "../services/employeeService";
import type { Employee } from "../constants/employee";

const PAGE_SIZE = 10;

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(true);

  // All filters coexist and are sent together on every request.
  const [searchName, setSearchName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const successMessage = location.state?.message;

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await employeeService.filterEmployees({
        name: searchName,
        department,
        designation,
        sortBy,
        sortDir,
        page,
        size: PAGE_SIZE,
      });

      setEmployees(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setIsFirst(data.first);
      setIsLast(data.last);
      setPage(data.number);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setError("Failed to load employees. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchName, department, designation, sortBy, sortDir, page]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleAddEmployee = () => navigate("/employees/add");
  const handleRefresh = () => fetchEmployees();

  const handlePrev = () => { if (!isFirst) setPage((p) => p - 1); };
  const handleNext = () => { if (!isLast) setPage((p) => p + 1); };

  const handleSearch = (name: string) => { setPage(0); setSearchName(name); };
  const handleClearSearch = () => { setPage(0); setSearchName(""); };
  const handleDepartmentChange = (value: string) => { setPage(0); setDepartment(value); };
  const handleDesignationChange = (value: string) => { setPage(0); setDesignation(value); };
  const handleSortChange = (value: SortOption) => { setPage(0); setSortBy(value); };
  const handleSortDirChange = (value: SortDir) => { setPage(0); setSortDir(value); };

  const handleResetFilters = () => {
    setPage(0);
    setDepartment("");
    setDesignation("");
    setSortBy("");
    setSortDir("asc");
  };

  const handleDeleteClick = (employee: Employee) => setEmployeeToDelete(employee);

  const handleDeleteConfirm = async () => {
    if (!employeeToDelete?.id) return;

    try {
      setIsDeleting(true);

      await employeeService.deleteEmployee(employeeToDelete.id);

      setEmployeeToDelete(null);
      fetchEmployees();
    } catch (error) {
      console.error("Failed to delete employee:", error);
      setError("Failed to delete employee. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Employees</h2>
          <p className="text-muted mb-0">Manage employee records</p>
        </div>

        <button type="button" className="btn btn-primary" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </div>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <div className="d-flex flex-wrap gap-3 justify-content-between mb-3">
        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} isSearching={loading} />

        <FilterComponent
          department={department}
          designation={designation}
          sortBy={sortBy}
          sortDir={sortDir}
          onDepartmentChange={handleDepartmentChange}
          onDesignationChange={handleDesignationChange}
          onSortChange={handleSortChange}
          onSortDirChange={handleSortDirChange}
          onReset={handleResetFilters}
          isLoading={loading}
        />
      </div>

      {loading && <Loading />}

      {!loading && error && (
        <div>
          <ErrorMessage message={error} />
          <button type="button" className="btn btn-outline-primary" onClick={handleRefresh}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && employees.length === 0 && (
        <EmptyState message="No employees found." />
      )}

      {!loading && !error && employees.length > 0 && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Total Employees: {totalElements}</span>

            <button type="button" className="btn btn-outline-secondary" onClick={handleRefresh}>
              Refresh
            </button>
          </div>

          <EmployeeTable employees={employees} onDeleteClick={handleDeleteClick} />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            isFirst={isFirst}
            isLast={isLast}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </>
      )}

      <ConfirmationDialog
        show={employeeToDelete !== null}
        title="Delete Employee"
        message={
          employeeToDelete
            ? `Are you sure you want to delete ${employeeToDelete.employeeName}? This action cannot be undone.`
            : ""
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setEmployeeToDelete(null)}
        isProcessing={isDeleting}
      />
    </div>
  );
};

export default EmployeeList;
