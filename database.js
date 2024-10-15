const { MongoClient } = require('mongodb');


const URI = "mongodb+srv://jaanusd79:lh5qjOBerdWCXQVW@namastenode.nud25.mongodb.net/"

const client = new MongoClient(URI);

// Database name
const dbName = "NamasteNode";

async function main() {
    await client.connect();
    console.log("Connected to MongoDB server");
    const db = client.db(dbName);
    const collection = db.collection('users');

    const data = {
        firstName : "Junaid",
        lastName: "Syed",
        city : "Delhi",
        phone: "931294802"
    }

    // const insertRes = await collection.insertOne(data);
    // console.log(("Inserted Data =>", insertRes))

    const result = await collection.find({firstName : "Junaid"}).toArray();
    console.log("result=> ", result)

    return "done.."
};

main()
   .then(console.log)
   .catch(console.error)
   .finally(() => client.close());