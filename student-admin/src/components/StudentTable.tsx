"use client";
import { Student } from "@/app/page";
import React, { useState } from "react";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

const StudentTable: React.FC<StudentTableProps> = ({
  loading,
  students,
  onEdit,
  onDelete
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(students.length / studentsPerPage);

  // Slice students to only show current page
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = students?.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Student List for Maths304
      </h2>

      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 w-8 h-8"></div>
          <p className="text-gray-500 text-lg">Loading students...</p>
        </div>
      ) : students.length > 0 ? (
        <>
          <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-4 text-left">Id</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="p-4 text-gray-700">{student.id}</td>
                  <td className="p-4 text-gray-700">{student.name}</td>
                  <td className="p-4 text-gray-700">{student.email}</td>
                  <td className="p-4 flex justify-start space-x-4">
                    <button
                      onClick={() => onEdit(student)}
                      className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-md transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
              >
                Previous
              </button>
              <span className="text-lg text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
              >
                Next
              </button>
            </div>

            {/* Search/Filter */}
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center text-lg">
          No students added yet.
        </p>
      )}
    </div>
  );
};

export default StudentTable;
