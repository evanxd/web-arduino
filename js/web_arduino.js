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

  WebArduino.prototype.createdCallback = function() {
    this._arduino = new Arduino({
      name: this.getAttribute('device-name'),
      address: this.getAttribute('device-address') 
    });
    this._arduino.on('connected', function() {
      this.dispatchEvent(new CustomEvent('connected', {
        detail: {
          arduino: this
        }
      }));
    }.bind(this));
  };

  document.register('web-arduino', {
    prototype: WebArduino.prototype
  });
  // For testing.
  window.WebArduino = WebArduino;
}(window, document));
