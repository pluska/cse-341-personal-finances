const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (cb) => {
    if (database) {
        return cb(null, database);
    }
    const client = new MongoClient(process.env.MONGODB_URI);

    client.connect()
        .then((client) => {
            database = client.db(process.env.DB_NAME);
            return cb(null, database);
        })
        .catch((err) => {
            return cb(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
}