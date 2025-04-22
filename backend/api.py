from flask import Flask, request, jsonify
from calculator import add

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    input_str = data.get('input', '')
    try:
        result = add(input_str)
        return jsonify({"result": result})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
