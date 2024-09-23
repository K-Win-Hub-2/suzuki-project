import mongoose from "mongoose";
import "dotenv/config";
import { getEnvString } from "./default";

//sigleton pattern
class MongoDB {
  static #instance: MongoDB;
  private constructor() {}
  public static getInstance(): MongoDB {
    if (!MongoDB.#instance) {
      MongoDB.#instance = new MongoDB();
    }
    return MongoDB.#instance;
  }
  public connect(): void {
    const environment = process.env.NODE_ENV
    environment === "development" ? mongoose.connect(getEnvString("DEVELOPMENT_DB_URL")) : mongoose.connect(getEnvString("DB_URL"));
    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
    mongoose.connection.on("open", () => {
      console.log("Connected to MongoDB");
    });
  }
}
const mongoDB = MongoDB.getInstance();
export default mongoDB
