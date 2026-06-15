public class TestSingleton {

    public static void main(String[] args) {

        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();

        logger1.log("Application Started");
        logger2.log("User Logged In");

        if (logger1 == logger2) {
            System.out.println("Only one Logger instance exists.");
        }
    }
}