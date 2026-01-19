# train_report.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from xgboost import XGBClassifier
from imblearn.over_sampling import SMOTE
import pickle

# ✅ Load dataset
data = pd.read_csv("heart.csv")

# ✅ Encode binary columns
data['Sex'] = data['Sex'].map({'M': 1, 'F': 0})
data['ExerciseAngina'] = data['ExerciseAngina'].map({'Y': 1, 'N': 0})

# ✅ One-hot encoding for categorical variables
data = pd.get_dummies(
    data,
    columns=['ChestPainType', 'RestingECG', 'ST_Slope'],
    drop_first=True
)

# ✅ Split features & target
X = data.drop("HeartDisease", axis=1)
y = data["HeartDisease"]

# ✅ Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# ✅ Handle class imbalance with SMOTE
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

# ✅ Train XGBoost model
model = XGBClassifier(
    n_estimators=50,
    max_depth=5,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    use_label_encoder=False,
    eval_metric='logloss',
    random_state=42
)

model.fit(X_train_res, y_train_res)

# ✅ Evaluate model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("✅ Model Accuracy:", round(accuracy * 100, 2), "%")
print("\n📋 Classification Report:\n", classification_report(y_test, y_pred))
print("\n📊 Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

# ✅ Save model
pickle.dump(model, open("heart_model_report.pkl", "wb"))

# ✅ Save feature columns (VERY IMPORTANT for Streamlit input)
pickle.dump(X.columns, open("model_columns_report.pkl", "wb"))

print("\n✅ Model & feature columns saved successfully")
