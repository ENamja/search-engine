from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import search
import os

load_dotenv()

# app instance
app = Flask(__name__)
CORS(app)

# Get the environment variables
app.config['DEBUG'] = os.environ.get('FLASK_DEBUG')

@app.route("/search", methods=["GET"])
def return_home():
    query = request.args.getlist("query")
    query_params = query[0].split(" ")
    length = int(request.args.getlist("length")[0])
    result = search.main(query_params, len(query_params))
    result_dict = dict()
    removed_links = 0
    for i in range(len(result)):
        if i - removed_links >= length:
            break
        url, title = result[i].split(" <%split%> ", 1)
        result_dict[i - removed_links] = [url, title]
    return jsonify({
        "result" : result_dict
    })

if __name__ == "__main__":
    app.run()