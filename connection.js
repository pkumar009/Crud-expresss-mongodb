const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const database = 'employees';
const client = new MongoClient(url);

let getDb = async ()=>{
    let result = await client.connect();
    let db = result.db(database);
    return db.collection('add_employee');
}

module.exports = getDb;