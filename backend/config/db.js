import { connect } from "mongoose";

const dbUrl = process.env.DB_URI;

const connectDb = async() => {
        const conn = await connect(dbUrl)
        .catch(error => {
            console.log(`error connecting to db: ${error.message}`.red.bold.underline)
            process.exit(1)
        });
        console.log(`Connected to db at ${conn.connection.host}`.cyan.underline);
}

export default connectDb;