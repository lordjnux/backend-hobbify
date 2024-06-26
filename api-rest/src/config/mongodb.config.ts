import {config as dotenvConfig} from 'dotenv';

dotenvConfig({ path: './.env.development.local' });

import mongoose from "mongoose";


const URI = `${process.env.MONGODB_HOST}+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.jafvbnl.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Micluster`


const mongoConnect = async () => {
    await mongoose.connect(URI);
}

export {mongoConnect};
