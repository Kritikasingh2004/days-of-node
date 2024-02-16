const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

function connectToMongoDB() {
  const connectionString = "mongodb://localhost:27017/mydb";

  mongoose.connect(
    connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.error("MongoDB connection error:", err);
      } else {
        console.log("Connected to MongoDB successfully");
      }
    }
  );
}

connectToMongoDB()
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
