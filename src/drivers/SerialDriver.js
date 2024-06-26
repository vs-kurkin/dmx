import { SerialPort } from 'serialport'
import { AbstractDriver, EVENT_STOP } from './index.js'

export const BAUD_RATE = 250000
export const DATA_BITS = 8
export const STOP_BITS = 2

export const EVENT_CLOSE = 'close'

export class SerialDriver extends AbstractDriver {
  constructor(options = {}) {
    super(options)

    this.ready = true

    this.on(EVENT_STOP, this.stop)

    this.serial = new SerialPort({
      path: options.path,
      baudRate: options.baudRate || BAUD_RATE,
      dataBits: options.dataBits || DATA_BITS,
      stopBits: options.stopBits || STOP_BITS,
      parity: 'none',
    }, this.init.bind(this))
  }

  stop() {
    this.serial.close((error) => {
      this.emit(EVENT_CLOSE, error)
    })
  }
}
