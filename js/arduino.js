(function(exports) {
  var HIGH = 1;
  var LOW = 0;

  function Arduino(options) {
    this.options = options;
  }

  Arduino.HIGH = 1;
  Arduino.LOW = 0;

  Arduino.prototype = {
    d2: Arduino.LOW,
    d3: Arduino.LOW,
    d4: Arduino.LOW,
    d5: Arduino.LOW,
    d6: Arduino.LOW,
    d7: Arduino.LOW
  };

  exports.Arduino = Arduino;
}(window));
