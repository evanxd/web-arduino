'use strict';

(function(doc) {
  function WebArduino() {}

  WebArduino.prototype = Object.create(HTMLElement.prototype);

  WebArduino.prototype.createdCallback = function() {
    console.log('The web-arduino tag is created.');
  };

  doc.register('web-arduino', {
    prototype: WebArduino.prototype
  });
}(document));
