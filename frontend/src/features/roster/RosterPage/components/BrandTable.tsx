import { rosterApi } from "@/api/rosterApi";
import { useFetch } from "@/hooks/useFetch";
import type { Brand } from "@/types";
import { useMemo } from "react";
import { RAW_SECTIONS } from "../../sections";
import DivisionSection from "./DivisionSection";
import { getBaseColumns } from "./columns/brandColumns";

interface BrandTableProps {
  brand: Brand;
}

export default function BrandTable({ brand }: BrandTableProps) {
  const { data, loading, error } = useFetch(() => rosterApi.getSuperstars({ gender: "M" }));

  const rows = useMemo(
    () => data?.slice(0, 6),
    [data],
  );

  if (loading) {
    return <p>Loading roster...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <div className="division-sections">
      {RAW_SECTIONS.map((s) => (
        <DivisionSection
          key={s.id}
          name={s.name}
          rows={rows || []}
          baseColumns={getBaseColumns()}
          brandTitles={s.brandTitles}
        />
      ))}
    </div>
  );
}
