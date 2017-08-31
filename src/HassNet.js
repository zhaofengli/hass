// The network you got for me! Excited

import Hass from './Hass';
import Utils from './Utils';
import Logger from './Logger';
import net from 'net'; 

export default class HassNet {
  // naiveListener:
  //  true - Listens for naive clients and forwards to hass server
  // false - Listens for hass clients and forwards to naive server
  constructor(
    targetHost,
    targetPort,
    key = '见得风是得雨',
    naiveListener = false,
  ) {
    this._targetHost = targetHost;
    this._targetPort = targetPort;
    this._key = key;
    this._naiveListener = naiveListener;
  }

  handleConnection(socket) {
    const upstreamSocket = new net.Socket();
    let established = false;
    let buffer = '';

    function writeUpstream(data) {
      if (established) {
        upstreamSocket.write(data);
      } else {
        buffer += data;
      }
    }

    const hass = new Hass(this._key, (payload) => {
      if (this._naiveListener) {
        // Decoded for naive client. 你们还是要学习一个！
        socket.write(payload);
      } else {
        // Decoded for naive server. 不要见得风是得雨！
        writeUpstream(payload);
      }
    });

    socket.on('data', (chunk) => {
      if (this._naiveListener) {
        const encoded = hass.encodePayload(chunk.toString('base64'));
        writeUpstream(encoded);
      } else {
        hass.handleChunk(chunk);
      }
    });

    upstreamSocket.on('data', (chunk) => {
      if (this._naiveListener) {
        hass.handleChunk(chunk);
      } else {
        const encoded = hass.encodePayload(chunk.toString('base64'));
        socket.write(encoded);
      }
    });

    socket.on('close', () => {
      upstreamSocket.destroy();
    });

    upstreamSocket.on('close', () => {
      socket.destroy();
    });

    socket.on('error', () => {
      upstreamSocket.destroy();
    });

    upstreamSocket.on('error', () => {
      socket.destroy();
    });

    upstreamSocket.connect(this._targetPort, this._targetHost, () => {
      established = true;
      if (buffer) {
        upstreamSocket.write(buffer);
        buffer = '';
      }
    });
  }
}
