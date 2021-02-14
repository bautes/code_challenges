/*
  interface AbsenseType extends AbsensesModel {
    member: MemberModel
  }
*/
export const groupPerAbsense = (allAbsenses, allMembers) /*: AbsenseType[] */ => {
  return allAbsenses.map((absense) =>
    Object.assign({}, absense, {
      member: allMembers.find((member) => member.userId === absense.userId),
    })
  );
};

const findFirstAndLastAbsence = (
  absences /*: AbsenseType []; */
) /*: [AbsenseType, AbsenseType] */ => {
  const sortFn = (field) => (absA, absB) =>
    absA[field] > absB[field] ? 1 : -1;
  const sortedStarts = absences.sort(sortFn("startDate"));
  const sortedEnds = absences.sort(sortFn("endDate"));
  return [sortedStarts[0], sortedEnds[sortedEnds.length - 1]];
};

export const getAllPerDay = (
  absences /* : AbsenseType[] */
) /* : { [isoDate]: AbsenseType[] } */ => {
  const [first, last] = findFirstAndLastAbsence(absences);
  const date = new Date(first.startDate);
  let isoDate;
  let absensesFound;
  let accummulator = {};
  const now = Date.now();
  do {
    isoDate = date.toISOString().split("T")[0];
    absensesFound = absences.filter(
      (abs) => abs.startDate <= isoDate && abs.endDate >= isoDate
    );

    if (absensesFound && absensesFound.length)
      accummulator = Object.assign({}, accummulator, {
        [isoDate]: absensesFound,
      });
    date.setDate(date.getDate() + 1);
    if (Date.now() - now > 300000) break; //safe break by timeout.
  } while (isoDate < last.endDate);

  return accummulator;
};
