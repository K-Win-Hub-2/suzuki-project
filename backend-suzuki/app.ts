import http, { Server } from "http";
import express, { Express, Request, Response, NextFunction } from "express";
import { env } from "./config/default";
import routeConfig from "./config/routeConfig";
import mongoDB from "./config/dbConfig";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import "dotenv/config";
import CustomErrorHelper from "./helpers/customErrorHelper";
import { createFolder } from "./helpers/folderCreation";
import { Server as socketIOServer } from "socket.io";

const app: Express = express();

app.use(express.json());
const server: Server = http.createServer(app);

export const io = new socketIOServer(server, {
  cors: {
    origin: "*",
  },
});

// general configuration
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));

//prevent common attack
app.use(helmet());

//route configuration
routeConfig.registerRoutes(app);

//database configuration
mongoDB.connect();
// console.log("port:", env.port)

//create folder
createFolder("public/excel");
//if there is no api

app.use("*", (req, res) => {
  if (process.env.NODE_ENV === "development") {
    console.log(req.baseUrl);
  }
  res.status(404).json({
    success: false,
    messsage: "There is no Api of " + req.baseUrl,
  });
});

// Specific error handler for MongoDB errors
app.use(CustomErrorHelper);

io.on("connection", (socket) => {
  console.log("A user connected " + socket.id);

  socket.on("send-notification", (data) => {
    console.log("Notification Recieved", data);

    io.emit("receive-notification", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected " + socket.id);
  });
});

server.listen(env.port, function () {
  console.log("Server is running on ", env.port);
});
