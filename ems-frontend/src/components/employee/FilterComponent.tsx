import { DEPARTMENTS } from "../../constants/departments";
import { DESIGNATIONS } from "../../constants/designations";

export type SortOption = "" | "name" | "department" | "designation" | "salary" | "joiningDate";
export type SortDir = "asc" | "desc";

interface FilterComponentProps {
  department: string;
  designation: string;
  sortBy: SortOption;
  sortDir: SortDir;
  onDepartmentChange: (department: string) => void;
  onDesignationChange: (designation: string) => void;
  onSortChange: (sortBy: SortOption) => void;
  onSortDirChange: (sortDir: SortDir) => void;
  onReset: () => void;
  isLoading?: boolean;
}

const FilterComponent = ({
  department,
  designation,
  sortBy,
  sortDir,
  onDepartmentChange,
  onDesignationChange,
  onSortChange,
  onSortDirChange,
  onReset,
  isLoading = false,
}: FilterComponentProps) => {
  return (
    <div className="d-flex flex-wrap gap-2 align-items-center">
      <select
        className="form-select"
        style={{ maxWidth: "200px" }}
        value={department}
        onChange={(event) => onDepartmentChange(event.target.value)}
        disabled={isLoading}
      >
        <option value="">All Departments</option>

        {DEPARTMENTS.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <select
        className="form-select"
        style={{ maxWidth: "200px" }}
        value={designation}
        onChange={(event) => onDesignationChange(event.target.value)}
        disabled={isLoading}
      >
        <option value="">All Designations</option>

        {DESIGNATIONS.map((designationOption) => (
          <option key={designationOption} value={designationOption}>
            {designationOption}
          </option>
        ))}
      </select>

      <select
        className="form-select"
        style={{ maxWidth: "200px" }}
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value as SortOption)}
        disabled={isLoading}
      >
        <option value="">No Sorting</option>
        <option value="name">Sort by Name</option>
        <option value="department">Sort by Department</option>
        <option value="designation">Sort by Designation</option>
        <option value="salary">Sort by Salary</option>
        <option value="joiningDate">Sort by Joining Date</option>
      </select>

      <select
        className="form-select"
        style={{ maxWidth: "150px" }}
        value={sortDir}
        onChange={(event) => onSortDirChange(event.target.value as SortDir)}
        disabled={isLoading || !sortBy}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onReset}
        disabled={isLoading}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterComponent;