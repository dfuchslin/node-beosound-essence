# B&O BeoSound Essence

Documentation to come...

$ hid-showdevices hidraw
driverType: hidraw
devices: [ { vendorId: 4507,
    productId: 8450,
    path: '/dev/hidraw0',
    serialNumber: 'aa:bb:cc:dd:ee:ff',
    manufacturer: '',
    product: 'BeoSound Essence',
    release: 0,
    interface: -1 } ]


clockwise:
<Buffer 02 40 00>
<Buffer 02 00 00>

counter-clockwise:
<Buffer 02 80 00>
<Buffer 02 00 00>

playpause:
keydown
<Buffer 02 00 06>
keyup
<Buffer 02 00 00>

stop:
keydown
<Buffer 02 00 01>
keyup
<Buffer 02 00 00>

previous:
keydown
<Buffer 02 00 0a>
keyup
<Buffer 02 00 00>

next:
keydown
<Buffer 02 00 0b>
keyup
<Buffer 02 00 00>



/etc/udev/rules.d/95-hidraw.rules

KERNEL=="hidraw*", GROUP="input", MODE="0660"

Inspiration from node-powermate, for use in roon-powermate-extension
https://github.com/sandeepmistry/node-powermate
