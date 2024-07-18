import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const dbHost = process.env.MONGO_URI;
        let dbName;
        if (process.env.NODE_ENV == 'test') {
            dbName = "testegov"
        }
        else if (process.env.NODE_ENV == "dev") {
            dbName = "egovdev"
        } else {
            // production db
            dbName = "egov"
        }
        console.log(dbHost + dbName)
        const db = await mongoose.connect(dbHost + dbName)
        console.log(`mongodb connected to ${db.connection.host}:${db.connection.port}`);
    } catch (err) {
        console.log(err.message)

    }
}

export { dbConnect }