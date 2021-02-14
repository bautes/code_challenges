import express from "express";
import { listAbsences } from "./src/absences.js";
import { createCalendar } from "./src/ical/index.js";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", "attachment; filename=absenses.ics");

  const allAbsenses = await listAbsences();
  let filteredAbs;
  switch (true) {
    case !!req.query["userId"]:
      filteredAbs = allAbsenses.filter(
        (abs) => abs.userId === +req.query["userId"]
      );
      break;
    case !!req.query["startDate"] && !!req.query["endDate"]:
      filteredAbs = allAbsenses.filter(
        (abs) =>
          abs.startDate >= req.query["startDate"] &&
          abs.endDate <= req.query["endDate"]
      );
      break;
    default:
      filteredAbs = allAbsenses;
      break;
  }

  res.send(createCalendar(filteredAbs));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
