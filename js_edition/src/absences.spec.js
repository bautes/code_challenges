import { listAbsences } from "./absences";
import { everyItemContainsKey } from "./api.spec";

describe("listAbsences", () => {
  describe("every absence has key", () => {
    [
      "admitterNote",
      "confirmedAt",
      "createdAt",
      "crewId",
      "endDate",
      "id",
      "memberNote",
      "rejectedAt",
      "startDate",
      "type",
      "userId",
      "member",
    ].forEach((key) => {
      it(key, () => listAbsences().then(everyItemContainsKey(key)));
    });
  });
});

// describe("listAbsenses", async () => {
//   const results = await listAbsences();
//   it("returns an array of arrays", () =>
//     assert(
//       Array.isArray(results) && Array.isArray(results[0])
//     ));

//   it("first item is a valid date string", () =>
//     assert(/^\d\d\d\d\-\d\d\-\d\d$/.test(results[0][0])));

//   it("second item is the absenses list", () =>
//     assert(Array.isArray(results[1]))
//   );

//   it("there is at least 1 name", () =>
//     assert(typeof results[1][0] === "string")
//   );
// });
