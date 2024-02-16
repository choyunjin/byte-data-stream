# byte-data-stream
바이트 데이터를 읽고 쓸 수 있는 스트림

[API 문서](https://docs.choyunjin.kr/byte-data-stream/)\
[English README](./README_en.md)

## 사용법
**CommonJS의 `require()` 함수는 2.0.0 이상 버전부터 더 이상 지원되지 않습니다.**
```ts
import fs from 'fs';
import { ByteStream, ByteStreamSimulator } from 'byte-data-stream';

// ArrayBuffer, Uint8Array 혹은 nodejs Buffer
let buf = fs.readFileSync('......');
let stream = new ByteStream(buf);

stream.readInt8(); // 부호 있는 8비트 정수를 읽음
stream.readUint8(); // 부호 없는 8비트 정수를 읽음
stream.readBytes(8); // 8바이트 길이의 데이터를 읽음
stream.readInt16(); // 부호 있는 빅 엔디언 16비트 정수를 읽음
stream.readUint16(true); // 부호 없는 리틀 엔디언 16비트 정수를 읽음
stream.readVarUint(); // 부호 없는 빅 엔디언 가변 길이 정수를 읽음
// ...

let stream2 = new ByteStream();
stream2.writeInt8(96); // 부호 있는 8비트 정수 기록
stream2.writeUint8(192); // 부호 없는 8비트 정수 기록
stream2.writeBytes([19, 72, 11, 21, 19, 72, 11, 21]); // 8바이트 길이의 데이터 기록
stream2.writeInt16(1972); // 부호 있는 빅 엔디언 16비트 정수 기록
stream2.writeUint16(49861, true); // 부호 없는 리틀 엔디언 16비트 정수 기록
stream2.writeVarUint(92736296525); // 부호 없는 빅 엔디언 가변 길이 정수 기록
// ...

// 테스트용 클래스
// ArrayBuffer에 데이터를 기록하지 않고
// 길이만 증가시키기 때문에
// 길이를 미리 측정해서 기록하도록 할 수 있음
let simulator = new ByteStreamSimulator();

simulator.length;
```

## 전체 함수 목록
```ts
// 속성
stream.i; // 현재 위치
stream.buffer; // ArrayBuffer
stream.length; // stream.buffer의 길이
stream.isDataAvailable; // stream.i < stream.length

new ByteStream(length, littleEndian = false);
new ByteStream(buf, littleEndian = false);

// 데이터를 읽는 메서드
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

// 데이터를 기록하는 메서드
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