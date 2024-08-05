import express from "express";
import { calculateLaborByWorker } from "./controllers/workersController.js";
import { calculateLaborByLocation } from "./controllers/locationsController.js";

const app = express();
const port = 3000;

async function main() {
  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.get("/worker_costs", calculateLaborByWorker);

  app.get("/location_costs", calculateLaborByLocation);

  app.listen(port, "0.0.0.0", () => {
    console.info(`App listening on ${port}.`);
  });
}

await main();
