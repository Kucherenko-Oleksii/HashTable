class EnhancedHashTable {
    constructor(){
        this.table = new Map();
    }
    hash(key){
        let hash = 0;
        for(const char of key){
            hash = (hash + char.charCodeAt(0) * key.length) % 1000;
        }
        return hash;
    }
    set(key, value){
        if(this.table.has(key)){
            console.warn(`This data already exists!`);
            return false;
        }
        this.table.set(key, value);
        return true;
    }
    get(key){
        return this.table.get(key);
    }
    delete(key){
        return this.table.delete(key);
    }
    entries(){
        return [...this.table.entries()];
    }
}
export default EnhancedHashTable;