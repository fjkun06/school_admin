import java.util.*;

public class ProjectUtils {
  public static Student findClosestMatch(String input, ArrayList<Student> students) {
    if (input == null || students == null || students.isEmpty()) {
      return null;
    }

    final String searchInput = input.toLowerCase(); // Declare final variable
    Student bestMatch = null;
    int minDistance = Integer.MAX_VALUE;

    Map<String, Integer> cache = new HashMap<>();

    for (Student student : students) {
      if (student.name == null)
        continue;

      String studentName = student.name.toLowerCase();
      String[] nameParts = studentName.split("\\s+");

      // ✅ Exact match check
      if (searchInput != null && searchInput.trim().toLowerCase().equals(studentName)) {
        return student;
      }

      // ✅ Check against the full name
      int fullNameDistance = cache.computeIfAbsent(studentName, k -> levenshteinDistance(searchInput, k));
      if (fullNameDistance < minDistance) {
        minDistance = fullNameDistance;
        bestMatch = student;
      }

      // ✅ Check against each name part
      for (String part : nameParts) {
        int partDistance = cache.computeIfAbsent(part, k -> levenshteinDistance(searchInput, k));
        if (partDistance < minDistance) {
          minDistance = partDistance;
          bestMatch = student;
        }
      }
    }

    int threshold = (searchInput.length() >= 5) ? 3 : 2;
    return (minDistance <= threshold) ? bestMatch : null;
  }

  // 🔹 Optimized Levenshtein Distance (Space-optimized O(n) memory)
  public static int levenshteinDistance(String a, String b) {
    int[] prev = new int[b.length() + 1];
    int[] curr = new int[b.length() + 1];

    for (int j = 0; j <= b.length(); j++) {
      prev[j] = j;
    }

    for (int i = 1; i <= a.length(); i++) {
      curr[0] = i;
      for (int j = 1; j <= b.length(); j++) {
        int cost = (a.charAt(i - 1) == b.charAt(j - 1)) ? 0 : 1;
        curr[j] = Math.min(Math.min(curr[j - 1] + 1, prev[j] + 1), prev[j - 1] + cost);
      }
      int[] temp = prev;
      prev = curr;
      curr = temp;
    }

    return prev[b.length()];
  }
}
