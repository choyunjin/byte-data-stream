export interface ByteStreamInterface {
    /** 현재 위치 */
    i: number;

    /** 이 stream이 사용하는 ArrayBuffer */
    get buffer(): ArrayBuffer;

    /** ArrayBuffer의 길이(byte 단위) */
    get length(): number;

    /** 데이터를 더 읽을 수 있는지 여부 */
    get isDataAvailable(): boolean;

    /** 부호 있는 8비트(1바이트) 정수를 읽음 */
    readInt8(): number;

    /** 부호 없는 8비트(1바이트) 정수를 읽음 */
    readUint8(): number;

    /**
     * 정해진 길이만큼의 데이터를 읽음
     * @param length 읽을 데이터의 길이(byte 단위)
     */
    readBytes(length: number): Uint8Array;

    /** 현재 위치부터 끝까지 데이터를 읽음 */
    readBytesUntilEnd(): Uint8Array;

    /**
     * 부호 있는 16비트(2바이트) 정수를 읽음
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 읽을지 여부
     */
    readInt16(oppositeEndian: boolean): number;

    /**
     * 부호 없는 16비트(2바이트) 정수를 읽음
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 읽을지 여부
     */
    readUint16(oppositeEndian: boolean): number;

    /**
     * 부호 있는 32비트(4바이트) 정수를 읽음
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 읽을지 여부
     */
    readInt32(oppositeEndian: boolean): number;

    /**
     * 부호 없는 32비트(4바이트) 정수를 읽음
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 읽을지 여부
     */
    readUint32(oppositeEndian: boolean): number;

    /**
     * 부호 있는 64비트(8바이트) 정수를 읽어 bigint형으로 반환
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 읽을지 여부
     */
    readBigInt64(oppositeEndian: boolean): bigint;

    /**
     * 부호 없는 64비트(8바이트) 정수를 읽어 bigint형으로 반환
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 읽을지 여부
     */
    readBigUint64(oppositeEndian: boolean): bigint;

    /**
     * 32비트(4바이트) 부동소수점(단정밀도) 실수를 읽음
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 읽을지 여부
     */
    readFloat32(oppositeEndian: boolean): number;

    /**
     * 64비트(8바이트) 부동소수점(배정밀도) 실수를 읽음
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 읽을지 여부
     */
    readFloat64(oppositeEndian: boolean): number;

    /**
     * 부호 있는 가변 길이 정수를 읽음
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 읽을지 여부
     */
    readVarInt(oppositeEndian: boolean, maxByteLength: number): number;

    /**
     * 부호 없는 가변 길이 정수를 읽음
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 읽을지 여부
     */
    readVarUint(oppositeEndian: boolean, maxByteLength: number): number;

    /**
     * 부호 있는 8비트(1바이트) 정수를 기록함
     * @param val 기록할 숫자
     */
    writeInt8(val: number);

    /**
     * 부호 없는 8비트(1바이트) 정수를 기록함
     * @param val 기록할 숫자
     */
    writeUint8(val: number);

    /**
     * 주어진 데이터를 기록함
     * @param bytes 기록할 데이터
     */
    writeBytes(bytes: number[] | Uint8Array);

    /**
     * 부호 있는 16비트(2바이트) 정수를 기록함
     * @param val 기록할 숫자
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 기록할지 여부
     */
    writeInt16(val: number, oppositeEndian: boolean);

    /**
     * 부호 없는 16비트(2바이트) 정수를 기록함
     * @param val 기록할 숫자
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 기록할지 여부
     */
    writeUint16(val: number, oppositeEndian: boolean);

    /**
     * 부호 있는 32비트(4바이트) 정수를 기록함
     * @param val 기록할 숫자
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 기록할지 여부
     */
    writeInt32(val: number, oppositeEndian: boolean);

    /**
     * 부호 없는 32비트(4바이트) 정수를 기록함
     * @param val 기록할 숫자
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 기록할지 여부
     */
    writeUint32(val: number, oppositeEndian: boolean);

    /**
     * bigint형 정수를 받아 부호 있는 64비트(8바이트) 정수로 기록함
     * @param val 기록할 숫자
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 기록할지 여부
     */
    writeBigInt64(val: bigint, oppositeEndian: boolean);

    /**
     * bigint형 정수를 받아 부호 없는 64비트(8바이트) 정수로 기록함
     * @param val 기록할 숫자
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 기록할지 여부
     */
    writeBigUint64(val: bigint, oppositeEndian: boolean);

    /**
     * 32비트(4바이트) 부동소수점(단정밀도) 실수를 기록함
     * @param val 기록할 숫자
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 기록할지 여부
     */
    writeFloat32(val: number, oppositeEndian: boolean);

    /**
     * 64비트(8바이트) 부동소수점(배정밀도) 실수를 기록함
     * @param val 기록할 숫자
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 기록할지 여부
     */
    writeFloat64(val: number, oppositeEndian: boolean);

    /**
     * 부호 있는 가변 길이 정수를 기록함
     * @param val 기록할 숫자
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 기록할지 여부
     */
    writeVarInt(val: number, oppositeEndian: boolean);

    /**
     * 부호 없는 가변 길이 정수를 기록함
     * @param val 기록할 숫자
     * @param oppositeEndian 정해진 기본 엔디언과 반대 엔디언으로 기록할지 여부
     */
    writeVarUint(val: number, oppositeEndian: boolean);
}