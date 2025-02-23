package net.madhaus;

import java.util.Scanner;

public class StudentManagementSystem {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    StudentService studentService = new StudentService();
    try {
      while (true) {
        // Available options
        System.out.println("\nStudent Management System");
        System.out.println("1. Add Student");
        System.out.println("2. View Students");
        System.out.println("3. Search Student");
        System.out.println("4. Remove Student");
        System.out.println("5. Exit");
        System.out.print("Choose an option: ");

        int choice = 0;
        while (true) {
          System.out.print("What would you like to do (1 - 5)?: ");

          // Check if the user input is a valid integer
          if (scanner.hasNextInt()) {
            choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline, empty buffer

            // Check if the input is within the valid range
            if (choice >= 1 && choice <= 5) {
              break; // Valid choice, break the loop
            } else {
              System.out.println("Invalid choice. Please select a valid option (1 - 5).");
            }
          } else {
            System.out.println("Invalid input. Please enter an integer between 1 and 5.");
            scanner.nextLine(); // Clear invalid input
          }
        }

        switch (choice) {
          // Add Student
          case 1:
            studentService.addStudent();
            break;

          // View Students
          case 2:
            studentService.viewStudents();
            break;

          // Search Student
          case 3:
            studentService.searchStudent();
            break;

          // Remove Student
          case 4:
            studentService.removeStudent();
            break;

          // Exit Program
          case 5:
            studentService.saveData(); // Save before exiting
            System.out.println("Data saved. Exiting...");
            return;

          default:
            System.out.println("Invalid choice. Please select a valid option.");
        }

      }
    } finally {
      scanner.close();
    }

  }
}
