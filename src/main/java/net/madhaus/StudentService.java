package net.madhaus;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class StudentService {
  private static final String FILE_NAME = "students.json";
  private ArrayList<Student> students = new ArrayList<>();
  private int studentId = 1;
  private final ObjectMapper objectMapper = new ObjectMapper();
  private final ObjectNode jsonNode = objectMapper.createObjectNode();
  private final Scanner scanner = new Scanner(System.in);

  public StudentService() {
    // load the students list
    loadData();
  }

  public void addStudent() {
    System.out.print("Enter student name: ");
    String name = scanner.nextLine();
    students.add(new Student(studentId, name));
    System.out.println("Student added with ID: " + studentId);
    saveData();
    studentId++;
  }

  public void viewStudents() {
    if (students.isEmpty()) {
      System.out.println("No students found.");
    } else {
      for (Student student : students) {
        System.out.println("ID: " + student.id + ", Name: " + student.name);
      }
    }
  }

  public void searchStudent() {
    System.out.print("Enter student ID or Name to search: ");
    if (scanner.hasNextInt()) {
      int searchId = scanner.nextInt();
      scanner.nextLine(); // Consume newline
      for (Student student : students) {
        if (student.id == searchId) {
          System.out.println("Student found: ID = " + student.id + ", Name = " + student.name);
          return;
        }
      }
      System.out.println("Student not found.");
    } // if user enters a string: name
    else {
      String studentName = scanner.nextLine();
      // Store list of matches based on name
      List<Student> suggestionsList = ProjectUtils.findClosestMatch(studentName, students);
      if (suggestionsList.isEmpty()) {
        System.out.println("No student found.");
      } else {
        System.out.println("Found student(s):");
        for (Student student : suggestionsList) { // loop to display result
          student.displayStudent();
        }
      }
    }
  }

  public void removeStudent() {
    System.out.print("Enter student ID to remove: ");
    int removeId = scanner.nextInt();
    scanner.nextLine(); // Consume newline
    for (Student student : students) {
      if (student.id == removeId) {
        students.remove(student);
        saveData();
        System.out.println("Student removed.");
        return;
      }
    }
    System.out.println("Student ID not found.");
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
      System.out.println("Reading data from file...");
            students = objectMapper.readValue(reader, new TypeReference<ArrayList<Student>>() {});
      for (Student student : students) {
        System.out.println("ID: " + student.id + ", Name: " + student.name);
      }
            if (!students.isEmpty()) {
              System.out.println("Loaded " + students.size() + " students.");
                studentId = students.get(students.size() - 1).id + 1;
            }else{
              System.out.println("No students found in the file.");
            }


        
    } catch (IOException e) {
      System.out.println("Error loading data: " + e.getMessage());
    }
  }}
