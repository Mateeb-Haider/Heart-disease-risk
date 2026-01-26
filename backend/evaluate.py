import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Load dataset
data = pd.read_csv("heart.csv")

# Encode binary columns (SAME as training)
data['Sex'] = data['Sex'].map({'M': 1, 'F': 0})
data['ExerciseAngina'] = data['ExerciseAngina'].map({'Y': 1, 'N': 0})

# One-hot encoding (SAME as training)
data = pd.get_dummies(
    data,
    columns=['ChestPainType', 'RestingECG', 'ST_Slope'],
    drop_first=True
)

# Load saved feature columns
model_columns = pickle.load(open("model_columns.pkl", "rb"))

# Split features & target
X = data.drop("HeartDisease", axis=1)
y = data["HeartDisease"]

# Align columns (CRITICAL FIX)
X = X.reindex(columns=model_columns, fill_value=0)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Load trained model
model = pickle.load(open("heart_model.pkl", "rb"))

# Predictions
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print(" Model Accuracy:", round(accuracy * 100, 2), "%")

# Confusion Matrix
print("\n Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Classification Report
print("\n Classification Report:")
print(classification_report(y_test, y_pred))
