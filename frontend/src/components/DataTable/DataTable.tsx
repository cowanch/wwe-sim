import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type SortingState
} from "@tanstack/react-table";
import { useState } from "react";
import "./DataTable.scss";

interface DataTableProps<T> {
	data: T[];
	columns: ColumnDef<T, any>[];
}

export default function DataTable<T>({ data, columns }: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<T>({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const headerGroups = table.getHeaderGroups();
  
  return (
    <table className="data-table">
      <thead>
        {headerGroups.map((headerGroup, rowIndex) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const column = header.column;

              // Standalone = not inside a group and has no sub-columns (Name, Overall, Rank)
              const isStandalone = !column.parent && column.columns.length === 0;

              // Standalone columns show up in every header row; render only the top one
              if (isStandalone && rowIndex > 0) {
                return null;
              }

              // Group headers ("Total", "PPV") and any other placeholders aren't sortable
              const canSort = column.getCanSort();

              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  rowSpan={isStandalone ? headerGroups.length : 1}
                  className={canSort ? "sortable" : undefined}
                  onClick={canSort ? column.getToggleSortingHandler() : undefined}
                >
                  {header.isPlaceholder && !isStandalone
                    ? null
                    : flexRender(column.columnDef.header, header.getContext())}
                  {canSort && 
                    ({ asc: " 🔼", desc: " 🔽" }[column.getIsSorted() as string] ?? "")}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table> 
  );
}
