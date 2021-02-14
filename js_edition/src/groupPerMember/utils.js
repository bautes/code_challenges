import { members, absences } from "../api";

const groupPerMember = async () => {
  const allAbsenses = await absences();
  const allMembers = await members();
  return allMembers.map((member) =>
    Object.assign({}, member, {
      absenses: allAbsenses.filter(
        (absense) => absense.userId === member.userId
      ),
    })
  );
};

