from flask import Flask, request, jsonify, render_template
from keras._tf_keras.keras.models import load_model
import numpy as np
import cv2
import os
import json

# ✅ Initialize Flask App
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads')

# ✅ Load the Saved Model
model = load_model('skin_disease_model_v2.h5')

# ✅ Load Class Indices
with open('class_indices.json') as f:
    class_indices = json.load(f)
labels = {v: k for k, v in class_indices.items()}

# ✅ Preprocessing Function (matches model training)
def preprocess_image(image_path):
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError(f"Cannot find image at path: {image_path}")
    image = cv2.resize(image, (224, 224))
    image = image / 255.0  # Normalize to [0,1]
    image = np.expand_dims(image, axis=0)
    return image

# ✅ Home Route
@app.route('/')
def index():
    return render_template('index.html')  # assumes you have an index.html ready

# ✅ Upload Image Route
@app.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)

    return jsonify({'message': 'Image uploaded successfully', 'filename': file.filename})

# ✅ Prediction Route
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)

    processed_image = preprocess_image(filepath)
    predictions = model.predict(processed_image)
    predicted_class = int(np.argmax(predictions))
    predicted_label = labels[predicted_class]
    confidence_score = float(np.max(predictions))
    
    if confidence_score < 0.5:
        predicted_label = "Normal"
    else:
        predicted_label = labels[predicted_class]

    return jsonify({'label': predicted_label, 'confidence': confidence_score})


# ✅ Main Driver
if __name__ == '__main__':
    app.run(debug=True)
