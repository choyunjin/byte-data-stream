const fs = require('fs');
const { ByteStream } = require('./index');

let buf = Buffer.alloc(1);
let stream = new ByteStream(buf);

stream.write_int8(96);
stream.write_uint8(192);
stream.write_int16_be(1972);
stream.write_uint16_le(49861);
stream.write_var_uint_le(92736296525);

stream.i = 0;
let data = [];
data.push(stream.read_int8());
data.push(stream.read_uint8());
data.push(stream.read_int16_be());
data.push(stream.read_uint16_le());
data.push(stream.read_var_uint_le());
console.log(data);