from flask import Flask, jsonify, request, send_from_directory
from e3dc import E3DC

app = Flask(__name__, static_folder='static')

# Replace these values with your actual data
TCP_IP = '192.168.192.168'          # IP address of the E3/DC system
USERNAME = 'werner.gugatschka@gmx.at'       # Your username
PASS = '8234Eichberg147'           # Your password
KEY = '8234Eichberg147'       # RSCP password (encryption key)
SERIALNUMBER = 'H20-812328016847'  # Serial number of the system
CONFIG = {}

@app.route('/local_data', methods=['GET'])
def get_local_data():
    e3dc_obj = E3DC(E3DC.CONNECT_LOCAL, username=USERNAME, password=PASS, ipAddress=TCP_IP, key=KEY, configuration=CONFIG)
    data = e3dc_obj.poll(keepAlive=True)
    e3dc_obj.disconnect()
    return jsonify(data)

@app.route('/web_data', methods=['GET'])
def get_web_data():
    e3dc_obj = E3DC(E3DC.CONNECT_WEB, username=USERNAME, password=PASS, serialNumber=SERIALNUMBER, isPasswordMd5=False, configuration=CONFIG)
    data = e3dc_obj.poll(keepAlive=True)
    e3dc_obj.disconnect()
    return jsonify(data)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)