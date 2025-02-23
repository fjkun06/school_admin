import java.util.ArrayList;
import java.util.Scanner;

public class StudentManagementSystem {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<Student> students = new ArrayList<>();
        int studentId = 1; // Unique ID for each student

        while (true) {
            // Display menu options
            System.out.println("\nStudent Management System");
            System.out.println("1. Add Student");
            System.out.println("2. View Students");
            System.out.println("3. Search Student (via ID)");
            System.out.println("4. Remove Student (via ID)");
            System.out.println("5. Exit");
            System.out.print("Choose an option: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1: // Add Student
                    System.out.print("Enter student name: ");
                    String name = scanner.nextLine();
                    students.add(new Student(studentId, name));
                    System.out.println("Student added with ID: " + studentId);
                    studentId++; // Increment ID for the next student
                    break;

                case 2: // View Students
                    if (students.isEmpty()) {
                        System.out.println("No students found.");
                    } else {
                        System.out.println("List of Students:");
                        for (Student student : students) {
                            student.displayStudent();
                        }
                    }
                    break;

                case 3: // Search Student
                    System.out.print("Enter student ID to search: ");
                    int searchId = scanner.nextInt();
                    boolean found = false;
                    for (Student student : students) {
                        if (student.id == searchId) {
                            System.out.println("Student found:");
                            student.displayStudent();
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        System.out.println("Student not found.");
                    }
                    break;

                case 4: // Remove Student
                    System.out.print("Enter student ID to remove: ");
                    int removeId = scanner.nextInt();
                    boolean removed = false;
                    for (int i = 0; i < students.size(); i++) {
                        if (students.get(i).id == removeId) {
                            students.remove(i);
                            System.out.println("Student removed.");
                            removed = true;
                            break;
                        }
                    }
                    if (!removed) {
                        System.out.println("Student ID not found.");
                    }
                    break;

                case 5: // Exit Program
                    System.out.println("Exiting Student Management System...");
                    scanner.close();
                    return;

                default:
                    System.out.println("Invalid choice. Please select a valid option.");
            }
        }
    }
}
