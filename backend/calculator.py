import re

def add(numbers):
    if not numbers:
        return 0

    # Default delimiter allows comma or newline
    delimiter = ",|\n"

    # custom delimiter syntax
    if numbers.startswith("//"):
        delimiter_line, numbers = numbers.split("\n", 1)
        custom_delim = delimiter_line[2:]
        delimiter = re.escape(custom_delim) 

    # Split numbers 
    parts = re.split(delimiter, numbers)

    # Convert to integers
    nums = [int(num) for num in parts if num]

    # Check for negative numbers
    negatives = [str(num) for num in nums if num < 0]
    if negatives:
        raise ValueError("negative numbers not allowed " + ",".join(negatives))

    # Return the sum
    return sum(nums)
