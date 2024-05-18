from flask import Flask, request, jsonify
from PyPDF2 import PdfReader
import re
from flask_cors import CORS 
from transformers import AutoTokenizer, AutoModelForQuestionAnswering
import torch

app = Flask(__name__)
CORS(app)

# Global variable to store text value
text_storage = {}

model = AutoModelForQuestionAnswering.from_pretrained("valhalla/longformer-base-4096-finetuned-squadv1")
tokenizer = AutoTokenizer.from_pretrained("valhalla/longformer-base-4096-finetuned-squadv1")

def extract_text_from_pdf(pdf_file):
    text = ""
    pdf_reader = PdfReader(pdf_file)
    for page_num in range(len(pdf_reader.pages)):
        text += pdf_reader.pages[page_num].extract_text()
    return text

def clean_text(text):
    clean_text = re.sub(r'\n+', ' ', text)
    clean_text = re.sub(r'\s+', ' ', clean_text)
    clean_text = clean_text.strip()
    return clean_text

def qa(question, answer_text):
    inputs = tokenizer.encode_plus(question, answer_text, add_special_tokens=True, return_tensors="pt")
    input_ids = inputs["input_ids"].tolist()[0]

    outputs = model(**inputs)
    answer_start_scores = outputs.start_logits
    answer_end_scores = outputs.end_logits

    answer_start = torch.argmax(answer_start_scores)
    answer_end = torch.argmax(answer_end_scores) + 1

    answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(input_ids[answer_start:answer_end]))

    return answer


@app.route('/send-text', methods=['POST'])
def receive_text():
    data = request.get_json()
    text = data.get('cleanedText')  
    print("Received text:", text)
    
    global text_storage
    text_storage['text'] = text
    
    return jsonify({'message': 'Text received successfully', 'content': text})


@app.route('/get-text', methods=['GET'])
def get_text():
    # Retrieve the stored text value from the global storage
    global text_storage
    text = text_storage.get('text', '')
    
    return jsonify({'content': text})



@app.route('/extract_text',  methods=['POST'])
def extract_text():
    if 'pdf_file' in request.files:
        pdf_file = request.files['pdf_file']
        pdf_text = extract_text_from_pdf(pdf_file)
        cleaned_text = clean_text(pdf_text)
        
        global text_storage
        text_storage['text'] = cleaned_text
    
        return jsonify({'message': 'Text extracted successfully', 'content': cleaned_text})
    else:
        return jsonify({'error': 'PDF file or text content not provided'}), 400


@app.route('/question_answer', methods=['GET', 'POST'])
def question_answer():
    if 'extracted_text' in request.json:
        extracted_text = request.json['extracted_text']
    else:
        return jsonify({'error': 'Extracted text not provided'}), 400

    question = request.json['question']
    if extracted_text and question:
        answer = qa(question, extracted_text)
        return jsonify({'answer': answer})
    else:
        return jsonify({'error': 'Text or question missing'}), 400

if __name__ == '__main__':
    app.run(debug=True)