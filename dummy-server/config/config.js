const MongoClient = require("mongodb").MongoClient;

class Connection {
  static open() {
    const client = new MongoClient(process.env.DATABASE_URL, {
      useNewUrlParser: true,
    });

    return client.db("userdummydb");
  }
}

Connection.db = null;

module.exports = { Connection };
