import java.util.ArrayList;

public class ProjectUtils {
  public static String findClosestMatch(String input, ArrayList<Student> students) {
    String bestMatch = null;
    int minDistance = Integer.MAX_VALUE;

    for (Student student : students) {
        int distance = levenshteinDistance(input.toLowerCase(), student.name.toLowerCase());
        if (distance < minDistance) {
            minDistance = distance;
            bestMatch = student.name;
        }
    }

    return (minDistance <= 2) ? bestMatch : null; // Allow small mistakes
}

  // Levenshtein Distance Algorithm (Counts differences between words)
public static int levenshteinDistance(String a, String b) {
    int[][] dp = new int[a.length() + 1][b.length() + 1];

    for (int i = 0; i <= a.length(); i++) {
        for (int j = 0; j <= b.length(); j++) {
            if (i == 0) {
                dp[i][j] = j;
            } else if (j == 0) {
                dp[i][j] = i;
            } else {
                dp[i][j] = Math.min(Math.min(
                        dp[i - 1][j] + 1, 
                        dp[i][j - 1] + 1),
                        dp[i - 1][j - 1] + (a.charAt(i - 1) == b.charAt(j - 1) ? 0 : 1)
                );
            }
        }
    }

    return dp[a.length()][b.length()];
}
}
