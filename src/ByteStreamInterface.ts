/**
 * 개 노가다임333
 */
export interface ByteStreamInterface {
    i: number;

    get buffer(): ArrayBuffer;

    get length(): number;

    get isDataAvailable(): boolean;

    readInt8(): number;

    readUint8(): number;

    readBytes(length: number): Uint8Array;

    readInt16(oppositeEndian: boolean): number;

    readUint16(oppositeEndian: boolean): number;

    readInt32(oppositeEndian: boolean): number;

    readUint32(oppositeEndian: boolean): number;

    readBigInt64(oppositeEndian: boolean): bigint;

    readBigUint64(oppositeEndian: boolean): bigint;

    readFloat32(oppositeEndian: boolean): number;

    readFloat64(oppositeEndian: boolean): number;

    readVarInt(oppositeEndian: boolean, maxByteLength: number): number;

    readVarUint(oppositeEndian: boolean, maxByteLength: number): number;

    writeInt8(val: number);

    writeUint8(val: number);

    writeBytes(bytes: number[] | Uint8Array);

    writeInt16(val: number, oppositeEndian: boolean);

    writeUint16(val: number, oppositeEndian: boolean);

    writeInt32(val: number, oppositeEndian: boolean);

    writeUint32(val: number, oppositeEndian: boolean);

    writeBigInt64(val: bigint, oppositeEndian: boolean);

    writeBigUint64(val: bigint, oppositeEndian: boolean);

    writeFloat32(val: number, oppositeEndian: boolean);

    writeFloat64(val: number, oppositeEndian: boolean);

    writeVarInt(val: number, oppositeEndian: boolean);

    writeVarUint(val: number, oppositeEndian: boolean);
}