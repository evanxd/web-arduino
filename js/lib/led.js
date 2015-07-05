/* global Arduino */
'use strict';

(function(exports) {
  function Led(arduino, options) {
    this._arduino = arduino;
    this._options = options;
    this._pinName = 'd' + options.pin;
  }

  Led.prototype.isBlinking = false;
  Led.prototype._intervalID = 0;

  Led.prototype.toggle = function(onOrOff) {
    if (onOrOff != null) {
      this._arduino[this._pinName] = onOrOff;
    } else {
      this._arduino[this._pinName] = !this._arduino[this._pinName];
    }
  };

  Led.prototype.blink = function(interval) {
    this.isBlinking = true;
    this._intervalID = setInterval(function() {
      this.toggle();
    }.bind(this), interval);
  };

  Led.prototype.stop = function() {
    clearInterval(this._intervalID);
    this.isBlinking = false;
    this._intervalID = 0;
  };

  exports.Led = Led;
}(Arduino));
