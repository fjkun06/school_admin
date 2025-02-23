package net.madhaus;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;

public class Student {
    @JsonProperty
    int id;

    @JsonProperty
    String name;

    @JsonProperty
    String email;

    // Constructor to create a new student
    @JsonCreator
    public Student(@JsonProperty("id") int id, @JsonProperty("name") String name,@JsonProperty("email") String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }


    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }


}