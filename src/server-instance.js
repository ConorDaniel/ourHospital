import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import HapiSwagger from "hapi-swagger";
import Cookie from "@hapi/cookie";
import Joi from "joi";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { db } from "./models/db.js";
import { apiRoutes } from "./api/api-routes.js";
import { webRoutes } from "./web-routes.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const Package = require("../package.json");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export async function createServer() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });

  // Swagger config
  const swaggerOptions = {
    info: {
      title: "OurHospital API Documentation",
      version: Package.version,
    },
  };

  // Register plugins
  await server.register([
    Inert,
    Vision,
    Cookie,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  // Joi validation
  server.validator(Joi);

  // View engine
  server.views({
    engines: { hbs: Handlebars },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  // Auth setup
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "ourHospital",
      password: "secretpasswordnotrevealedtoanyone",
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });

  server.auth.default("session");

  // DB init
  db.init("mongo");

  // Register routes
  server.route(apiRoutes);
  server.route(webRoutes);

  return server;
}
