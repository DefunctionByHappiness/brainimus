import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// REDO IN TYPESCRIPT ALL THE FILES OF USER END
// import { user } from "./controller/user";
import { server } from "./controller/server";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

app.use(cors());

import bodyParser from "body-parser";

app.use(bodyParser.json());

// use sessions for tracking logins
import session from "express-session";
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
  })
);

// app.use("/user", user);

app.use("/server", server);

app.listen(3000, process.env.HOST, () =>
  console.log(`Brainimus listening on port ${process.env.PORT}!`)
);
