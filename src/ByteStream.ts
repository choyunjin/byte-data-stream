import varint from 'signed-varint';
import varuint from 'varint';
import { ByteStreamInterface } from './ByteStreamInterface.js';

export class ByteStream implements ByteStreamInterface {
    i: number;
    #buf: ArrayBuffer;
    private view: DataView;
    private u8: Uint8Array;
    private littleEndian: boolean;

    /**
     * 길이를 받아 새로운 버퍼를 만드는 생성자
     * @param length 버퍼의 길이
     * @param littleEndian 리틀 엔디언을 사용할 것인지 여부. false면 빅 엔디언을 사용한다
     */
    constructor(length: number, littleEndian?: boolean);

    /**
     * 데이터가 담긴 버퍼를 받는 생성자
     * @param buf 데이터 버퍼. null이면 새로 생성함
     * @param littleEndian 리틀 엔디언을 사용할 것인지 여부. false면 빅 엔디언을 사용한다
     */
    constructor(buf: ArrayBuffer | Uint8Array, littleEndian?: boolean);

    constructor(buf: ArrayBuffer | Uint8Array | number = null, littleEndian: boolean = false) {
        if (typeof buf == 'number') {
            this.#buf = new ArrayBuffer(buf); // 변수명이 좀 이상하긴 하지만
        } else {
            this.#buf = buf ? this.#ensureArrayBuffer(buf) : new ArrayBuffer(0);
        }
        this.i = 0;
        this.view = new DataView(this.#buf);
        this.u8 = new Uint8Array(this.#buf);
        this.littleEndian = littleEndian;
    }

    #ensureArrayBuffer(buf: ArrayBuffer | Uint8Array): ArrayBuffer {
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

    get buffer(): ArrayBuffer {
        return this.#buf;
    }

    get length(): number {
        return this.#buf.byteLength;
    }

    get isDataAvailable(): boolean {
        return this.i < this.#buf.byteLength;
    }

    readInt8(): number {
        return this.view.getInt8(this.i++);
    }

    readUint8(): number {
        return this.view.getUint8(this.i++);
    }

    readBytes(length: number): Uint8Array {
        if (this.i + length > this.#buf.byteLength) {
            throw new RangeError('Offset is outside the bounds of the ArrayBuffer');
        }
        return this.u8.subarray(this.i, (this.i += length));
    }

    readBytesUntilEnd(): Uint8Array {
        return this.readBytes(this.#buf.byteLength - this.i);
    }

    readInt16(oppositeEndian: boolean = false): number {
        let littleEndian = this.littleEndian !== oppositeEndian;
        let n = this.view.getInt16(this.i, littleEndian);
        this.i += 2;
        return n;
    }

    readUint16(oppositeEndian: boolean = false): number {
        let littleEndian = this.littleEndian !== oppositeEndian;
        let n = this.view.getUint16(this.i, littleEndian);
        this.i += 2;
        return n;
    }

    readInt32(oppositeEndian: boolean = false): number {
        let littleEndian = this.littleEndian !== oppositeEndian;
        let n = this.view.getInt32(this.i, littleEndian);
        this.i += 4;
        return n;
    }

    readUint32(oppositeEndian: boolean = false): number {
        let littleEndian = this.littleEndian !== oppositeEndian;
        let n = this.view.getUint32(this.i, littleEndian);
        this.i += 4;
        return n;
    }

    readBigInt64(oppositeEndian: boolean = false): bigint {
        let littleEndian = this.littleEndian !== oppositeEndian;
        let n = this.view.getBigInt64(this.i, littleEndian);
        this.i += 8;
        return n;
    }

    readBigUint64(oppositeEndian: boolean = false): bigint {
        let littleEndian = this.littleEndian !== oppositeEndian;
        let n = this.view.getBigUint64(this.i, littleEndian);
        this.i += 8;
        return n;
    }

    readFloat32(oppositeEndian: boolean = false): number {
        let littleEndian = this.littleEndian !== oppositeEndian;
        let n = this.view.getFloat32(this.i, littleEndian);
        this.i += 4;
        return n;
    }

    readFloat64(oppositeEndian: boolean = false): number {
        let littleEndian = this.littleEndian !== oppositeEndian;
        let n = this.view.getFloat64(this.i, littleEndian);
        this.i += 8;
        return n;
    }

    #readVarIntBytes(maxByteLength: number = Infinity): number[] {
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

    readVarInt(oppositeEndian: boolean = false, maxByteLength: number = Infinity): number {
        let littleEndian = this.littleEndian !== oppositeEndian;
        let bytes = this.#readVarIntBytes(maxByteLength);
        if (!littleEndian) {
            bytes = bytes.reverse();
            bytes[0] += 128;
            bytes[bytes.length - 1] -= 128;
        }
        return varint.decode(bytes);
    }

    readVarUint(oppositeEndian: boolean = false, maxByteLength: number = Infinity): number {
        let littleEndian = this.littleEndian !== oppositeEndian;
        let bytes = this.#readVarIntBytes(maxByteLength);
        if (!littleEndian) {
            bytes = bytes.reverse();
            bytes[0] += 128;
            bytes[bytes.length - 1] -= 128;
        }
        return varuint.decode(bytes);
    }

    // ArrayBuffer를 확장한다.
    #expandBuffer(len: number) {
        if (this.#buf.byteLength >= this.i + len) return;
        len = this.i + len - this.#buf.byteLength;
        if (len <= 0) return;
        let u8 = new Uint8Array(this.#buf.byteLength + len);
        u8.set(new Uint8Array(this.#buf));
        this.#buf = u8.buffer;
        this.view = new DataView(this.#buf);
        this.u8 = u8;
    }

    writeInt8(val: number) {
        this.#expandBuffer(1);
        this.view.setInt8(this.i++, val);
    }

    writeUint8(val: number) {
        this.#expandBuffer(1);
        this.view.setUint8(this.i++, val);
    }

    writeBytes(bytes: number[] | Uint8Array) {
        this.#expandBuffer(bytes.length);
        this.u8.set(bytes, this.i);
        this.i += bytes.length;
    }

    writeInt16(val: number, oppositeEndian: boolean = false) {
        let littleEndian = this.littleEndian !== oppositeEndian;
        this.#expandBuffer(2);
        let n = this.view.setInt16(this.i, val, littleEndian);
        this.i += 2;
    }

    writeUint16(val: number, oppositeEndian: boolean = false) {
        let littleEndian = this.littleEndian !== oppositeEndian;
        this.#expandBuffer(2);
        let n = this.view.setUint16(this.i, val, littleEndian);
        this.i += 2;
    }

    writeInt32(val: number, oppositeEndian: boolean = false) {
        let littleEndian = this.littleEndian !== oppositeEndian;
        this.#expandBuffer(4);
        let n = this.view.setInt32(this.i, val, littleEndian);
        this.i += 4;
    }

    writeUint32(val: number, oppositeEndian: boolean = false) {
        let littleEndian = this.littleEndian !== oppositeEndian;
        this.#expandBuffer(4);
        let n = this.view.setUint32(this.i, val, littleEndian);
        this.i += 4;
    }

    writeBigInt64(val: bigint, oppositeEndian: boolean = false) {
        let littleEndian = this.littleEndian !== oppositeEndian;
        this.#expandBuffer(8);
        let n = this.view.setBigInt64(this.i, val, littleEndian);
        this.i += 8;
    }

    writeBigUint64(val: bigint, oppositeEndian: boolean = false) {
        let littleEndian = this.littleEndian !== oppositeEndian;
        this.#expandBuffer(8);
        let n = this.view.setBigUint64(this.i, val, littleEndian);
        this.i += 8;
    }

    writeFloat32(val: number, oppositeEndian: boolean = false) {
        let littleEndian = this.littleEndian !== oppositeEndian;
        this.#expandBuffer(4);
        let n = this.view.setFloat32(this.i, val, littleEndian);
        this.i += 4;
    }

    writeFloat64(val: number, oppositeEndian: boolean = false) {
        let littleEndian = this.littleEndian !== oppositeEndian;
        this.#expandBuffer(8);
        let n = this.view.setFloat64(this.i, val, littleEndian);
        this.i += 8;
    }

    writeVarInt(val: number, oppositeEndian: boolean = false) {
        let littleEndian = this.littleEndian !== oppositeEndian;
        let a = varint.encode(val);
        if (!littleEndian) {
            a = a.reverse();
            a[0] += 128;
            a[a.length - 1] -= 128;
        }
        this.writeBytes(Uint8Array.from(a));
    }

    writeVarUint(val: number, oppositeEndian: boolean = false) {
        let littleEndian = this.littleEndian !== oppositeEndian;
        let a = varuint.encode(val);
        if (!littleEndian) {
            a = a.reverse();
            a[0] += 128;
            a[a.length - 1] -= 128;
        }
        this.writeBytes(Uint8Array.from(a));
    }
}