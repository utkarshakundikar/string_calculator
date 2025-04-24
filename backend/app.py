from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/add', methods=['POST'])
def add():
    data = request.get_json()
    input_string = data.get('input', '')

    # Handle empty input
    if input_string == '':
        return jsonify({'result': 0})

    import re
    import json

    # Custom delimiter support
    if input_string.startswith("//"):
        delimiter_line, numbers = input_string.split("\n", 1)
        delimiter = delimiter_line[2:]
        delimiters = [re.escape(delimiter)]
    else:
        numbers = input_string
        delimiters = [",", "\n"]

    split_pattern = "|".join(delimiters)
    parts = re.split(split_pattern, numbers)

    result = 0
    negatives = []

    for part in parts:
        part = part.strip()
        if not part:
            continue
        try:
            num = int(part)
        except ValueError:
            return jsonify({'error': 'Please check the input value. Only comma/newline-separated numbers are allowed.'}), 400

        if num < 0:
            negatives.append(num)
        result += num

    if negatives:
        return jsonify({'error': f"negative numbers not allowed: {','.join(map(str, negatives))}"}), 400

    return jsonify({'result': result})
