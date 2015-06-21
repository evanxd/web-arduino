/* global Arduino */
'use strict';

(function(window, document) {
  function WebArduino() {}

  WebArduino.prototype = Object.create(HTMLElement.prototype);

  WebArduino.prototype._arduino = null;

  [2, 3, 4, 5, 6, 7].forEach(function(pin) {
    var pinName = 'd' + pin;
    Object.defineProperty(WebArduino.prototype, pinName, {
      set: function(value) {
        this._arduino[pinName] = value;
      },
      get: function() {
        return this._arduino[pinName];
      }
    });
  });

  WebArduino.prototype.subscribe = function(pins) {
    this._arduino.subscribe(pins);
  };

  WebArduino.prototype.createdCallback = function() {
    var arduino = this._arduino = new Arduino({
      name: this.getAttribute('device-name'),
      address: this.getAttribute('device-address') 
    });
    arduino.on('connected', () => {
      this.dispatchEvent(new CustomEvent('connected', {
        detail: {
          arduino: this
        }
      }));
    });
    arduino.on('digitalpinchanged', (pins) => {
      this.dispatchEvent(new CustomEvent('digitalpinchanged', {
        detail: {
          pins: pins
        }
      }));
    });
  };

  document.register('web-arduino', {
    prototype: WebArduino.prototype
  });
  // For testing.
  window.WebArduino = WebArduino;
}(window, document));
