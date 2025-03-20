import * as dotenv from "dotenv";
import Mongoose from "mongoose";

dotenv.config();
Mongoose.set("strictQuery", true);

export const db = Mongoose.connection; // ✅ Exporting db globally

export function connectMongo() {
  Mongoose.connect(process.env.db);

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
  });
}
