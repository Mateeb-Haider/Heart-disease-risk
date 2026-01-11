import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import pickle

# Load dataset
data = pd.read_csv("heart.csv")

# Encode binary columns
data['Sex'] = data['Sex'].map({'M': 1, 'F': 0})
data['ExerciseAngina'] = data['ExerciseAngina'].map({'Y': 1, 'N': 0})

# One-hot encoding
data = pd.get_dummies(
    data,
    columns=['ChestPainType', 'RestingECG', 'ST_Slope'],
    drop_first=True
)

# Split features & target
X = data.drop("HeartDisease", axis=1)
y = data["HeartDisease"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("✅ Model Accuracy:", round(accuracy * 100, 2), "%")
print("\n📋 Classification Report:\n", classification_report(y_test, y_pred))

# ✅ Save model
pickle.dump(model, open("heart_model.pkl", "wb"))

# ✅ SAVE FEATURE COLUMNS (VERY IMPORTANT)
pickle.dump(X.columns, open("model_columns.pkl", "wb"))

print("\n✅ Model & columns saved successfully")
