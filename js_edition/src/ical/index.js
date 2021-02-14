import * as ics from "ics";

const makeSummary = (member, reason, note) => {
  const mappedReasons = {
    'sickness': 'sick',
    'vacation': 'on vacations'
  }
  return`${member.name} is ${mappedReasons[reason] || reason} ${note ? '('+note+')' : ''}`;
};


// const toZuluTime = (d /*: Date */) => {
//   const date = new Date(d);
//   date.setHours(0, -date.getTimezoneOffset(), 0, 0); //removing the timezone offset.
//   return date.toISOString().replace(/(\-|\:|\..*)/g, "") + "Z";
// };

// const generateEvent = ({ start, end, summary, nameTo, mailTo }) => `BEGIN:VEVENT
// UID:${Date.now()}
// DTSTAMP:${toZuluTime(new Date())}
// ORGANIZER;CN=${nameTo}:MAILTO:${mailTo}
// DTSTART:${toZuluTime(start)}
// DTEND:${toZuluTime(end)}
// SUMMARY:${summary}
// GEO:48.85299;2.36885
// END:VEVENT`;

// export const generateICal = (events) => `BEGIN:VCALENDAR
// VERSION:2.0
// PRODID:-//hacksw/handcal//NONSGML v1.0//EN
// ${events.map(generateEvent).join('')}
// END:VCALENDAR`;

// export const fromListedAbsenses = (listedAbsences) => {
//   return generateICal(listedAbsences.map(absense => ({
//     start: new Date(absense.startDate),
//     end: new Date(absense.endDate),
//     summary: makeSummary(absense.member, absense.type, absense.memberNote),
//     nameTo: absense.member.name,
//     mailTo: absense.member.name + "@mycompany.com"
//   })));
// }

export const createCalendar = (listedAbsences) => {
  const events = listedAbsences.map(absense =>({
    productId:"absencesCalendar",
    uid: "123"+"@ics.com",
    startOutputType:"local",
    start: absense.startDate.split('-'),
    end: absense.endDate.split('-'),
    title: makeSummary(absense.member, absense.type, absense.memberNote),
  }));

  const { default: def, createEvents } = ics;
  const fnCall = def ? def.createEvents : createEvents;
  const { error, value } = fnCall(events);
  if (error) console.error(error);
  return error ? null : value;
}
