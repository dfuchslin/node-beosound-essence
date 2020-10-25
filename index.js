var HID = require('node-hid');

var util = require('util');
var events = require('events');

var VENDOR_ID = 4507;
var PRODUCT_ID = 8450;

function BeoSoundEssence() {
  HID.setDriverType('hidraw');
  var beosoundHIDdevices = HID.devices(VENDOR_ID, PRODUCT_ID);

  if (beosoundHIDdevices.length === 0) {
    throw new Error('No BeoSound Essence remote could be found');
  }
  index = 0;
  if (beosoundHIDdevices[index] === undefined) {
    throw new Error('No BeoSound Essence remote found at index ' + index);
  }

  var beosoundHIDdevice = beosoundHIDdevices[index];

  this._hidDevice = new HID.HID(beosoundHIDdevice.path);
  this._buttonState = 0;
  this._closed = false;

  this._parseRead();
}

util.inherits(BeoSoundEssence, events.EventEmitter);

BeoSoundEssence.prototype._parseRead = function (error, data) {
  if (this._closed) {
    return;
  } else if (error) {
    if (error.message == "could not read from HID device") {
      process.nextTick(function () {
        this.close();
      }.bind(this));
      this.emit('disconnected');
    } else {
      throw error;
    }
  } else if (data) {
    this.emit('data', data);
    if (data.length > 2) {
      const byte1 = data[1];
      if (byte1 === 0x40) {
        this.emit('volumeup');
      } else if (byte1 === 0x80) {
        this.emit('volumedown');
      } else if (byte1 === 0x00) {
        const byte2 = data[2];
        if (byte2 === 0x06) {
          this.emit('playpause');
        } else if (byte2 === 0x01) {
          this.emit('stop');
        } else if (byte2 === 0x0a) {
          this.emit('next');
        } else if (byte2 === 0x0b) {
          this.emit('previous');
        }
      }
    }
  }

  this._hidDevice.read(this._parseRead.bind(this));
};

BeoSoundEssence.prototype.close = function (callback) {
  this._closed = true;
  this._hidDevice.close();

  if (callback) {
    callback();
  }
};

BeoSoundEssence.prototype.isClosed = function () {
  return this._closed;
};

module.exports = BeoSoundEssence;