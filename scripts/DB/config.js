const mongoose = require('mongoose');

class DB {
    constructor() {
        mongoose.connect(process.env.MONGO_DB_ATLAS)
            .then(() => console.log('DB conected'))
            .catch(e => console.log(e));
    }
}

module.exports = DB