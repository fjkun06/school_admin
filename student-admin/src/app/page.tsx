"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define types for the student data
interface Student {
  id: number;
  name: string;
}

const API_URL = "http://localhost:8080/students";

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]); // Type the state as an array of Student objects
  const [name, setName] = useState<string>("");

  // Fetch students from backend
  useEffect(() => {
    axios
      .get<Student[]>(API_URL)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add student
  const addStudent = () => {
    if (!name) return alert("Enter a name!");
    axios
      .post<Student>(API_URL, { name })
      .then((res) => {
        setStudents([...students, res.data]);
        setName(""); // Clear input
      })
      .catch((err) => console.error(err));
  };

  // Delete student
  const deleteStudent = (id: number) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setStudents(students.filter((s) => s.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Student Management System</h1>

      {/* Add Student */}
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addStudent}>Add Student</button>

      {/* Student List */}
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name}
            <button onClick={() => deleteStudent(student.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
