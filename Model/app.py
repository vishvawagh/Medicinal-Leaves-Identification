from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
# import os
import io
import json
app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*"}})

# Load your trained model
model = tf.keras.models.load_model('/home/vishva/Desktop/Model/my_model.h5')

# Load your plant data
with open('leavesinfo.json') as f:
    plant_data = json.load(f)

def preprocess_image(image):
    image = Image.open(io.BytesIO(image))
    image = image.resize((224, 224))  # Adjust size according to your model's input
    image = np.array(image)
    image = image / 255.0  # Normalize if your model requires it
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    try:
        image = file.read()
        processed_image = preprocess_image(image)
        prediction = model.predict(processed_image)
        
        # Assuming your model returns class indices
        class_index = np.argmax(prediction[0])
        
        if class_index < len(plant_data):
            plant_info = plant_data[class_index]
            return jsonify(plant_info)
        else:
            return jsonify({'error': 'Plant information not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
  app.run(debug=True)
