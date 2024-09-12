from flask import Flask, request
from flask_socketio import SocketIO, join_room, emit
from flask_cors import CORS
import cv2
import mediapipe as mp
import pickle
import base64
import numpy as np
import time  # Import time to measure processing time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def test_connect():
    print('Client connected')

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

@socketio.on('join_room')
def on_join(data):
    room = data['room']
    join_room(room)
    emit('message', f"A user has joined {room}", room=room)

model_dict = pickle.load(open('./model.p', 'rb'))
model = model_dict['model']

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, min_detection_confidence=0.5, max_num_hands=2)
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

labels_dict = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L',
               12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U', 21: 'V', 22: 'W',
               23: 'X', 24: 'Y', 25: 'Z'}

def process_frame(frame_rgb):
    try:
        H, W, _ = frame_rgb.shape
        data_aux = []
        x_ = []
        y_ = []

        results = hands.process(frame_rgb)
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(
                    frame_rgb,
                    hand_landmarks,
                    mp_hands.HAND_CONNECTIONS,
                    mp_drawing_styles.get_default_hand_landmarks_style(),
                    mp_drawing_styles.get_default_hand_connections_style())

                x_ = [landmark.x for landmark in hand_landmarks.landmark]
                y_ = [landmark.y for landmark in hand_landmarks.landmark]

                normalized_landmarks = [((x - min(x_)) / (max(x_) - min(x_)), (y - min(y_)) / (max(y_) - min(y_))) for x, y in zip(x_, y_)]
                data_aux.extend(normalized_landmarks)

                x1, y1 = int(min(x_) * W) - 10, int(min(y_) * H) - 10
                x2, y2 = int(max(x_) * W) + 10, int(max(y_) * H) + 10

                prediction = model.predict([np.asarray(data_aux).flatten()])
                predicted_character = labels_dict[int(prediction[0])]

                cv2.rectangle(frame_rgb, (x1, y1), (x2, y2), (0, 255, 0), 4)
                cv2.putText(frame_rgb, predicted_character, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 255, 0), 3, cv2.LINE_AA)

        ret, jpeg = cv2.imencode('.jpg', frame_rgb)
        return base64.b64encode(jpeg).decode('utf-8')
    except Exception as e:
        print(f"Error processing frame: {e}")
        return None

def data_to_image(data_uri):
    encoded_data = data_uri.split(',')[1]
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

@socketio.on('frame')
def handle_frame(data):
    image = data_to_image(data)
    processed_image = process_frame(image)
    if processed_image:
        emit('processed_frame', processed_image, room=request.sid)

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')
