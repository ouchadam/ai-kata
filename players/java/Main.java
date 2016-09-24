import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class Main {

    public static void main(String[] args) {
        List<String> board = Arrays.asList(args[0].split(","));

        List<String> available = new ArrayList<>();

        for (int i = 0; i < board.size(); i++) {
            if (board.get(i).equals("0")) {
                available.add(String.valueOf(i));
            }
        }

        System.out.println(getRandomFrom(available));
    }

    private static String getRandomFrom(List<String> available) {
        int random = new Random().nextInt(available.size());
        return available.get(random);
    }

}
