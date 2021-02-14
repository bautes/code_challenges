import { members, absences } from './api.js';
import { groupPerAbsense } from "./groupPerAbsense/index.js";

export const listAbsences = async () => {
  const allAbsenses = await absences();
  const allMembers = await members();
  return groupPerAbsense(allAbsenses, allMembers);
};
