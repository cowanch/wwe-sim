import SuperstarTable from "./SuperstarTable";
import TagTeamTable from "./TagTeamTable";

export default function RosterPage() {
  return (
    <>
			<SuperstarTable gender="M" />
			<SuperstarTable gender="F" />
      <TagTeamTable />
    </>
  );
}
