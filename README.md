🎭 FER2013 Emotion Detection with SE-Attention, MobileNetV2, and Ensemble Learning
This project presents a robust facial emotion recognition system built on the FER2013 dataset. It leverages Squeeze-and-Excitation (SE) Attention, MobileNetV2, and Ensemble Learning to boost performance and generalization. The final ensemble model achieves ~69% validation accuracy and 68.42% test accuracy, making it suitable for real-world emotion-aware applications such as mood-based music players, mental health assistants, or adaptive storytelling platforms.

🚀 Key Features
📦 Data Preprocessing: Converts the original FER2013 CSV into structured image datasets for training, validation, and testing.

🧠 SE Attention Model: Implements a Squeeze-and-Excitation (SE) block on top of MobileNetV2 to recalibrate feature maps channel-wise.

📱 MobileNetV2 Baseline: A lightweight yet high-performance CNN architecture trained from scratch for emotion classification.

⚡ EfficientNetB0 Backbone: Trained and fine-tuned alongside SE-MobileNetV2 and MobileNetV2.

🤝 Ensemble Learning: Combines predictions from three models — SE-MobileNetV2, EfficientNetB0, and MobileNetV2 — for enhanced robustness and accuracy.

🎯 Fine-Tuning Strategy: Unfreezes top layers of all models to adapt pre-trained features for emotion classification.

📉 Training Curves: Includes training history visualizations for accuracy and loss monitoring.

🧪 Evaluation: Evaluates performance on the official FER2013 test set.

💾 Model Saving: Saves all trained models (.h5) for future inference or deployment.

📊 Dataset
Source: FER2013

Classes: Angry, Disgust, Fear, Happy, Neutral, Sad, Surprise

Image Size: 48x48 grayscale images, converted to RGB for compatibility with pre-trained CNNs

📁 Project Structure

├── fer2013.csv                   # Original dataset
├── fer2013_images/               # Auto-generated image folders (train/val/test)
├── mobilenet_model.h5            # Trained MobileNetV2 model
├── mobilenet_se_model.h5         # Trained SE-MobileNetV2 model
├── efficientnet_model.h5         # Trained EfficientNetB0 model
├── training_curves.png           # Accuracy and loss plots
├── Se Attention Fer2013.ipynb    # Training & evaluation notebook
└── README.md                     # Project documentation
📈 Results

Model	Validation Accuracy	Test Accuracy
MobileNetV2	~67.80%	66.45%
SE-MobileNetV2	~68.90%	67.90%
EfficientNetB0	~68.50%	67.30%
Ensemble Model	~69.00%	68.42%
🛠️ Dependencies
TensorFlow / Keras

NumPy, Pandas

Matplotlib

OpenCV (for image conversion)

scikit-learn

Install dependencies using:


pip install tensorflow opencv-python numpy pandas matplotlib scikit-learn
🧠 Future Work
✅ Add Test-Time Augmentation (TTA) for improved test predictions

🔄 Include additional ensemble models (e.g., ResNet50 with CBAM or SE blocks)

🌐 Deploy the model in a real-time web application

🗃️ Add ONNX model export support for cross-platform inference

📬 Contact
Built with ❤️ for research and development in human-centered AI systems.
Feel free to fork, open issues, or contribute to this project!
