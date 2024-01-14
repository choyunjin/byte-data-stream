const varint = require('signed-varint');
const varuint = require('varint');

/**
 * 개 노가다임
 */
module.exports = class ByteStream {
    constructor(buf, littleEndian = false) {
        this.buf = buf ? this.ensureArrayBuffer(buf) : new ArrayBuffer();
        this.i = 0;
        this.view = new DataView(this.buf);
        this.u8 = new Uint8Array(this.buf);
        this.littleEndian = littleEndian;
    }

    get buffer() {
        return this.buf;
    }

    get length() {
        return this.buf.byteLength;
    }

    get isDataAvailable() {
        return this.i < this.buf.byteLength;
    }

    readInt8() {
        return this.view.getInt8(this.i++);
    }

    readUint8() {
        return this.view.getUint8(this.i++);
    }

    readBytes(length) {
        /*let arr = new Uint8Array(length);
        for(let i = 0;i < length;i++){
            arr[i] = this.readUint8();
        }*/
        if (this.i + length > this.buf.byteLength) {
            throw new RangeError('Offset is outside the bounds of the ArrayBuffer');
        }
        return this.u8.subarray(this.i, (this.i += length));
    }

    readInt16(oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        let n = this.view.getInt16(this.i, littleEndian);
        this.i += 2;
        return n;
    }

    readUint16(oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        let n = this.view.getUint16(this.i, littleEndian);
        this.i += 2;
        return n;
    }

    readInt32(oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        let n = this.view.getInt32(this.i, littleEndian);
        this.i += 4;
        return n;
    }

    readUint32(oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        let n = this.view.getUint32(this.i, littleEndian);
        this.i += 4;
        return n;
    }

    readBigInt64(oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        let n = this.view.getBigInt64(this.i, littleEndian);
        this.i += 8;
        return n;
    }

    readBigUint64(oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        let n = this.view.getBigUint64(this.i, littleEndian);
        this.i += 8;
        return n;
    }

    readFloat32(oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        let n = this.view.getFloat32(this.i, littleEndian);
        this.i += 4;
        return n;
    }

    readFloat64(oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        let n = this.view.getFloat64(this.i, littleEndian);
        this.i += 8;
        return n;
    }

    readVarIntBytes(maxByteLength = Infinity) {
        let bytes = [];
        let i = 0;
        while (maxByteLength > i++) {
            bytes.push(this.readUint8());
            if (!(bytes[bytes.length - 1] & 128)) {
                return bytes;
            }
        }
        throw new RangeError(`0x${this.i.toString(16)}: Variable integer length cannot exceed ${maxByteLength} bytes`);
    }

    readVarInt(oppositeEndian, maxByteLength = Infinity) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        let bytes = this.readVarIntBytes(maxByteLength);
        if (!littleEndian) {
            bytes = bytes.reverse();
            bytes[0] += 128;
            bytes[bytes.length - 1] -= 128;
        }
        return varint.decode(bytes);
    }

    readVarUint(oppositeEndian, maxByteLength = Infinity) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        let bytes = this.readVarIntBytes(maxByteLength);
        if (!littleEndian) {
            bytes = bytes.reverse();
            bytes[0] += 128;
            bytes[bytes.length - 1] -= 128;
        }
        return varuint.decode(bytes);
    }

    // ArrayBuffer를 확장한다.
    expandBuffer(len) {
        if (this.buf.byteLength >= this.i + len) return;
        len = this.i + len - this.buf.byteLength;
        if (len <= 0) return;
        let u8 = new Uint8Array(this.buf.byteLength + len);
        u8.set(new Uint8Array(this.buf));
        this.buf = u8.buffer;
        this.view = new DataView(this.buf);
        this.u8 = u8;
    }

    writeInt8(val) {
        this.expandBuffer(1);
        this.view.setInt8(this.i++, val);
    }

    writeUint8(val) {
        this.expandBuffer(1);
        this.view.setUint8(this.i++, val);
    }

    writeBytes(bytes) {
        this.expandBuffer(bytes.length);
        this.u8.set(bytes, this.i);
        this.i += bytes.length;
    }

    writeInt16(val, oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        this.expandBuffer(2);
        let n = this.view.setInt16(this.i, val, littleEndian);
        this.i += 2;
    }

    writeUint16(val, oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        this.expandBuffer(2);
        let n = this.view.setUint16(this.i, val, littleEndian);
        this.i += 2;
    }

    writeInt32(val, oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        this.expandBuffer(4);
        let n = this.view.setInt32(this.i, val, littleEndian);
        this.i += 4;
    }

    writeUint32(val, oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        this.expandBuffer(4);
        let n = this.view.setUint32(this.i, val, littleEndian);
        this.i += 4;
    }

    writeBigInt64(val, oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        this.expandBuffer(8);
        let n = this.view.setBigInt64(this.i, val, littleEndian);
        this.i += 8;
    }

    writeBigUint64(val, oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        this.expandBuffer(8);
        let n = this.view.setBigUint64(this.i, val, littleEndian);
        this.i += 8;
    }

    writeFloat32(val, oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        this.expandBuffer(4);
        let n = this.view.setFloat32(this.i, val, littleEndian);
        this.i += 4;
    }

    writeFloat64(val, oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        this.expandBuffer(8);
        let n = this.view.setFloat64(this.i, val, littleEndian);
        this.i += 8;
    }

    writeVarInt(val, oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        let a = varint.encode(val);
        if (!littleEndian) {
            a = a.reverse();
            a[0] += 128;
            a[a.length - 1] -= 128;
        }
        a.forEach(n => this.writeUint8(n));
    }

    writeVarUint(val, oppositeEndian) {
        let littleEndian = !!(this.littleEndian ^ oppositeEndian);
        let a = varuint.encode(val);
        if (!littleEndian) {
            a = a.reverse();
            a[0] += 128;
            a[a.length - 1] -= 128;
        }
        a.forEach(n => this.writeUint8(n));
    }

    ensureArrayBuffer(buf) {
        if (buf) {
            if (buf instanceof ArrayBuffer) {
                return buf;
            }
            // nodejs Buffer는 Uint8Array의 하위 클래스다
            if (buf instanceof Uint8Array) {
                return new Uint8Array(buf).buffer;
            }
        }
        throw new Error('Unsupported buffer type, need ArrayBuffer or Uint8Array or nodejs Buffer');
    }
};
