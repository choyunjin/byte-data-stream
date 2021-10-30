/**
 * ㅆ발 이거 ㅈㄴ 노가다임
 */
module.exports = class ByteStream{
    constructor(buf){
        this.buf = this.ensure_array_buffer(buf);
        this.i = 0;
        this.view = new DataView(this.buf);
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
    
    read_int16_be(){
        let n = this.view.getInt16(this.i);
        this.i += 2;
        return n;
    }
    
    read_int16_le(){
        let n = this.view.getInt16(this.i,true);
        this.i += 2;
        return n;
    }
    
    read_uint16_be(){
        let n = this.view.getUint16(this.i);
        this.i += 2;
        return n;
    }
    
    read_uint16_le(){
        let n = this.view.getUint16(this.i,true);
        this.i += 2;
        return n;
    }
    
    read_int32_be(){
        let n = this.view.getInt32(this.i);
        this.i += 4;
        return n;
    }
    
    read_int32_le(){
        let n = this.view.getInt32(this.i,true);
        this.i += 4;
        return n;
    }
    
    read_uint32_be(){
        let n = this.view.getUint32(this.i);
        this.i += 2;
        return n;
    }
    
    read_uint32_le(){
        let n = this.view.getUint32(this.i,true);
        this.i += 2;
        return n;
    }
    
    read_big_int64_be(){
        let n = this.view.getBigInt64(this.i);
        this.i += 8;
        return n;
    }
    
    read_big_int64_le(){
        let n = this.view.getBigInt64(this.i,true);
        this.i += 8;
        return n;
    }
    
    read_big_uint64_be(){
        let n = this.view.getBigUint64(this.i);
        this.i += 8;
        return n;
    }
    
    read_big_uint64_le(){
        let n = this.view.getBigUint64(this.i,true);
        this.i += 8;
        return n;
    }
    
    read_float32_be(){
        let n = this.view.getFloat32(this.i);
        this.i += 4;
        return n;
    }
    
    read_float32_le(){
        let n = this.view.getFloat32(this.i,true);
        this.i += 4;
        return n;
    }
    
    read_float64_be(){
        let n = this.view.getFloat64(this.i);
        this.i += 8;
        return n;
    }
    
    read_float64_le(){
        let n = this.view.getFloat64(this.i,true);
        this.i += 8;
        return n;
    }
    
    read_var_uint(max_byte_length = Infinity){
        let num = 0;
        let i = 0,v = 0;
        while(max_byte_length > i++){
            v = this.read_uint8();
            if(v & 128){
                num += v & 127;
                num <<= 7;
            }else return num + v;
        }
        throw new RangeError(`0x${this.i.toString(16)}: Variable integer length cannot exceed ${max_byte_length} bytes`);
    }
    
    // ArrayBuffer를 확장한다.
    expand_buffer(len){
        if(this.buf.byteLength >= this.i+len) return;
        let buf = [...new Uint8Array(this.buf)];
        this.buf = new ArrayBuffer(buf.length+len);
        let v = new Uint8Array(this.buf);
        for(let i in buf){
            v[i] = buf[i];
        }
        this.view = new DataView(this.buf);
    }
    
    write_int8(val){
        this.expand_buffer(1);
        this.view.setInt8(this.i++,val);
    }
    
    write_uint8(val){
        this.expand_buffer(1);
        this.view.setUint8(this.i++,val);
    }
    
    write_int16_be(val){
        this.expand_buffer(2);
        let n = this.view.setInt16(this.i,val);
        this.i += 2;
    }
    
    write_int16_le(val){
        this.expand_buffer(2);
        let n = this.view.setInt16(this.i,val,true);
        this.i += 2;
    }
    
    write_uint16_be(val){
        this.expand_buffer(2);
        let n = this.view.setUint16(this.i,val);
        this.i += 2;
    }
    
    write_uint16_le(val){
        this.expand_buffer(2);
        let n = this.view.setUint16(this.i,val,true);
        this.i += 2;
    }
    
    write_int32_be(val){
        this.expand_buffer(4);
        let n = this.view.setInt32(this.i,val);
        this.i += 4;
    }
    
    write_int32_le(val){
        this.expand_buffer(4);
        let n = this.view.setInt32(this.i,val,true);
        this.i += 4;
    }
    
    write_uint32_be(val){
        this.expand_buffer(4);
        let n = this.view.setUint32(this.i,val);
        this.i += 4;
    }
    
    write_uint32_le(val){
        this.expand_buffer(4);
        let n = this.view.setUint32(this.i,val,true);
        this.i += 4;
    }
    
    write_big_int64_be(val){
        this.expand_buffer(8);
        let n = this.view.setBigInt64(this.i,val);
        this.i += 8;
    }
    
    write_big_int64_le(val){
        this.expand_buffer(8);
        let n = this.view.setBigInt64(this.i,val,true);
        this.i += 8;
    }
    
    write_big_uint64_be(val){
        this.expand_buffer(8);
        let n = this.view.setBigUint64(this.i,val);
        this.i += 8;
    }
    
    write_big_uint64_le(val){
        this.expand_buffer(8);
        let n = this.view.setBigUint64(this.i,val,true);
        this.i += 8;
    }
    
    write_float32_be(val){
        this.expand_buffer(4);
        let n = this.view.setFloat32(this.i,val);
        this.i += 4;
    }
    
    write_float32_le(val){
        this.expand_buffer(4);
        let n = this.view.setFloat32(this.i,val,true);
        this.i += 4;
    }
    
    write_float64_be(val){
        this.expand_buffer(8);
        let n = this.view.setFloat64(this.i,val);
        this.i += 8;
    }
    
    write_float64_le(val){
        this.expand_buffer(8);
        let n = this.view.setFloat64(this.i,val,true);
        this.i += 8;
    }
    
    write_var_uint(val){
        if(Number.MAX_SAFE_INTEGER && val > Number.MAX_SAFE_INTEGER){
            throw new RangeError('Could not encode varint');
        }
        let a = [];
        let i = 0;
        
        while(val > 2147483647){
            a[i++] = (val & 255) | 128;
            val /= 128;
        }
        
        while(val & -129){
            a[i++] = (val & 255) | 128;
            val >>>= 7;
        }
        
        a[i] = val || 0;
        this.expand_buffer(a.length);
        a.forEach(n => this.write_uint8(n));
        this.i += a.length;
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