# import os
# import cv2
# import numpy as np
# from tensorflow.keras.models import model_from_json
# from tensorflow.keras.preprocessing import image

# #load model
# model = model_from_json(open("fer.json", "r").read())
# #load weights
# model.load_weights('fer.h5')


# # face_haar_cascade = cv2.CascadeClassifier(cv2.data.haarcascades +'haarcascade_frontalface_default.xml')
# # validation_data_dir='D:/새 폴더/test'
# # test_generator = test_datagen.flow_from_directory(
# #     validation_data_dir,
# #     target_size=(img_rows,img_cols),
# #     batch_size=batch_size,
# #     color_mode='grayscale',
# #     class_mode='categorical'
# # )

# # loss, accuracy = model.evaluate(test_generator)
# # f = open('./emotion_log.txt', 'w')
# cap=cv2.VideoCapture(0)

# # 파일 초기화
# f = open('./emotion_log.txt', 'w')
# f.write('')
# f.close()

# while True:
#     ret,test_img=cap.read()# captures frame and returns boolean value and captured image
#     if not ret:
#         continue
#     gray_img= cv2.cvtColor(test_img, cv2.COLOR_BGR2GRAY)

#     faces_detected = face_haar_cascade.detectMultiScale(gray_img, 1.32, 5)


#     for (x,y,w,h) in faces_detected:
#         cv2.rectangle(test_img,(x,y),(x+w,y+h),(255,0,0),thickness=7)
#         roi_gray=gray_img[y:y+w,x:x+h]#cropping region of interest i.e. face area from  image
#         roi_gray=cv2.resize(roi_gray,(48,48))
#         img_pixels = image.img_to_array(roi_gray)
#         img_pixels = np.expand_dims(img_pixels, axis = 0)
#         img_pixels /= 255

#         predictions = model.predict(img_pixels)
#          f = open('./emotion_log.txt', 'a')
#          f.write(predictions)
#           f.close()
#          np.savetxt('emotion_log.txt', predictions, fmt='%.6e', delimiter=' ',newline=' ')
#         find max indexed array
#         max_index = np.argmax(predictions[0])

#         emotions = ('angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral')
#         predicted_emotion = emotions[max_index]

#         cv2.putText(test_img, predicted_emotion, (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)

#     resized_img = cv2.resize(test_img, (1000, 700))
#     cv2.imshow('Facial emotion analysis ',resized_img)



#     if cv2.waitKey(10) == ord('q'):#wait until 'q' key is pressed
#         break

# cap.release()
# cv2.destroyAllWindows