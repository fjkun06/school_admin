import java.util.*;

public class ProjectUtils {
  public static List<Student> findClosestMatch(String input, ArrayList<Student> students) {
    if (input == null || students == null || students.isEmpty()) {
      return null;
    }

    List<Student> matches = new ArrayList<Student>();
    final String searchInput = input.toLowerCase(); // value cannot be altered
    int minDistance = Integer.MAX_VALUE;

    Map<String, Integer> cache = new HashMap<>();

    for (Student student : students) {
      if (student.name == null)
        continue;

      String studentName = student.name.toLowerCase().trim();
      String[] nameParts = studentName.split("\\s+");

      // ✅ Exact match check
      if (searchInput.equals(studentName)) {
        matches.add(student);
      }

      // ✅ Check against the full name
      int fullNameDistance = cache.computeIfAbsent(studentName, k -> levenshteinDistance(searchInput, k));
      if (fullNameDistance < minDistance) {
        minDistance = fullNameDistance;
          }

      // ✅ Check against each name part
      for (String part : nameParts) {
        int partDistance = cache.computeIfAbsent(part, k -> levenshteinDistance(searchInput, k));
        if (partDistance < minDistance) {
          minDistance = partDistance;
        }
      }
    }

    int threshold = (searchInput.length() >= 5) ? 3 : 2;
    // Collect all the students that are within the threshold distance
    for (Student student : students) {
      if (student.name != null) {
        String studentName = student.name.toLowerCase().trim();
        int distance = levenshteinDistance(searchInput, studentName);

        // Include student if their Levenshtein distance is within the threshold
        if (distance <= threshold) {
          matches.add(student);
        }

        // Check name parts as well
        String[] nameParts = studentName.split("\\s+");
        for (String part : nameParts) {
          int partDistance = levenshteinDistance(searchInput, part);
          if (partDistance <= threshold) {
            matches.add(student);
          }
        }
      }
    }

    // Return matches, ensuring no duplicates
    return new ArrayList<>(new HashSet<>(matches));
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
