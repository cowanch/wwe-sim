import DataTable from "../../components/DataTable/DataTable";
import { rosterApi } from "../../api/rosterApi";
import { useFetch } from "../../hooks/useFetch";
import { baseColumns, buildTagTeamTitleColumns } from "./columns/tagTeamColumns";
import { useMemo } from "react";

export default function TagTeamTable() {
  const { data, loading, error } = useFetch(() => rosterApi.getTagTeams());

  const columns = useMemo(
    () => [...baseColumns, buildTagTeamTitleColumns()],
    []
  );

  if (loading) {
    return <p>Loading roster...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <DataTable
      data={data ?? []}
      columns={columns}
      defaultSorting={[{ id: "name", desc: false }]}
    />
  );
}
