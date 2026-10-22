import { rosterApi } from "@/api/rosterApi";
import DataTable from "@/components/DataTable";
import { useFetch } from "@/hooks/useFetch";
import type { Gender } from "@/types";
import { baseColumns, buildSuperstarTitleColumns } from "./columns/superstarColumns";
import { useMemo } from "react";

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
