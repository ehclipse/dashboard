const { MongoClient } = require('mongodb');
require('dotenv').config();

let dbConnection;
let uri = `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@cluster0.riakr.mongodb.net/?retryWrites=true&w=majority`

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db();
                return cb()
            })
            .catch(error => {
                console.log(error);
                return cb(err)
            })
    },
    getDb: () => dbConnection
}