'use client'
import { Student } from "@/app/page";
import React, { useState } from "react";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(students.length / studentsPerPage);

  // Slice students to only show current page
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = students.slice(startIndex, startIndex + studentsPerPage);

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4">Student List for Maths304</h2>

      {students.length > 0 ? (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Id</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id} className="text-center border-t">
                  <td className="border p-2">{student.id}</td>
                  <td className="border p-2">{student.name}</td>
                  <td className="border p-2">{student.email}</td>
                  <td className="border p-2 flex justify-center space-x-2">
                    <button onClick={() => onEdit(student)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => onDelete(student.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-gray-300 rounded mx-2 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-gray-300 rounded mx-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center">No students added yet.</p>
      )}
    </div>
  );
};

export default StudentTable;
