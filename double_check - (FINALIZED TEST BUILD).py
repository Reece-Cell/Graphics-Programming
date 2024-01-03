import pandas as pd
import os
from datetime import datetime
from tkinter import Tk, filedialog
import numpy as np

def find_overlaps(df):
    overlaps = []
    grouped = df.groupby('Client_ID')

    for _, group in grouped:
        programs = group['Program_Name'].unique()

        if len(programs) > 1:
            for i in range(len(group)):
                for j in range(i + 1, len(group)):
                    program_i = group.iloc[i]
                    program_j = group.iloc[j]

                    overlap_start = max(pd.to_datetime(program_i['Entry_Date']), pd.to_datetime(program_j['Entry_Date']))

                    # Check if both programs have end dates
                    if pd.notnull(program_i['Exit_Date']) and pd.notnull(program_j['Exit_Date']):
                        overlap_end = min(pd.to_datetime(program_i['Exit_Date']), pd.to_datetime(program_j['Exit_Date']))
                    elif pd.notnull(program_i['Exit_Date']):
                        overlap_end = pd.to_datetime(program_i['Exit_Date'])
                    elif pd.notnull(program_j['Exit_Date']):
                        overlap_end = pd.to_datetime(program_j['Exit_Date'])
                    else:
                        # Handle the case when one or both programs have no end date
                        overlap_end = "NO-END"

                    # Format the dates to exclude the time component
                    overlap_start_str = overlap_start.strftime('%m/%d/%Y')
                    overlap_end_str = overlap_end.strftime('%m/%d/%Y') if overlap_end != "NO-END" else "NO-END"

                    # Print information for every case
                    print(f"Overlap Check: Client_ID={program_i['Client_ID']}, Programs={programs}, Overlap_Start={overlap_start_str}, Overlap_End={overlap_end_str}")

                    # Check if the dates are exactly the same or there's an overlap
                    if overlap_end == "NO-END" or overlap_start < overlap_end:
                        print(f"Overlap Detected: Client_ID={program_i['Client_ID']}, Programs={programs}, Overlap_Start={overlap_start_str}, Overlap_End={overlap_end_str}")

                        overlap_info = {
                            'Client_ID': program_i['Client_ID'],
                            'Programs': ', '.join(programs),
                            'Overlap_Start': overlap_start_str,
                            'Overlap_End': overlap_end_str
                        }

                        overlaps.append(overlap_info)

    return pd.DataFrame(overlaps, columns=['Client_ID', 'Programs', 'Overlap_Start', 'Overlap_End'])



def select_file():
    root = Tk()
    root.withdraw()  # Hide the main window

    file_path = filedialog.askopenfilename(
        title="Select a CSV file",
        filetypes=[("CSV files", "*.csv"), ("All files", "*.*")]
    )

    root.destroy()

    return file_path

def main():
    try:
        # Allow the user to pick the CSV file
        csv_file = select_file()

        # Check if the file exists
        if not os.path.isfile(csv_file):
            raise FileNotFoundError(f"File not found: {csv_file}")

        # Read the CSV file into a pandas DataFrame
        df = pd.read_csv(csv_file, parse_dates=['Entry_Date', 'Exit_Date'], date_parser=lambda x: pd.to_datetime(x, errors='coerce', format='%m/%d/%Y'))

        # Find overlapping entries
        overlapping_df = find_overlaps(df)

        # Remove duplicate rows
        overlapping_df = overlapping_df.drop_duplicates()

        # Get the current date and time with hour and minute
        current_datetime = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

        # Save the result to a new CSV file with the current date and time
        output_file = f'overlapping_programs_formatted_{current_datetime}.csv'
        overlapping_df[['Client_ID', 'Programs', 'Overlap_Start', 'Overlap_End']].to_csv(output_file, index=False)

        print(f"Overlapping programs saved to '{output_file}'.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
