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
stream.read_int16_be(); // read signed big-endian 16-bit integer
stream.read_uint16_le(); // read unsigned little-endian 16-bit integer
stream.read_var_uint(); // read unsigned varint
// ...

stream.write_int8(96); // write signed byte
stream.write_uint8(192); // write unsigned byte
stream.write_int16_be(1972); // write signed big-endian 16-bit integer
stream.write_uint16_le(49861); // write unsigned little-endian 16-bit integer
stream.write_var_uint(92736296525); // write unsigned varint
// ...
```

## All methods
```js
// methods for reading data
stream.read_int8();
stream.read_uint8();
stream.read_int16_be();
stream.read_int16_le();
stream.read_uint16_be();
stream.read_uint16_le();
stream.read_int32_be();
stream.read_int32_le();
stream.read_uint32_be();
stream.read_uint32_le();
stream.read_big_int64_be();
stream.read_big_int64_le();
stream.read_big_uint64_be();
stream.read_big_uint64_le();
stream.read_float32_be();
stream.read_float32_le();
stream.read_float64_be();
stream.read_float64_le();
stream.read_var_uint(max_byte_length = Infinity);

// methods for writing data
stream.write_int8(val);
stream.write_uint8(val);
stream.write_int16_be(val);
stream.write_int16_le(val);
stream.write_uint16_be(val);
stream.write_uint16_le(val);
stream.write_int32_be(val);
stream.write_int32_le(val);
stream.write_uint32_be(val);
stream.write_uint32_le(val);
stream.write_big_int64_be(val);
stream.write_big_int64_le(val);
stream.write_big_uint64_be(val);
stream.write_big_uint64_le(val);
stream.write_float32_be(val);
stream.write_float32_le(val);
stream.write_float64_be(val);
stream.write_float64_le(val);
stream.write_var_uint(val);
```