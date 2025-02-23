"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Student {
  id: number;
  name: string;
  email: string;
}

const API_URL = "http://localhost:8080/students";

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<Student>({
    id: 0,
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteStudentId, setDeleteStudentId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get<Student[]>(API_URL)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err))
      .finally(() => setLoading(false));
  }, []);

  const toggleForm = () => {
    setFormVisible(!formVisible);
    setEditingStudent(null);
    setFormData({ id: 0, name: "", email: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateStudent = async (id: number, updatedData: { name: string; email: string }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: { "Content-Type": "application/json" },
    });

    setStudents((prevStudents) =>
      prevStudents.map((s) => (s.id === id ? response.data : s))
    );
    
    setEditingStudent(null);
    setFormVisible(false);
    setFormData({ id: 0, name: "", email: "" });
  } catch (error) {
    console.error("Error updating student:", error);
  }
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
    } else {
      axios.post<Student>(API_URL, formData).then((res) => setStudents([...students, res.data]));
    }

    toggleForm();
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData(student);
    setFormVisible(true);
  };

  const confirmDelete = (id: number) => {
    setDeleteStudentId(id);
  };

  const cancelDelete = () => {
    setDeleteStudentId(null);
  };

  const handleDelete = () => {
    if (deleteStudentId !== null) {
      axios.delete(`${API_URL}/${deleteStudentId}`).then(() => {
        setStudents(students.filter((s) => s.id !== deleteStudentId));
        setDeleteStudentId(null);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <nav className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-semibold">Student Management System</h1>
      </nav>

      <div className="container mx-auto p-6">
        <button onClick={toggleForm} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4">
          {formVisible ? "Hide Form" : "Add Student"}
        </button>

        {formVisible && (
          <div className="bg-white shadow-md p-6 rounded-md mb-6">
            <h2 className="text-xl font-semibold mb-4">{editingStudent ? "Edit Student" : "Add Student"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Student Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
              <input type="email" name="email" placeholder="Student Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                {editingStudent ? "Update Student" : "Add Student"}
              </button>
            </form>
          </div>
        )}

        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold mb-4">Student List for Maths304</h2>

          {loading ? (
            <p className="text-gray-500 text-center">Loading students...</p>
          ) : students.length > 0 ? (
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
                {students.map((student) => (
                  <tr key={student.id} className="text-center border-t">
                    <td className="border p-2">{student.id}</td>
                    <td className="border p-2">{student.name}</td>
                    <td className="border p-2">{student.email}</td>
                    <td className="border p-2 flex justify-center space-x-2">
                      <button onClick={() => handleEdit(student)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                        Edit
                      </button>
                      <button onClick={() => confirmDelete(student.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center">No students added yet.</p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteStudentId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete?</h2>
            <p className="text-gray-600 mb-4">This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Yes, Delete
              </button>
              <button onClick={cancelDelete} className="bg-gray-300 text-black px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
