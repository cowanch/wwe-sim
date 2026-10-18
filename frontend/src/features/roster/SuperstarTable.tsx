import DataTable from "../../components/DataTable/DataTable";
import { rosterApi } from "../../api/rosterApi";
import { useFetch } from "../../hooks/useFetch";
import { baseColumns, buildSuperstarTitleColumns } from "./columns/superstarColumns";
import { useMemo } from "react";
import type { Gender } from "../../types";

interface SuperstarTableProps {
  gender: Gender;
}

export default function SuperstarTable({ gender }: SuperstarTableProps) {
  const { data, loading, error } = useFetch(() => rosterApi.getSuperstars({ gender }));

  const columns = useMemo(
    () => [...baseColumns, buildSuperstarTitleColumns(gender)],
    [gender],
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
