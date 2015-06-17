/* global Arduino */
'use strict';

(function(window, document) {
  function WebArduino() {}

  WebArduino.prototype = Object.create(HTMLElement.prototype);

  WebArduino.prototype.createdCallback = function() {
    var arduino = new Arduino({ address: this.getAttribute('device-address') });
    arduino.on('connected', function() {
      this.dispatchEvent(new CustomEvent('connected', {
        detail: {
          arduino: arduino
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
