package net.madhaus;

import java.util.*;

public class ProjectUtils {

  // Optimized function to find closest matches based on Levenshtein distance with max 2 character difference
  public static List<Student> findClosestMatch(String input, List<Student> students) {
    if (input == null || students == null || students.isEmpty()) {
      return Collections.emptyList();
    }

    // Normalize the search input for case-insensitive comparison
    String searchInput = input.toLowerCase().trim();
    List<Student> matches = new ArrayList<>();

    // Cache for storing calculated Levenshtein distances
    Map<String, Integer> cache = new HashMap<>();

    // Loop through all students to find potential matches
    for (Student student : students) {
      if (student.name == null) continue;

      String studentName = student.name.toLowerCase().trim();
      String[] nameParts = studentName.split("\\s+");

      // Compute the Levenshtein distance for the full name
      int fullNameDistance = cache.computeIfAbsent(studentName, k -> levenshteinDistance(searchInput, k));

      // If the distance is less than or equal to 2, we consider it a match
      if (fullNameDistance <= 2) {
        matches.add(student);
      }

      // Check individual name parts (e.g., first name, last name)
      for (String part : nameParts) {
        int partDistance = cache.computeIfAbsent(part, k -> levenshteinDistance(searchInput, k));
        if (partDistance <= 2) {
          matches.add(student);
        }
      }
    }

    // Remove duplicates by converting to a Set
    Set<Student> uniqueMatches = new LinkedHashSet<>(matches);
    return new ArrayList<>(uniqueMatches);
  }

  // Optimized Levenshtein Distance (Space-optimized O(n) memory)
  public static int levenshteinDistance(String a, String b) {
    int[] prev = new int[b.length() + 1];
    int[] curr = new int[b.length() + 1];

    // Initialize the prev array
    for (int j = 0; j <= b.length(); j++) {
      prev[j] = j;
    }

    // Compute the distance
    for (int i = 1; i <= a.length(); i++) {
      curr[0] = i;
      for (int j = 1; j <= b.length(); j++) {
        int cost = (a.charAt(i - 1) == b.charAt(j - 1)) ? 0 : 1;
        curr[j] = Math.min(Math.min(curr[j - 1] + 1, prev[j] + 1), prev[j - 1] + cost);
      }
      // Swap previous and current arrays
      int[] temp = prev;
      prev = curr;
      curr = temp;
    }

    return prev[b.length()];
  }
}
