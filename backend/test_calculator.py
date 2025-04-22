import unittest
from calculator import add

class TestStringCalculator(unittest.TestCase):

    def test_empty_string(self):
        self.assertEqual(add(""), 0)

    def test_single_number(self):
        self.assertEqual(add("4"), 4)

    def test_two_numbers(self):
        self.assertEqual(add("1,5"), 6)

    def test_multiple_numbers(self):
        self.assertEqual(add("1,2,3,4,5"), 15)

    def test_newlines(self):
        self.assertEqual(add("1\n2,3"), 6)

    def test_custom_delimiter(self):
        self.assertEqual(add("//;\n1;2"), 3)

    def test_negative_numbers(self):
        with self.assertRaises(ValueError) as context:
            add("1,-2,3,-4")
        self.assertEqual(str(context.exception), "negative numbers not allowed -2,-4")

if __name__ == '__main__':
    unittest.main()
