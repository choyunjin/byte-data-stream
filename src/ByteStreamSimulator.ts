import varint from 'signed-varint';
import varuint from 'varint';
import { ByteStreamInterface } from './ByteStreamInterface.js';

export class WriteOnlyException extends Error {
    constructor(...args) {
        super(...args);
        this.name = 'WriteOnlyException';
    }
}

export class ByteStreamSimulator implements ByteStreamInterface {
    i: number;
    #byteLength: number;

    constructor(buf?: ArrayBuffer | Uint8Array) {
        this.i = 0;
        this.#byteLength = 0;
    }

    get buffer(): ArrayBuffer {
        return null;
    }
    
    get length(): number {
        return this.#byteLength;
    }
    
    get isDataAvailable(): boolean {
        return false;
    }

    readInt8(): number {
        throw new WriteOnlyException(null);
    }

    readUint8(): number {
        throw new WriteOnlyException(null);
    }

    readBytes(): Uint8Array {
        throw new WriteOnlyException(null);
    }
    
    readBytesUntilEnd(): Uint8Array {
        throw new WriteOnlyException(null);
    }

    readInt16(): number {
        throw new WriteOnlyException(null);
    }

    readUint16(): number {
        throw new WriteOnlyException(null);
    }

    readInt32(): number {
        throw new WriteOnlyException(null);
    }

    readUint32(): number {
        throw new WriteOnlyException(null);
    }

    readBigInt64(): bigint {
        throw new WriteOnlyException(null);
    }

    readBigUint64(): bigint {
        throw new WriteOnlyException(null);
    }

    readFloat32(): number {
        throw new WriteOnlyException(null);
    }

    readFloat64(): number {
        throw new WriteOnlyException(null);
    }

    readVarInt(): number {
        throw new WriteOnlyException(null);
    }

    readVarUint(): number {
        throw new WriteOnlyException(null);
    }

    // ArrayBuffer를 확장한다.
    #expandBuffer(len: number) {
        if (this.#byteLength >= this.i + len) return;
        this.#byteLength += this.i + len - this.#byteLength;
    }

    writeInt8() {
        this.#expandBuffer(1);
        this.i++;
    }

    writeUint8() {
        this.#expandBuffer(1);
        this.i++;
    }

    writeBytes(bytes: number[] | Uint8Array) {
        let b = [...bytes];
        for (let i = 0; i < b.length; i++) {
            this.writeUint8();
        }
    }

    writeInt16() {
        this.#expandBuffer(2);
        this.i += 2;
    }

    writeUint16() {
        this.#expandBuffer(2);
        this.i += 2;
    }

    writeInt32() {
        this.#expandBuffer(4);
        this.i += 4;
    }

    writeUint32() {
        this.#expandBuffer(4);
        this.i += 4;
    }

    writeBigInt64() {
        this.#expandBuffer(8);
        this.i += 8;
    }

    writeBigUint64() {
        this.#expandBuffer(8);
        this.i += 8;
    }

    writeFloat32() {
        this.#expandBuffer(4);
        this.i += 4;
    }

    writeFloat64() {
        this.#expandBuffer(8);
        this.i += 8;
    }

    writeVarInt(val: number) {
        let a = varint.encode(val);
        a.forEach(() => this.writeUint8());
    }

    writeVarUint(val: number) {
        let a = varuint.encode(val);
        a.forEach(() => this.writeUint8());
    }
}