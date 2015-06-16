/* global Arduino */
'use strict';

(function(window, document) {
  function WebArduino() {}

  WebArduino.prototype = extend(Arduino.prototype, HTMLElement.prototype);

  WebArduino.prototype.createdCallback = function() {
    console.log('The web-arduino tag is created.');
  };

  function extend() {
    var object = {};
    for (var i = 0; i < arguments.length; i++) {
      var attribute;
      for (attribute in arguments[i]) {
        object[attribute] = arguments[i][attribute];
      }
    }
    return object;
  }

  document.register('web-arduino', {
    prototype: WebArduino.prototype
  });
}(window, document));
