from flask import Flask, jsonify,request
from flask_cors import CORS
import spacymethod
import webscrapping

app = Flask(__name__)
CORS(app)

@app.route("/")
def GetAnswer():
    data = "hello"

    responce = jsonify(spacymethod.rank_sentences(data, 5))
    
    return responce

@app.route("/", methods=["POST"])
def process_text():
    try:
        req_data = request.get_json()
        input_text = req_data.get("data", "")  # Extract 'data' field
        word_limit=req_data.get("wordsize")
       
        if not input_text:
            return jsonify({"error": "No text provided"}), 400
        if "https" in input_text:
            input_text = webscrapping.GetCleanedSentences(input_text)
        # print(spacymethod.rank_sentences(input_text,20))
      
        response = jsonify({"summary": spacymethod.rank_sentences(input_text, int(word_limit)),"var":False})
       
        return response
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__=="__main__":
    app.run(debug=True)