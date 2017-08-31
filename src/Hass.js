import { Base64 } from 'js-base64';
import Utils from './Utils';
import LifeExperience from '#/experience.txt';

const gestures = LifeExperience.split('\n').filter(e => e);
const base64Symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const payloadDelimiter = '!';

export default class Hass {
  constructor(key = '搞个大新闻', payloadCallback = () => {}) {
    this._symbols = Utils.shuffle(gestures, key);
    this._payloadCallback = payloadCallback;
    this._buffer = '';
  }

  // The chunk you've got for me! Excited!
  handleChunk(chunk) {
    this._buffer += chunk.toString();
    this._processBuffer();
  }

  encodePayload(base64) {
    const encoded = base64.replace(
      /[A-Za-z0-9+/=]/g,
      chr => `${this._symbols[base64Symbols.indexOf(chr)]}.`,
    );
    return `${encoded}!`;
  }

  decodePayload(encoded) {
    let result = '';
    const arr = encoded.split('.');
    for (const symbol of arr) {
      if (symbol) {
        result += base64Symbols[this._symbols.indexOf(symbol)];
      }
    }
    return new Buffer(result, 'base64');
  }

  _processBuffer() {
    let demIndex = this._buffer.indexOf(payloadDelimiter);
    while (demIndex !== -1) {
      const encoded = this._buffer.substring(0, demIndex);
      const payload = this.decodePayload(encoded);
      this._payloadCallback(payload);
      this._buffer = this._buffer.substring(demIndex + 1);

      demIndex = this._buffer.indexOf(payloadDelimiter);
    }
  }
}
