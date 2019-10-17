from flask import Flask, request, jsonify
import RPi.GPIO as GPIO

app = Flask(__name__)
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(18, GPIO.OUT)


# {{url}}/led?status=on
@app.route('/', methods=['GET'])
def led():
    status = request.args.get('status')

    if status == "on":
        GPIO.output(18, GPIO.HIGH)
        with open("/var/www/html/kitchenLights/led/status.txt", "w") as f:
            f.write("1")
        return jsonify({"message": "Led successfully turned on"})
    elif status == "off":
        GPIO.output(18, GPIO.LOW)
        with open("/var/www/html/kitchenLights/led/status.txt", "w") as f:
            f.write("0")
        return jsonify({"message": "Led successfully turned off"})
    else:
        return jsonify({"message": "Not a valid status"})


@app.route('/toggle', methods=['GET'])
def toggle():
    # status = request.args.get('status')
    status = "0"
    with open("/var/www/html/kitchenLights/led/status.txt", "r") as f:
        status = f.read()
        if status == "1":
            GPIO.output(18, GPIO.LOW)
            with open("/var/www/html/kitchenLights/led/status.txt", "w") as f:
                f.write("0")
                status = "0"
            return jsonify({"message": "Led successfully turned off", "status": status})
        else:
            GPIO.output(18, GPIO.HIGH)
            with open("/var/www/html/kitchenLights/led/status.txt", "w") as f:
                f.write("1")
                status = "1"
            # f.write("1")
            return jsonify({"message": "Led successfully turned on", "status": status})
