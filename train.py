


# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score, classification_report
# import pickle

# # Load dataset
# data = pd.read_csv("heart.csv")

# # Encode binary columns
# data['Sex'] = data['Sex'].map({'M': 1, 'F': 0})
# data['ExerciseAngina'] = data['ExerciseAngina'].map({'Y': 1, 'N': 0})

# # One-hot encoding
# data = pd.get_dummies(
#     data,
#     columns=['ChestPainType', 'RestingECG', 'ST_Slope'],
#     drop_first=True
# )

# # Split features & target
# X = data.drop("HeartDisease", axis=1)
# y = data["HeartDisease"]

# # Train-test split
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42
# )

# # Train model
# model = RandomForestClassifier(n_estimators=100, random_state=42)
# model.fit(X_train, y_train)

# # Evaluation
# y_pred = model.predict(X_test)
# accuracy = accuracy_score(y_test, y_pred)

# print("✅ Model Accuracy:", round(accuracy * 100, 2), "%")
# print("\n📋 Classification Report:\n", classification_report(y_test, y_pred))

# # ✅ Save model
# pickle.dump(model, open("heart_model.pkl", "wb"))

# # ✅ SAVE FEATURE COLUMNS (VERY IMPORTANT)
# pickle.dump(X.columns, open("model_columns.pkl", "wb"))

# print("\n✅ Model & columns saved successfully")





# 2nd attempt
''''
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from imblearn.over_sampling import SMOTE
import pickle

# -----------------------------
# Load dataset
# -----------------------------
data = pd.read_csv("heart.csv")

# -----------------------------
# Encode binary columns
# -----------------------------
data['Sex'] = data['Sex'].map({'M': 1, 'F': 0})
data['ExerciseAngina'] = data['ExerciseAngina'].map({'Y': 1, 'N': 0})

# -----------------------------
# One-hot encoding for categorical features
# -----------------------------
data = pd.get_dummies(
    data,
    columns=['ChestPainType', 'RestingECG', 'ST_Slope'],
    drop_first=True
)

# -----------------------------
# Split features & target
# -----------------------------
X = data.drop("HeartDisease", axis=1)
y = data["HeartDisease"]

# -----------------------------
# Train-test split
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -----------------------------
# Balance classes with SMOTE
# -----------------------------
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

# -----------------------------
# Random Forest with GridSearch for tuning
# -----------------------------
param_grid = {
    'n_estimators': [200, 300],
    'max_depth': [7, 10, None],
    'min_samples_split': [2, 5],
    'min_samples_leaf': [1, 2],
    'max_features': ['sqrt', 'log2']
}

rf = RandomForestClassifier(random_state=42)
grid_search = GridSearchCV(rf, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
grid_search.fit(X_train_res, y_train_res)

best_model = grid_search.best_estimator_
print("✅ Best Parameters:", grid_search.best_params_)

# -----------------------------
# Evaluate on Test Set
# -----------------------------
y_pred = best_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("✅ Test Accuracy:", round(accuracy * 100, 2), "%")
print("\n📋 Classification Report:\n", classification_report(y_test, y_pred))


# -----------------------------
# Save Model & Columns
# -----------------------------
pickle.dump(best_model, open("heart_model.pkl", "wb"))
pickle.dump(X.columns, open("model_columns.pkl", "wb"))

print("\n✅ Model & columns saved successfully")

'''''



# train.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
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
    n_estimators=500,
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

# ✅ Save model
pickle.dump(model, open("heart_model.pkl", "wb"))

# ✅ Save feature columns (VERY IMPORTANT for Streamlit input)
pickle.dump(X.columns, open("model_columns.pkl", "wb"))

print("\n✅ Model & feature columns saved successfully")
