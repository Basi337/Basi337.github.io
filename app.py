from e3dc import E3DC

TCP_IP = '192.168.192.168'          # IP address of the E3/DC system
USERNAME = 'werner.gugatschka@gmx.at'       # Your username
PASS = '8234Eichberg147'           # Your password
KEY = '8234Eichberg147'       # RSCP password (encryption key)
SERIALNUMBER = 'H20-812328016847'  # Serial number of the system
CONFIG = {}

e3dc_obj = E3DC(E3DC.CONNECT_LOCAL, username=USERNAME, password=PASS, serialNumber = SERIALNUMBER, isPasswordMd5=False, configuration = CONFIG)
# connect to the portal and poll the status. This might raise an exception in case of failed login. This operation is performed with Ajax
print(e3dc_obj.poll(keepAlive=True))
print(e3dc_obj.get_pvi_data(keepAlive=True))
e3dc_obj.disconnect()