const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/backend";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name;
    console.log(`✅ Connected to MongoDB! Database name: "${databaseName}"`);
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });
