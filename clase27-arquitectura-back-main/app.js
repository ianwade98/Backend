import express from "express";

import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

import mongoose from "mongoose";
import initializePassport from "./src/config/passport.config.js";
import cookieParser from "cookie-parser";
import passport from "passport";

import { __dirname } from "./src/utils.js";
import indexRoutes from "./src/routes/index.routes.js";
import config from "./src/config/config.js";

// --- application
const app = express();

// --- mongoDB
mongoose.set("strictQuery", true);
mongoose
  .connect(config.MONGO_URL)
  .catch((err) => console.log("Error al conectar a MongoDB", err));

// --- handlebars config
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

// --- Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

app.use("/", indexRoutes);

// --- server start
app.listen(config.PORT, () => console.log(`Server up in port ${config.PORT}`));
