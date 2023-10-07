import express from "express";
import bodyParser from "body-parser";

import authApi from "./auth/index.js";
import api from "./api/index.js";
import mongoDB from './services/mongoose/index.js';

const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use("/auth", authApi);
app.use("/api", api);

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    console.error(err.stack || `Error: ${err}`);
    res.status(statusCode).json({ error: true, message: err.message || err || "Something went wrong!" });
});

mongoDB.connect().then(() => {
  console.log('MongoDB connected!');
}).catch((error) => {
  console.error('Failed to connect to MongoDB', error);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});