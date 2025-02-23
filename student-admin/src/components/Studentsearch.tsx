import React from "react";

interface StudentSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

const StudentSearch: React.FC<StudentSearchProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit
}) => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Search Students by Name</h2>
      <form onSubmit={onSearchSubmit} className="mb-4 flex space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default StudentSearch;
