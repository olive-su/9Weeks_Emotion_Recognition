# import cv2

# class Video(object):
#     def __init__(self):
#         self.video=cv2.VideoCapture(0)
#     def __del__(self):
#         self.video.release()
#     def get_frame(self):
#         ret, frame=self.video.read()
#         ret, jpg=cv2.imencode('.jpg',frame)
#         return jpg.tobytes()

import os
import cv2
import numpy as np
from tensorflow.keras.models import model_from_json
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import load_model

num_classes=7
img_rows,img_cols=48,48
batch_size=32
#load model
model = model_from_json(open("fer.json", "r").read())
#load weights
#model.load_weights('fer.h5')
model = load_model('mini_xception_1')

face_haar_cascade = cv2.CascadeClassifier(cv2.data.haarcascades +'haarcascade_frontalface_default.xml')

# accuracy evaluation test

# validation_data_dir='D:/새 폴더/test'
# test_datagen = ImageDataGenerator(rescale=1./255.)

# test_generator = test_datagen.flow_from_directory(
#     validation_data_dir,
#     target_size=(img_rows,img_cols),
#     batch_size=batch_size,
#     color_mode='grayscale',
#     class_mode='categorical'
# )
#loss, accuracy = model.evaluate(test_generator)
#print(loss,accuracy)

class Video(object):
    def __init__(self):
        self.video=cv2.VideoCapture(0)
    def __del__(self):
        self.video.release()
    def get_frame(self):
        ret, frame=self.video.read()
        gray_img= cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces_detected = face_haar_cascade.detectMultiScale(gray_img, 1.32, 5)
        f = open('./emotion_log.txt', 'at')

        for (x,y,w,h) in faces_detected:
            cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),thickness=7)
            roi_gray=gray_img[y:y+w,x:x+h]#cropping region of interest i.e. face area from  image
            roi_gray=cv2.resize(roi_gray,(48,48))
            img_pixels = image.img_to_array(roi_gray)
            img_pixels = np.expand_dims(img_pixels, axis = 0)
            img_pixels /= 255

            predictions = model.predict(img_pixels)
            f.write(str(predictions)+'\n')
            #find max indexed array
            max_index = np.argmax(predictions[0])

            emotions = ('Angry', 'Fear', 'Happy', 'Hurt', 'Neutral', 'Sad', 'Surprise')
            predicted_emotion = emotions[max_index]

            cv2.putText(frame, predicted_emotion, (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)
        f.close()

        ret, jpg=cv2.imencode('.jpg',frame)
        return jpg.tobytes()