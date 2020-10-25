# B&O BeoSound Essence

More documentation to come...

Raspbian libraries needed:
libusb-1.0-0 libusb-1.0-0-dev libudev-dev


Pair the remote:

```
sudo bluetoothctl --agent=NoInputNoOutput
power on
agent on
scan on
connect aa:bb:cc:dd:ee:ff
trust aa:bb:cc:dd:ee:ff
pair aa:bb:cc:dd:ee:ff
info aa:bb:cc:dd:ee:ff
```

```
dmesg get:

[5224125.359928] input: BeoSound Essence as /devices/virtual/misc/uhid/0005:0000:0000.0001/input/input0
[5224125.361346] hid-generic 0005:0000:0000.0001: input,hidraw0: BLUETOOTH HID v0.00 Keyboard [BeoSound Essence] on B8:27:EB:30:06:FB

````

```
cat /proc/bus/input/devices

I: Bus=0005 Vendor=119b Product=2102 Version=0001
N: Name="BeoSound Essence Keyboard"
P: Phys=B8:27:EB:AA:13:92
S: Sysfs=/devices/virtual/misc/uhid/0005:119B:2102.0002/input/input2
U: Uniq=aa:bb:cc:dd:ee:ff
H: Handlers=sysrq kbd event0
B: PROP=0
B: EV=100013
B: KEY=e080ffdf 1cfffff ffffffff fffffffe
B: MSC=10

I: Bus=0005 Vendor=119b Product=2102 Version=0001
N: Name="BeoSound Essence Consumer Control"
P: Phys=B8:27:EB:AA:13:92
S: Sysfs=/devices/virtual/misc/uhid/0005:119B:2102.0002/input/input3
U: Uniq=aa:bb:cc:dd:ee:ff
H: Handlers=kbd event1
B: PROP=0
B: EV=13
B: KEY=200000 0 0 0 3ff 10000 18000 11f8 40000800 1e0000 0 0 0
B: MSC=10
```
```

Verify node-hid can find the device, https://github.com/node-hid/node-hid#installation

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


Make sure users in the `input` group can read /dev/hidraw* (or use sudo): 

/etc/udev/rules.d/95-hidraw.rules

KERNEL=="hidraw*", GROUP="input", MODE="0660"

sudo udevadm trigger (or reboot)



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



Inspiration from node-powermate, for use in roon-powermate-extension
https://github.com/sandeepmistry/node-powermate
