import mongoose from 'mongoose';
import {Model} from 'mongoose';

import {FileInfoSchema, FileInfo} from "../../models/FileInfo";

class DatabaseConnectionService {
    private mongoDBURI = 'mongodb+srv://admin:zhv88wbfd1q8HWBn@cluster0.ckmtc.mongodb.net/FileIngester?retryWrites=true&w=majority';

    // @ts-ignore
    connectToDB(): Model<FileInfo> {
        try {
            mongoose.connect(this.mongoDBURI);
            const db = mongoose.connection;

            db.on("error", console.error.bind(console, "MongoDB Connection error:"));
            db.once("open", function () {
                console.log("MongoDB Connection Successful!");
            });

            return mongoose.model('FileInfo', FileInfoSchema, "files");
        } catch (e) {
            console.log(e);
        }
    }
}

export default new DatabaseConnectionService();
