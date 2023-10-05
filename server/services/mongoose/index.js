import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URI = process.env.MONGO_URI;

const mongoDB = {
    connect: async () => {
      try {
        await mongoose.connect(MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
      } catch (error) {
        console.error('Error: ', error);
        throw new Error('Failed to connect to MongoDB Atlas',);
      }
    },
};

export default mongoDB;