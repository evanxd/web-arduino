/* global Bluetooth */
'use strict';

(function(exports) {
  function BLEFirmata(name, address) {
    this.ble = Bluetooth.connect(name, address);
    this._digitalPins = [];
  }

  BLEFirmata.INPUT = 0;
  BLEFirmata.OUTPUT = 1;
  BLEFirmata.DIGITAL_WRITE = 0x90;
  BLEFirmata.PIN_MODE = 0xF4;

  BLEFirmata.prototype = {
    _digitalPins: null,

    digitalWrite: function(pin, value) {
      var data;
      var pinData;
      value = value ? 1 : 0;
      // XXX: For unknown performance issues, do not set pin mode.
      // this.pinMode(pin, BLEFirmata.OUTPUT);
      // Write digital data.
      data = BLEFirmata.DIGITAL_WRITE.toString(16);
      if (pin > 1 && pin < 7) {
        pinData = 0;
        this._digitalPins.forEach(function(value, pin) {
          if (pin < 7 && value) {
            pinData += 1 << pin;
          }
        });
        data += this._paddingLeft(pinData.toString(16), 2) + '00';
      } else if (pin === 7) {
        data += '00' + this._paddingLeft(value.toString(16), 2);
      } else {
        // Only support pin 2 to pin 7.
        return;
      }
      this.ble.send(data);
      this._digitalPins[pin] = value;
    },

    pinMode: function(pin, mode) {
      var data = BLEFirmata.PIN_MODE.toString(16) +
        this._paddingLeft(pin.toString(16), 2) +
        this._paddingLeft(mode.toString(16), 2);
      this.ble.send(data);
    },

    _paddingLeft: function(str, lenght) {
      if (str.length >= lenght) {
        return str;
      } else {
        return this._paddingLeft('0' + str, lenght);
      }
    }
  };

  exports.BLEFirmata = BLEFirmata;
}(window));
