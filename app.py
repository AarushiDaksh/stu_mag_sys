import pickle
from sklearn.linear_model import LinearRegression
import pandas as pd

# Sample data (marks in different subjects)
data = {
    'math': [95, 85, 75, 90, 65],
    'english': [80, 70, 85, 90, 60],
    'science': [90, 80, 80, 95, 70],
    'final_grade': [90, 80, 80, 88, 65]
}

# Convert to DataFrame
df = pd.DataFrame(data)

# Features (input data)
X = df[['math', 'english', 'science']]

# Target variable (what we're predicting)
y = df['final_grade']

# Initialize and train the model
model = LinearRegression()
model.fit(X, y)

# Save the model to a file
with open('student_grade_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

print("Model training complete and saved.")
from flask import Flask, request, jsonify
import pickle

# Load the trained model
with open('student_grade_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Receive data from frontend
    
    # Extract features from the received data
    math_marks = data['math']
    english_marks = data['english']
    science_marks = data['science']
    
    # Prepare the input data for the model (as a list of lists)
    input_data = [[math_marks, english_marks, science_marks]]
    
    # Get prediction from the model
    predicted_grade = model.predict(input_data)[0]
    
    # Return the predicted grade as JSON response
    return jsonify({'predicted_grade': predicted_grade})

if __name__ == '__main__':
    app.run(debug=True)
