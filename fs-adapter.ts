


function FSAdapter(map: Map<string, any>) {
    return {
        readFile(filename, options, callback) {
            if (typeof options === 'function') {
                callback = options
                options = {}
            } else if (typeof options === 'string') {
              options = { encoding: options }
            }
            const value = map.get(filename);
            if(value == null) {
               const err =  new Error(`ENOENT, open "${filename}"`);
               return callback(err);
            }
            callback && callback(null, value);
        },

        writeFile(filename, content, options, callback) {
            if (typeof options === 'function') {
                callback = options
                options = {}
              } else if (typeof options === 'string') {
                options = { encoding: options }
              }
              map.set(filename, JSON.stringify(content));
        }
    }
}

const map = new Map();

const fs = FSAdapter(map);

fs.writeFile('./http-proxy.ts', {name: 'Asadbek'}, 'base64', (err) =>{
    console.error(err)
})

fs.readFile('./http-proxy.ts', 'utf-8',(err, data)=> {

    if(err) {
        return console.error(err)
    }
    console.log('VALUE | ', JSON.parse(data))
})