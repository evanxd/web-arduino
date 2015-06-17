/* global Arduino */
'use strict';

(function(window, document) {
  function WebArduino() {}

  WebArduino.prototype = Object.create(HTMLElement.prototype);

  WebArduino.prototype.createdCallback = function() {
    console.log('The web-arduino tag is created.');
  };

  document.register('web-arduino', {
    prototype: WebArduino.prototype
  });
  // For testing.
  window.WebArduino = WebArduino;
}(window, document));
