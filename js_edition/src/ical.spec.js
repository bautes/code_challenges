import assert from "assert";
import { listAbsences } from "./absences";
import { createCalendar } from "./ical";

describe("ical Event createCalendar", () => {
  describe("ical Event has the keys", () => {
    listAbsences().then((collection) => {
      const icalEvent = createCalendar(collection);

      [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID",
        "BEGIN:VEVENT",
        "UID:",
        "DTSTAMP:",
        "DTSTART;",
        "SUMMARY:",
        "END:VEVENT",
        "END:VCALENDAR",
      ].forEach((key) =>
        it(key, assert(!!~icalEvent.indexOf(key)))
      );
    });
  });
});
