/* global BluetoothHelper */
'use strict';

(function(exports) {
  function BLEFirmata(options) {
    this.ble = new BluetoothHelper(options);
  }

  BLEFirmata.DIGITAL_WRITE = 0x90;
  BLEFirmata.PIN_MODE = 0xF4;

  BLEFirmata.prototype = {
    digitalWrite: function(pin, value) {
      var data;
      var ble = this.ble;
      // Set pin mode.
      data = BLEFirmata.PIN_MODE.toString(16) +
             ble.paddingLeft(pin.toString(16), 2) + '01';
      ble.sendData(data);
      // Write digital data
      data = BLEFirmata.DIGITAL_WRITE.toString(16);
      if (pin > 1 && pin < 7) {
        data += ble.paddingLeft((1 << pin).toString(16), 2) + '00';
      } else if (pin === 7) {
        data += '00' + ble.paddingLeft(value.toString(16), 2);
      } else {
        // Only support pin 2 to pin 7.
        return;
      }
      ble.sendData(data);
    }
  };

  exports.BLEFirmata = BLEFirmata;
}(window));
