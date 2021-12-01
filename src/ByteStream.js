const var_int = require('signed-varint');
const var_uint = require('varint');

/**
 * ㅆ발 이거 ㅈㄴ 노가다임
 */
module.exports = class ByteStream{
    constructor(buf){
        this.buf = buf ? this.ensure_array_buffer(buf) : new ArrayBuffer();
        this.i = 0;
        this.view = new DataView(this.buf);
        this.u8 = new Uint8Array(this.buf);
    }
    
    get buffer(){
        return this.buf;
    }
    
    read_int8(){
        return this.view.getInt8(this.i++);
    }
    
    read_uint8(){
        return this.view.getUint8(this.i++);
    }
    
    read_bytes(length){
        /*let arr = new Uint8Array(length);
        for(let i = 0;i < length;i++){
            arr[i] = this.read_uint8();
        }*/
        if(this.i+length > this.buf.byteLength){
            throw new RangeError('Offset is outside the bounds of the ArrayBuffer');
        }
        return this.u8.subarray(this.i,this.i += length);
    }
    
    read_int16(little_endian){
        let n = this.view.getInt16(this.i,little_endian);
        this.i += 2;
        return n;
    }
    
    read_uint16(little_endian){
        let n = this.view.getUint16(this.i,little_endian);
        this.i += 2;
        return n;
    }
    
    read_int32(little_endian){
        let n = this.view.getInt32(this.i,little_endian);
        this.i += 4;
        return n;
    }
    
    read_uint32(little_endian){
        let n = this.view.getUint32(this.i,little_endian);
        this.i += 4;
        return n;
    }
    
    read_big_int64(little_endian){
        let n = this.view.getBigInt64(this.i,little_endian);
        this.i += 8;
        return n;
    }
    
    read_big_uint64(little_endian){
        let n = this.view.getBigUint64(this.i,little_endian);
        this.i += 8;
        return n;
    }
    
    read_float32(little_endian){
        let n = this.view.getFloat32(this.i,little_endian);
        this.i += 4;
        return n;
    }
    
    read_float64(little_endian){
        let n = this.view.getFloat64(this.i,little_endian);
        this.i += 8;
        return n;
    }
    
    read_var_int_bytes(max_byte_length = Infinity){
        let bytes = [];
        let i = 0;
        while(max_byte_length > i++){
            bytes.push(this.read_uint8());
            if(!(bytes[bytes.length-1] & 128)){
                return bytes;
            }
        }
        throw new RangeError(`0x${this.i.toString(16)}: Variable integer length cannot exceed ${max_byte_length} bytes`);
    }
    
    read_var_int(little_endian,max_byte_length = Infinity){
        let bytes = this.read_var_int_bytes(max_byte_length);
        if(!little_endian){
            bytes = bytes.reverse();
            bytes[0] += 128;
            bytes[bytes.length-1] -= 128;
        }
        return var_int.decode(bytes);
    }
    
    read_var_uint(little_endian,max_byte_length = Infinity){
        let bytes = this.read_var_int_bytes(max_byte_length);
        if(!little_endian){
            bytes = bytes.reverse();
            bytes[0] += 128;
            bytes[bytes.length-1] -= 128;
        }
        return var_uint.decode(bytes);
    }
    
    // ArrayBuffer를 확장한다.
    expand_buffer(len){
        if(this.buf.byteLength >= this.i+len) return;
        len = (this.i+len)-this.buf.byteLength;
        if(len <= 0) return;
        let u8 = new Uint8Array(this.buf.byteLength+len);
        u8.set(new Uint8Array(this.buf));
        this.buf = u8.buffer;
        this.view = new DataView(this.buf);
        this.u8 = u8;
    }
    
    write_int8(val){
        this.expand_buffer(1);
        this.view.setInt8(this.i++,val);
    }
    
    write_uint8(val){
        this.expand_buffer(1);
        this.view.setUint8(this.i++,val);
    }
    
    write_bytes(bytes){
        this.expand_buffer(bytes.length);
        this.u8.set(bytes,this.i);
        this.i += bytes.length;
    }
    
    write_int16(val,little_endian){
        this.expand_buffer(2);
        let n = this.view.setInt16(this.i,val,little_endian);
        this.i += 2;
    }
    
    write_uint16(val,little_endian){
        this.expand_buffer(2);
        let n = this.view.setUint16(this.i,val,little_endian);
        this.i += 2;
    }
    
    write_int32(val,little_endian){
        this.expand_buffer(4);
        let n = this.view.setInt32(this.i,val,little_endian);
        this.i += 4;
    }
    
    write_uint32(val,little_endian){
        this.expand_buffer(4);
        let n = this.view.setUint32(this.i,val,little_endian);
        this.i += 4;
    }
    
    write_big_int64(val,little_endian){
        this.expand_buffer(8);
        let n = this.view.setBigInt64(this.i,val,little_endian);
        this.i += 8;
    }
    
    write_big_uint64(val,little_endian){
        this.expand_buffer(8);
        let n = this.view.setBigUint64(this.i,val,little_endian);
        this.i += 8;
    }
    
    write_float32(val,little_endian){
        this.expand_buffer(4);
        let n = this.view.setFloat32(this.i,val,little_endian);
        this.i += 4;
    }
    
    write_float64(val,little_endian){
        this.expand_buffer(8);
        let n = this.view.setFloat64(this.i,val,little_endian);
        this.i += 8;
    }
    
    write_var_int(val,little_endian){
        let a = var_int.encode(val);
        if(!little_endian){
            a = a.reverse();
            a[0] += 128;
            a[a.length-1] -= 128;
        }
        a.forEach(n => this.write_uint8(n));
    }
    
    write_var_uint(val,little_endian){
        let a = var_uint.encode(val);
        if(!little_endian){
            a = a.reverse();
            a[0] += 128;
            a[a.length-1] -= 128;
        }
        a.forEach(n => this.write_uint8(n));
    }
    
    ensure_array_buffer(buf){
        if(buf){
            if(buf instanceof ArrayBuffer){
                return buf;
            }
            // nodejs Buffer는 Uint8Array의 하위 클래스다
            if(buf instanceof Uint8Array){
                return new Uint8Array(buf).buffer;
            }
        }
        throw new Error('Unsupported buffer type, need ArrayBuffer or Uint8Array or nodejs Buffer');
    }
}