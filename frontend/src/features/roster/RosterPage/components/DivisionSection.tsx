import { createSectionTitleColumns } from "./columns/brandColumns";
import type { BrandTitle } from "../../types";
import type { Competitor } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import DataTable from "@/components/DataTable";

interface Props<T extends Competitor> {
  name: string;
  rows: T[];
  baseColumns: ColumnDef<T, any>[];
  brandTitles: BrandTitle[];
}

export default function DivisionSection<T extends Competitor>({
  name,
  rows,
  baseColumns,
  brandTitles,
}: Props<T>) {
  const columns = useMemo<ColumnDef<T, any>[]>(
    () => [...baseColumns, createSectionTitleColumns<T>(brandTitles)],
    [baseColumns, brandTitles]
  );

  return (
    <DataTable
      banner={name}
      data={rows}
      columns={columns}
      sortable={false}
    />
  );
}
