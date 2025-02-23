import { Student } from "@/app/page";
import React from "react";

interface StudentFormProps {
  formVisible: boolean;
  editingStudent: Student | null;
  formData: { name: string; email: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const StudentEditForm: React.FC<StudentFormProps> = ({
  formVisible,
  editingStudent,
  formData,
  handleChange,
  handleSubmit
}) => {
  return (
    formVisible && (
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingStudent ? "Edit Student" : "Add Student"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Student Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    )
  );
};

export default StudentEditForm;
