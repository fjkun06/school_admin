package net.madhaus;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import java.io.*;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
  private static final String FILE_NAME = "students.json";
  private final ObjectMapper objectMapper = new ObjectMapper();
  private ArrayList<Student> students = new ArrayList<>();
  private int studentId = 1;

  public StudentService() {
    // load the students list
    loadData();
  }

  public Student addStudent(Student student) {
    student.setId(studentId++);
    students.add(student);
    saveData();
    return student;
  }

  public ArrayList<Student> getAllStudents() {
    return students;
  }


  public Student searchStudentById(int id) {
    return students.stream().filter(s -> s.getId() == id).findFirst().orElse(null);
  }

  public boolean removeStudent(int id) {
    boolean removed = students.removeIf(s -> s.getId() == id);
    if (removed) {
      saveData();
    }
    return removed;
  }

  public void saveData() {
    try (Writer writer = new FileWriter(FILE_NAME)) {
      objectMapper.writeValue(writer, students);
    } catch (IOException e) {
      System.out.println("Error saving data: " + e.getMessage());
    }
  }

  private void loadData() {
    File file = new File(FILE_NAME);
    if (!file.exists())
      return;

    try (Reader reader = new FileReader(FILE_NAME)) {
            students = objectMapper.readValue(reader, new TypeReference<ArrayList<Student>>() {});
                 if (!students.isEmpty()) {
                studentId = students.get(students.size() - 1).id + 1;
            }else{
              System.out.println("No students found in the file.");
            }

    } catch (IOException e) {
      System.out.println("Error loading data: " + e.getMessage());
    }
  }}
