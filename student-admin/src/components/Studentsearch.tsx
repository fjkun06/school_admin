import React from "react";

interface StudentSearchProps {
  searchQuery: string;
  searchType: "name" | "id";
  onSearchChange: (query: string) => void;
  onSearchTypeChange: (type: "name" | "id") => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

const StudentSearch: React.FC<StudentSearchProps> = ({
  searchQuery,
  searchType,
  onSearchChange,
  onSearchTypeChange,
  onSearchSubmit
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Search Students
      </h2>

      <form onSubmit={onSearchSubmit} className="flex flex-col space-y-4">
        {/* Search Type Selection */}
        <div className="flex space-x-4 items-center">
          <label>
            <input
              type="radio"
              name="searchType"
              value="name"
              checked={searchType === "name"}
              onChange={() => onSearchTypeChange("name")}
              className="mr-2"
            />
            Search by Name
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="id"
              checked={searchType === "id"}
              onChange={() => onSearchTypeChange("id")}
              className="mr-2"
            />
            Search by ID
          </label>
        </div>

        {/* Input Field Based on Search Type */}
        <div className="flex space-x-4 items-center">
          <input
            type={searchType === "id" ? "number" : "text"}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              searchType === "name" ? "Search by name" : "Search by ID"
            }
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-500 transition"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentSearch;
