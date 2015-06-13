/* global BleFirmata, EventEmitter2 */
'use strict';

(function(exports) {
  function Arduino(options) {
    this._firmata = new BleFirmata(options);
    this._firmata.ble.on('connected', () => {
      this.emit('connected');
    });
  }

  Arduino.HIGH = 1;
  Arduino.LOW = 0;

  Arduino.prototype = Object.create(EventEmitter2.prototype);

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

  exports.Arduino = Arduino;
}(window));
