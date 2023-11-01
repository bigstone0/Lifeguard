import paho.mqtt.client as mqtt
import argparse

parser = argparse.ArgumentParser(description='Send a message to the server.')
parser.add_argument('message', type=str, help='The message to send')
args = parser.parse_args()

message = args.message  # 명령줄에서 받은 메시지

mqttc = mqtt.Client("python_pub") # puclisher 이름
mqttc.connect("0.0.0.0", 1883) # 컴퓨터 IP
mqttc.publish("mqtt/test", message) # topic, message

# 인자
# low           (주의보 동영상)
# middle        (경보 동영상)
# high          (심각 동영상)
# safety        (안전 동영상)
# advertise     (홍보 동영상)
# open          (지진해일 종료 음성)

# ex) python3 pub_arg safety
