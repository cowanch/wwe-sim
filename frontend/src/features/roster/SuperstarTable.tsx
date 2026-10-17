import DataTable from "../../components/DataTable/DataTable";
import { rosterApi } from "../../api/rosterApi";
import { useFetch } from "../../hooks/useFetch";
import { baseColumns } from "./columns/superstarColumns";

interface SuperstarTableProps {
  gender: "M" | "F";
}

export default function SuperstarTable({ gender }: SuperstarTableProps) {
  const { data, loading, error } = useFetch(() => rosterApi.getSuperstars({ gender }));

  if (loading) {
    return <p>Loading roster...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <DataTable
      data={data ?? []}
      columns={baseColumns}
      defaultSorting={[{ id: "name", desc: false }]}
    />
  );
}
