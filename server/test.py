import sys

# Function to add two numbers
def add_numbers(num1, num2):
    return num1 + num2

# Ensure there are exactly three arguments (script name + two numbers)
if len(sys.argv) != 4:
    print("Usage: python script.py <num1> <num2>")
    sys.exit(1)

# Convert arguments to integers
number1 = int(sys.argv[1])
number2 = int(sys.argv[2])

# Call the function and display the result as an integer
result = add_numbers(number1, number2)
print(result)
