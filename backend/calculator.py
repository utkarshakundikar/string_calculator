import re

def add(numbers):
    if not numbers:
        return 0

    delimiter = ",|\n"
    if numbers.startswith("//"):
        delimiter_line, numbers = numbers.split("\n", 1)
        delimiter = re.escape(delimiter_line[2:])

    parts = re.split(delimiter, numbers)
    nums = [int(num) for num in parts if num]
    negatives = [str(num) for num in nums if num < 0]

    if negatives:
        raise ValueError("negative numbers not allowed " + ",".join(negatives))

    return sum(nums)
