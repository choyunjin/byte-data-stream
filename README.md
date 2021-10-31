# byte-data-stream
Readable & writable byte data stream

## Usage
```js
const fs = require('fs');
const { ByteStream } = require('byte-data-stream');

let buf = fs.readFileSync('......'); // any ArrayBuffer or Uint8Array or nodejs Buffer
let stream = new ByteStream(buf);

stream.read_int8(); // read signed byte
stream.read_uint8(); // read unsigned byte
stream.read_int16(); // read signed big-endian 16-bit integer
stream.read_uint16(true); // read unsigned little-endian 16-bit integer
stream.read_var_uint(); // read unsigned little-endian varint
// ...

stream.write_int8(96); // write signed byte
stream.write_uint8(192); // write unsigned byte
stream.write_int16(1972); // write signed big-endian 16-bit integer
stream.write_uint16(49861,true); // write unsigned little-endian 16-bit integer
stream.write_var_uint(92736296525); // write unsigned little-endian varint
// ...
```

## All methods
```js
// properties
stream.i; // position

// methods for reading data
stream.read_int8();
stream.read_uint8();
stream.read_int16(little_endian);
stream.read_uint16(little_endian);
stream.read_int32(little_endian);
stream.read_uint32(little_endian);
stream.read_big_int64(little_endian);
stream.read_big_uint64(little_endian);
stream.read_float32(little_endian);
stream.read_float64(little_endian);
stream.read_var_int(big_endian,max_byte_length = Infinity);
stream.read_var_uint(big_endian,max_byte_length = Infinity);

// methods for writing data
stream.write_int8(val);
stream.write_uint8(val);
stream.write_int16(val,little_endian);
stream.write_uint16(val,little_endian);
stream.write_int32(val,little_endian);
stream.write_uint32(val,little_endian);
stream.write_big_int64(val,little_endian);
stream.write_big_uint64(val,little_endian);
stream.write_float32(val,little_endian);
stream.write_float64(val,little_endian);
stream.write_var_int(val,big_endian);
stream.write_var_uint(val,big_endian);
```