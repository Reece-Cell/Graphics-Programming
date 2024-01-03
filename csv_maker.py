import csv
from datetime import datetime, timedelta
import random

def generate_random_date(start_date, end_date):
    return start_date + timedelta(days=random.randint(0, (end_date - start_date).days))

def generate_test_data(num_rows):
    client_ids = [f"Client_{i}" for i in range(1, num_rows + 1)]
    program_names = ["Program_A", "Program_B", "Program_C"]
    start_date = datetime(2022, 1, 1)
    end_date = datetime(2022, 12, 31)

    data = []
    for _ in range(num_rows):
        client_id = random.choice(client_ids)
        program_name = random.choice(program_names)
        entry_date = generate_random_date(start_date, end_date)
        exit_date = generate_random_date(entry_date, end_date)
        data.append([client_id, program_name, entry_date.strftime("%Y-%m-%d"), exit_date.strftime("%Y-%m-%d")])

    return data

def write_to_csv(data, filename):
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["Client_ID", "Program_Name", "Entry_Date", "Exit_Date"])
        writer.writerows(data)

if __name__ == "__main__":
    num_rows = 15  # Change this to generate more or fewer rows of test data
    test_data = generate_test_data(num_rows)
    output_file = "test_data.csv"
    write_to_csv(test_data, output_file)
    print(f"Test data written to {output_file}")
