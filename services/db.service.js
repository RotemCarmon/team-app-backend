const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://Shachar:123@teams.ul6xp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

module.exports = {
    getCollection
}

// Database Name
const dbName = 'CA_Team_DB'

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        throw err
    }
}




