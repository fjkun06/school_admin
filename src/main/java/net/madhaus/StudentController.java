package net.madhaus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Add a new student
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }


    // Get a student by ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable int id) {
        return studentService.searchStudentById(id);
    }

    // Delete a student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable int id) {
        boolean removed = studentService.removeStudent(id);
        return removed ? "Student removed" : "Student not found";
    }
}

