# byte-data-stream
Readable & writable byte data stream

[API documentation(Korean)](https://docs.choyunjin.kr/byte-data-stream/)\
[한국어 README](./README.md)

## Usage
**CommonJS `require()` is not supported in version 2.0.0 or higher.**
```ts
import fs from 'fs';
import { ByteStream, ByteStreamSimulator } from 'byte-data-stream';

// any ArrayBuffer or Uint8Array or nodejs Buffer
let buf = fs.readFileSync('......');
let stream = new ByteStream(buf);

stream.readInt8(); // read signed byte
stream.readUint8(); // read unsigned byte
stream.readBytes(8); // read many bytes
stream.readInt16(); // read signed big-endian 16-bit integer
stream.readUint16(true); // read unsigned little-endian 16-bit integer
stream.readVarUint(); // read unsigned big-endian varint
// ...

let stream2 = new ByteStream();
stream2.writeInt8(96); // write signed byte
stream2.writeUint8(192); // write unsigned byte
stream2.writeBytes([19, 72, 11, 21, 19, 72, 11, 21]); // write many bytes
stream2.writeInt16(1972); // write signed big-endian 16-bit integer
stream2.writeUint16(49861, true); // write unsigned little-endian 16-bit integer
stream2.writeVarUint(92736296525); // write unsigned big-endian varint
// ...

// this is the class for test
// the usage is same,
// but it only increases the length
// without creating an ArrayBuffer to be written
let simulator = new ByteStreamSimulator();

simulator.length;
```

## All methods
```ts
// properties
stream.i; // position
stream.buffer; // ArrayBuffer
stream.length; // length of stream.buffer
stream.isDataAvailable; // stream.i < stream.length

new ByteStream(length, littleEndian = false);
new ByteStream(buf, littleEndian = false);

// methods for reading data
stream.readInt8();
stream.readUint8();
stream.readBytes(length);
stream.readBytesUntilEnd();
stream.readInt16(oppositeEndian = false);
stream.readUint16(oppositeEndian = false);
stream.readInt32(oppositeEndian = false);
stream.readUint32(oppositeEndian = false);
stream.readBigInt64(oppositeEndian = false);
stream.readBigUint64(oppositeEndian = false);
stream.readFloat32(oppositeEndian = false);
stream.readFloat64(oppositeEndian = false);
stream.readVarInt(oppositeEndian = false, maxByteLength = Infinity);
stream.readVarUint(oppositeEndian = false, maxByteLength = Infinity);

// methods for writing data
stream.writeInt8(val);
stream.writeUint8(val);
stream.writeBytes(bytes);
stream.writeInt16(val, oppositeEndian = false);
stream.writeUint16(val, oppositeEndian = false);
stream.writeInt32(val, oppositeEndian = false);
stream.writeUint32(val, oppositeEndian = false);
stream.writeBigInt64(val, oppositeEndian = false);
stream.writeBigUint64(val, oppositeEndian = false);
stream.writeFloat32(val, oppositeEndian = false);
stream.writeFloat64(val, oppositeEndian = false);
stream.writeVarInt(val, oppositeEndian = false);
stream.writeVarUint(val, oppositeEndian = false);
```