import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculatorTest {

    private Calculator calculator;

    @BeforeEach
    public void setUp() {
        calculator = new Calculator();
        System.out.println("Setup completed.");
    }

    @AfterEach
    public void tearDown() {
        calculator = null;
        System.out.println("Teardown completed.");
    }

    @Test
    public void testAdd_PositiveNumbers() {
        int result = calculator.add(10, 20);
        System.out.println("Positive add test executing");
        assertEquals(30, result);
    }

    @Test
    public void testAdd_NegativeNumbers() {
        int result = calculator.add(-5, -15);
        System.out.println("Negative add test executing");
        assertEquals(-20, result);
    }
}
