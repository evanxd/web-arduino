# web-arduino
A Web Component to control an Arduino device.

# Example
Blink a LED lamp.
```html
<web-arduino id="arduino" device-name="ARDUINO">
  <pin index="13" mode="OUTPUT" value="HIGH"></pin>
</web-arduino>
<script>
  var arduino = document.querySelector('#arduino');
  arduino.on('connected', function() {
    setInterval(function() {
      arduino.pin13 = !arduino.pin13;
    }, 1000);
  });
</script>
```
