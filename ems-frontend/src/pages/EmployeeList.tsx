import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import EmployeeTable from "../components/employee/EmployeeTable";
import Pagination from "../components/common/Pagination";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import ConfirmationDialog from "../components/common/ConfirmationDialog";
import SearchBar from "../components/employee/SearchBar";
import FilterComponent, { type SortOption } from "../components/employee/FilterComponent";

import employeeService from "../services/employeeService";
import type { Employee } from "../constants/employee";

const PAGE_SIZE = 20;

type ViewMode = "all" | "search" | "filtered";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(true);

  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("");

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const successMessage = location.state?.message;

  const fetchEmployees = useCallback(async (pageToFetch: number) => {
    try {
      setLoading(true);
      setError("");

      const data = await employeeService.getAllEmployees(pageToFetch, PAGE_SIZE);

      setEmployees(data.content);
      setTotalPages(data.totalPages);
      setIsFirst(data.first);
      setIsLast(data.last);
      setPage(data.number);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setError("Failed to load employees. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (viewMode === "all") {
      fetchEmployees(page);
    }
  }, [page, viewMode, fetchEmployees]);

  const handleAddEmployee = () => navigate("/employees/add");

  const handleRefresh = () => {
    if (viewMode === "all") fetchEmployees(page);
  };

  const handlePrev = () => { if (!isFirst) setPage((p) => p - 1); };
  const handleNext = () => { if (!isLast) setPage((p) => p + 1); };

  const resetToAll = () => {
    setViewMode("all");
    setDepartment("");
    setDesignation("");
    setSortBy("");
    setPage(0);
  };

  const handleSearch = async (name: string) => {
    try {
      setLoading(true);
      setError("");

      const results = await employeeService.searchByName(name);

      setEmployees(results);
      setViewMode("search");
    } catch (error) {
      console.error("Failed to search employees:", error);
      setError("Failed to search employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentChange = async (value: string) => {
    setDepartment(value);
    setDesignation("");
    setSortBy("");

    if (!value) { resetToAll(); return; }

    try {
      setLoading(true);
      setError("");

      const results = await employeeService.getByDepartment(value);

      setEmployees(results);
      setViewMode("filtered");
    } catch (error) {
      console.error("Failed to filter by department:", error);
      setError("Failed to filter employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDesignationChange = async (value: string) => {
    setDesignation(value);
    setDepartment("");
    setSortBy("");

    if (!value) { resetToAll(); return; }

    try {
      setLoading(true);
      setError("");

      const results = await employeeService.getByDesignation(value);

      setEmployees(results);
      setViewMode("filtered");
    } catch (error) {
      console.error("Failed to filter by designation:", error);
      setError("Failed to filter employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (value: SortOption) => {
    setSortBy(value);
    setDepartment("");
    setDesignation("");

    if (!value) { resetToAll(); return; }

    try {
      setLoading(true);
      setError("");

      const results =
        value === "salary"
          ? await employeeService.sortBySalary()
          : await employeeService.sortByJoiningDate();

      setEmployees(results);
      setViewMode("filtered");
    } catch (error) {
      console.error("Failed to sort employees:", error);
      setError("Failed to sort employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (employee: Employee) => setEmployeeToDelete(employee);

  const handleDeleteConfirm = async () => {
    if (!employeeToDelete?.id) return;

    try {
      setIsDeleting(true);

      await employeeService.deleteEmployee(employeeToDelete.id);

      const deletedId = employeeToDelete.id;
      setEmployeeToDelete(null);

      if (viewMode === "all") {
        fetchEmployees(page);
      } else {
        setEmployees((previous) => previous.filter((e) => e.id !== deletedId));
      }
    } catch (error) {
      console.error("Failed to delete employee:", error);
      setError("Failed to delete employee. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

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
        <SearchBar onSearch={handleSearch} onClear={resetToAll} isSearching={loading} />

        <FilterComponent
          department={department}
          designation={designation}
          sortBy={sortBy}
          onDepartmentChange={handleDepartmentChange}
          onDesignationChange={handleDesignationChange}
          onSortChange={handleSortChange}
          onReset={resetToAll}
          isLoading={loading}
        />
      </div>

      {error && (
        <div>
          <ErrorMessage message={error} />
          <button type="button" className="btn btn-outline-primary" onClick={handleRefresh}>
            Try Again
          </button>
        </div>
      )}

      {!error && employees.length === 0 && (
        <EmptyState message="No employees found." />
      )}

      {!error && employees.length > 0 && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Total Employees: {employees.length}</span>

            <button type="button" className="btn btn-outline-secondary" onClick={handleRefresh}>
              Refresh
            </button>
          </div>

          <EmployeeTable employees={employees} onDeleteClick={handleDeleteClick} />

          {viewMode === "all" && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              isFirst={isFirst}
              isLast={isLast}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          )}
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