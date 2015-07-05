/* global BLEFirmata, EventEmitter2 */
'use strict';

(function(exports) {
  function Arduino(options) {
    this._firmata = new BLEFirmata(options.name, options.address);
    var ble = this._firmata.ble;
    ble.on('connect', () => {
      this.emit('connect');
    });
    ble.on('data', (data) => {
      data = this._toPinData(data);
      for (var pin in data) {
        this[pin] = data[pin];
      }
      this.emit('digitalpinchange', data);
    });
  }

  Arduino.HIGH = 1;
  Arduino.LOW = 0;

  Arduino.prototype = Object.create(EventEmitter2.prototype);

  Arduino.prototype._firmata = null;

  [2, 3, 4, 5, 6, 7].forEach(function(pin) {
    var pinName = 'd' + pin;
    Object.defineProperty(Arduino.prototype, pinName, {
      set: function(value) {
        this['_' + pinName] = value;
        this._firmata.digitalWrite(pin, value);
      },
      get: function() {
        return this['_' + pinName];
      }
    });
  });

  // TODO: Support to call multiple times.
  Arduino.prototype.subscribe = function(pins) {
    if (!Array.isArray(pins)) {
      pins = [pins];
    }
    var firmata = this._firmata;
    pins.forEach((pin) => {
      firmata.pinMode(pin, BLEFirmata.INPUT);
    });
    firmata.ble.startNotifications();
  };

  Arduino.prototype._toPinData = function(data) {
    var pins = {};
    data = new Uint8Array(data);
    var type = data[0];
    if (type === BLEFirmata.DIGITAL_WRITE) {
      var pin2toPin6 = data[1].toString(2);
      var pin7 = data[2].toString(2);
      // Set pin 2 to pin 6.
      for (var i = 0; i < pin2toPin6.length; i++) {
        var index = 6 - i;
        if (pin2toPin6.charAt(i) === '1') {
          pins['d' + index] = Arduino.HIGH;
        } else {
          pins['d' + index] = Arduino.LOW;
        }
      }
      // Set pin 7.
      if (pin7 === '1') {
        pins.d7 = Arduino.HIGH;
      } else {
        pins.d7 = Arduino.LOW;
      }
    }
    return pins;
  };

  exports.Arduino = Arduino;
}(window));
