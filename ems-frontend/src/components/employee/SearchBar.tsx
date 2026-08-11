import { useState } from "react";

interface SearchBarProps {
  onSearch: (name: string) => void;
  onClear: () => void;
  isSearching?: boolean;
}

const SearchBar = ({
  onSearch,
  onClear,
  isSearching = false,
}: SearchBarProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim()) {
      onSearch(name.trim());
    }
  };

  const handleClear = () => {
    setName("");
    onClear();
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search by name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        disabled={isSearching}
      />

      <button
        type="submit"
        className="btn btn-outline-primary me-2"
        disabled={isSearching || !name.trim()}
      >
        Search
      </button>

      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={handleClear}
        disabled={isSearching}
      >
        Clear
      </button>
    </form>
  );
};

export default SearchBar;