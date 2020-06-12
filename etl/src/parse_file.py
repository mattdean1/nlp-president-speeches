import re
from datetime import datetime

def parse_date_meta(string):
    pattern = r'"(.*)"'
    match = re.search(pattern, string).group(1)
    dt = datetime.strptime(match, "%B %d, %Y")
    return dt.date()

def parse_title_meta(string):
    pattern = r'"(.*)"'
    match = re.search(pattern, string).group(1)
    return match