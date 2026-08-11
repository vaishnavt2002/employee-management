import { useCallback, useEffect, useState } from "react";

import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

import dashboardService from "../services/dashboardService";
import type { DashboardStats } from "../constants/dashboard";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number) => currencyFormatter.format(value ?? 0);

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="col-sm-6 col-lg-3">
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">{label}</h6>
        <p className="card-text fs-3 fw-bold mb-0">{value}</p>
      </div>
    </div>
  </div>
);

interface BreakdownCardProps {
  title: string;
  data: Record<string, number>;
  formatValue?: (value: number) => string;
}

const BreakdownCard = ({ title, data, formatValue }: BreakdownCardProps) => {
  const entries = Object.entries(data ?? {});

  return (
    <div className="col-12 col-lg-6">
      <div className="card shadow-sm h-100">
        <div className="card-header fw-semibold">{title}</div>

        <div className="card-body">
          {entries.length === 0 ? (
            <EmptyState message="No data available." />
          ) : (
            <ul className="list-group list-group-flush">
              {entries.map(([key, value]) => (
                <li
                  key={key}
                  className="list-group-item px-0 d-flex justify-content-between"
                >
                  <span>{key}</span>
                  <span className="fw-semibold">
                    {formatValue ? formatValue(value) : value}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await dashboardService.getStats();

      setStats(data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      setError("Failed to load dashboard statistics. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Dashboard</h2>
          <p className="text-muted mb-0">Overview of workforce statistics</p>
        </div>

        <button type="button" className="btn btn-outline-secondary" onClick={fetchStats}>
          Refresh
        </button>
      </div>

      {error && (
        <div>
          <ErrorMessage message={error} />
          <button type="button" className="btn btn-outline-primary" onClick={fetchStats}>
            Try Again
          </button>
        </div>
      )}

      {!error && stats && (
        <>
          <div className="row g-3 mb-4">
            <StatCard label="Total Employees" value={stats.totalEmployees} />
            <StatCard label="Departments" value={stats.departmentCount} />
            <StatCard label="Designations" value={stats.designationCount} />
            <StatCard
              label="Total Salary Expense"
              value={formatCurrency(stats.totalSalaryExpense)}
            />
          </div>

          <div className="row g-3 mb-4">
            <div className="col-sm-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Average Salary</h6>
                  <p className="card-text fs-4 fw-bold mb-0">
                    {formatCurrency(stats.averageSalary)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3">
            <BreakdownCard
              title="Employees by Department"
              data={stats.employeeCountByDepartment}
            />
            <BreakdownCard
              title="Employees by Designation"
              data={stats.employeeCountByDesignation}
            />
            <BreakdownCard
              title="Salary Expense by Department"
              data={stats.salaryExpenseByDepartment}
              formatValue={formatCurrency}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;