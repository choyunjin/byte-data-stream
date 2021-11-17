const var_int = require('signed-varint');
const var_uint = require('varint');

class WriteOnlyException extends Error{
    constructor(...args){
        super(...args);
        this.name = 'WriteOnlyException';
    }
}

module.exports = class ByteStreamSimulator{
    constructor(){
        this.i = 0;
        this.length = 0;
    }
    
    read_int8(){
        throw new WriteOnlyException(null);
    }
    
    read_uint8(){
        throw new WriteOnlyException(null);
    }
    
    read_bytes(){
        throw new WriteOnlyException(null);
    }
    
    read_int16(){
        throw new WriteOnlyException(null);
    }
    
    read_uint16(){
        throw new WriteOnlyException(null);
    }
    
    read_int32(){
        throw new WriteOnlyException(null);
    }
    
    read_uint32(){
        throw new WriteOnlyException(null);
    }
    
    read_big_int64(){
        throw new WriteOnlyException(null);
    }
    
    read_big_uint64(){
        throw new WriteOnlyException(null);
    }
    
    read_float32(){
        throw new WriteOnlyException(null);
    }
    
    read_float64(){
        throw new WriteOnlyException(null);
    }
    
    read_var_int_bytes(){
        throw new WriteOnlyException(null);
    }
    
    read_var_int(){
        throw new WriteOnlyException(null);
    }
    
    read_var_uint(){
        throw new WriteOnlyException(null);
    }
    
    // ArrayBuffer를 확장한다.
    expand_buffer(len){
        if(this.length >= this.i+len) return;
        this.length += (this.i+len)-this.length;
    }
    
    write_int8(){
        this.expand_buffer(1);
        this.i++;
    }
    
    write_uint8(){
        this.expand_buffer(1);
        this.i++;
    }
    
    write_bytes(bytes){
        for(let i = 0;i < bytes.length;i++){
            this.write_uint8();
        }
    }
    
    write_int16(){
        this.expand_buffer(2);
        this.i += 2;
    }
    
    write_uint16(){
        this.expand_buffer(2);
        this.i += 2;
    }
    
    write_int32(){
        this.expand_buffer(4);
        this.i += 4;
    }
    
    write_uint32(){
        this.expand_buffer(4);
        this.i += 4;
    }
    
    write_big_int64(){
        this.expand_buffer(8);
        this.i += 8;
    }
    
    write_big_uint64(){
        this.expand_buffer(8);
        this.i += 8;
    }
    
    write_float32(){
        this.expand_buffer(4);
        this.i += 4;
    }
    
    write_float64(){
        this.expand_buffer(8);
        this.i += 8;
    }
    
    write_var_int(val){
        let a = var_int.encode(val);
        a.forEach(() => this.write_uint8());
    }
    
    write_var_uint(val){
        let a = var_uint.encode(val)
        a.forEach(() => this.write_uint8());
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