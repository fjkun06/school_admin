class Student {
    int id;
    String name;

    // Constructor to create a new student
    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    // Display student details
    public void displayStudent() {
      System.out.println("ID: " + id + ", Name: " + name);
    }
    
    public String toString() {
      return "ID: " + id + ", Name: " + name;
    }
}