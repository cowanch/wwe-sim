import DataTable from "../../components/DataTable/DataTable";
import { rosterApi } from "../../api/rosterApi";
import { useFetch } from "../../hooks/useFetch";
import { baseColumns, buildTitleColumns } from "./columns/superstarColumns";
import { useMemo } from "react";
import type { Championship } from "../../types";

interface SuperstarTableProps {
  gender: "M" | "F";
}

export default function SuperstarTable({ gender }: SuperstarTableProps) {
  const { data, loading, error } = useFetch(() => rosterApi.getSuperstars({ gender }));

  const columns = useMemo(
    () => {
      // TODO: replace this with a call to get championships for a division from server
      const championships: Championship[] = gender === "M"
        ? [
          { id: "wwe", name: "WWE Championship" },
          { id: "universal", name: "Universal Championship" },
          { id: "nxt", name: "NXT Championship" },
          { id: "intercontinental", name: "Intercontinental Championship" },
          { id: "unitedStates", name: "United States Championship" },
        ]
        : [
          { id: "rawWomens", name: "RAW Women's Championship" },
          { id: "smackdownWomens", name: "SmackDown Women's Championship" },
          { id: "nxtWomens", name: "NXT Women's Championship" },
        ];
      return [...baseColumns, buildTitleColumns(championships)];
    }, [gender]
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
