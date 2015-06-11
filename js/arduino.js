/* global BleFirmata */
'use strict';

(function(exports) {
  function Arduino(options) {
    this.firmata = new BleFirmata(options);
  }

  Arduino.HIGH = 1;
  Arduino.LOW = 0;

  Arduino.prototype = {
    set d2(value) {
      this._d2 = value;
      this.firmata.digitalWrite(2, value);
    },
    get d2() {
      return this._d2;
    },
    set d3(value) {
      this._d3 = value;
      this.firmata.digitalWrite(3, value);
    },
    get d3() {
      return this._d3;
    },
    set d4(value) {
      this._d4 = value;
      this.firmata.digitalWrite(4, value);
    },
    get d4() {
      return this._d4;
    },
    set d5(value) {
      this._d5 = value;
      this.firmata.digitalWrite(5, value);
    },
    get d5() {
      return this._d5;
    },
    set d6(value) {
      this._d6 = value;
      this.firmata.digitalWrite(6, value);
    },
    get d6() {
      return this._d6;
    },
    set d7(value) {
      this._d7 = value;
      this.firmata.digitalWrite(7, value);
    },
    get d7() {
      return this._d7;
    }
  };

  exports.Arduino = Arduino;
}(window));
