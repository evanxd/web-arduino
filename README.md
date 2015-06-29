# <web-arduino>
A Web Component to control an Arduino device.

## Examples
Blink a LED.

![Blink LED](./images/blink-led.png)

```html
<web-arduino id="arduino" device-name="ARDUINO"></web-arduino>
<script>
  var arduino = document.querySelector('#arduino');
  arduino.onconnected = function() {
    arduino.d7 = Arduino.HIGH;
    setInterval(function() {
      arduino.d7 = !arduino.d7;
    }, 1000);
  });
</script>
```
