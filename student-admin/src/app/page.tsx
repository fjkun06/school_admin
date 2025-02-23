"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentTable from "@/components/StudentTable";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import StudentEditForm from "@/components/StudentEditForm";

export interface Student {
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
    email: ""
  });
  const [deleteStudentId, setDeleteStudentId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get<Student[]>(API_URL)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const toggleForm = () => {
    setFormVisible(!formVisible);
    setEditingStudent(null);
    setFormData({ id: 0, name: "", email: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateStudent = async (
    id: number,
    updatedData: { name: string; email: string }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: { "Content-Type": "application/json" }
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
      axios
        .post<Student>(API_URL, formData)
        .then((res) => setStudents([...students, res.data]));
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
        <button
          onClick={toggleForm}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          {formVisible ? "Hide Form" : "Add Student"}
        </button>

        <StudentEditForm
          formVisible={formVisible}
          editingStudent={editingStudent}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <StudentTable
          students={students}
          onEdit={handleEdit}
          onDelete={confirmDelete}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteStudentId !== null}
        onConfirm={handleDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
