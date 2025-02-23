package net.madhaus;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;

public class Student {
    @JsonProperty
    int id;

    @JsonProperty
    String name;

    // Constructor to create a new student
    @JsonCreator
    public Student(@JsonProperty("id") int id, @JsonProperty("name") String name) {
        this.id = id;
        this.name = name;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
    // Display student details
    public void displayStudent() {
      System.out.println("ID: " + id + ", Name: " + name);
    }
    
    public String toString() {
      return "ID: " + id + ", Name: " + name;
    }
}