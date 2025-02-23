"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentTable from "@/components/StudentTable";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import StudentEditForm from "@/components/StudentEditForm";
import StudentSearch from "@/components/StudentSearch";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteStudentId, setDeleteStudentId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<"name" | "id">("name");

  useEffect(() => {
    axios
      .get<Student[]>(API_URL)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  // Fetch students
  const fetchStudents = async (
    query: string = "",
    type: "name" | "id" = "name"
  ) => {
    if (type === "name") {
      try {
        setLoading(true);
        const response = await axios.get<Student[]>(
          `${API_URL}${query ? `/search?name=${query}` : ""}`
        );
        setStudents(response.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        //gettiung by id
        console.log("entered fetchstudents id section");

        setLoading(true);
        const response = await axios.get<Student[]>(
          `${API_URL}${query ? `/${parseInt(query)}` : ""}`
        );
        setStudents([response.data] as unknown as Student[]);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    }
  };

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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  const handleSearchTypeChange = (type: "name" | "id") => {
    setSearchType(type);
  };
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStudents(searchQuery, searchType);
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
  const handleReset = () => {
    setSearchQuery(""); 
    setSearchType("name");
    fetchStudents(); // Fetch all students without any query
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
          {formVisible ? "Cancel" : "Add Student"}
        </button>

        <StudentEditForm
          formVisible={formVisible}
          editingStudent={editingStudent}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        {/* Search Component */}
        <StudentSearch
          searchQuery={searchQuery}
          searchType={searchType} // Passing the selected search type
          onSearchChange={handleSearchChange}
          onSearchTypeChange={handleSearchTypeChange} // To change search type
          onSearchSubmit={handleSearchSubmit}
          onReset={handleReset}
        />
        <StudentTable
          students={students}
          onEdit={handleEdit}
          onDelete={confirmDelete}
          loading={loading}
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
