const varint = require('signed-varint');
const varuint = require('varint');

class WriteOnlyException extends Error{
    constructor(...args){
        super(...args);
        this.name = 'WriteOnlyException';
    }
}

/**
 * ㅆ발 이거 ㅈㄴ 노가다임
 */
module.exports = class ByteStream{
    constructor(buf){
        this.i = 0;
        this.length = 0;
    }
    
    get buffer(){
        return this.buf;
    }
    
    readInt8(){
        throw new WriteOnlyException(null);
    }
    
    readUint8(){
        throw new WriteOnlyException(null);
    }
    
    readBytes(){
        throw new WriteOnlyException(null);
    }
    
    readInt16(){
        throw new WriteOnlyException(null);
    }
    
    readUint16(){
        throw new WriteOnlyException(null);
    }
    
    readInt32(){
        throw new WriteOnlyException(null);
    }
    
    readUint32(){
        throw new WriteOnlyException(null);
    }
    
    readBigInt64(){
        throw new WriteOnlyException(null);
    }
    
    readBigUint64(){
        throw new WriteOnlyException(null);
    }
    
    readFloat32(){
        throw new WriteOnlyException(null);
    }
    
    readFloat64(){
        throw new WriteOnlyException(null);
    }
    
    readVarIntBytes(){
        throw new WriteOnlyException(null);
    }
    
    readVarInt(){
        throw new WriteOnlyException(null);
    }
    
    readVarUint(){
        throw new WriteOnlyException(null);
    }
    
    // ArrayBuffer를 확장한다.
    expandBuffer(len){
        if(this.length >= this.i+len) return;
        this.length += (this.i+len)-this.length;
    }
    
    writeInt8(){
        this.expandBuffer(1);
        this.i++;
    }
    
    writeUint8(){
        this.expandBuffer(1);
        this.i++;
    }
    
    writeBytes(bytes){
        let b = [...bytes];
        for(let i = 0;i < b.length;i++){
            this.writeUint8();
        }
    }
    
    writeInt16(){
        this.expandBuffer(2);
        this.i += 2;
    }
    
    writeUint16(){
        this.expandBuffer(2);
        this.i += 2;
    }
    
    writeInt32(){
        this.expandBuffer(4);
        this.i += 4;
    }
    
    writeUint32(){
        this.expandBuffer(4);
        this.i += 4;
    }
    
    writeBigInt64(){
        this.expandBuffer(8);
        this.i += 8;
    }
    
    writeBigUint64(){
        this.expandBuffer(8);
        this.i += 8;
    }
    
    writeFloat32(){
        this.expandBuffer(4);
        this.i += 4;
    }
    
    writeFloat64(){
        this.expandBuffer(8);
        this.i += 8;
    }
    
    writeVarInt(val){
        let a = varint.encode(val);
        a.forEach(() => this.writeUint8());
    }
    
    writeVarUint(val){
        let a = varuint.encode(val);
        a.forEach(() => this.writeUint8());
    }
}