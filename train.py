import tensorflow as tf
from keras._tf_keras.keras.preprocessing.image import ImageDataGenerator
from keras._tf_keras.keras.models import Model
from keras._tf_keras.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from keras._tf_keras.keras.optimizers import Adam
from keras._tf_keras.keras.applications import MobileNetV2
import json
import os

# ✅ Dataset Paths
train_dir = r"Dataset 4/Train"
val_dir = r"Dataset 4/Val"

# ✅ Parameters
img_size = (224, 224)
batch_size = 32

# ✅ Data Generators
train_datagen = ImageDataGenerator(rescale=1.0/255)
val_datagen = ImageDataGenerator(rescale=1.0/255)

train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical'
)

val_generator = val_datagen.flow_from_directory(
    val_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical'
)

# ✅ Save class_indices mapping
with open("class_indices.json", "w") as f:
    json.dump(train_generator.class_indices, f)

# ✅ Build Model using MobileNetV2
base_model = MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights='imagenet')
base_model.trainable = False  # freeze the base layers

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(256, activation='relu')(x)
x = Dropout(0.5)(x)
predictions = Dense(train_generator.num_classes, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

# ✅ Compile Model
model.compile(
    optimizer=Adam(learning_rate=0.0001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# ✅ Train Model
history = model.fit(
    train_generator,
    epochs=10,          # you can increase this
    validation_data=val_generator
)

# ✅ Save Model
model.save("skin_disease_model_v2.h5")
print("✅ Model saved successfully!")
