"use client";

import { useEffect, type ReactNode } from "react";
import { useCatalogStore } from "@/store/catalog-store";
import type { CatalogData } from "@/types";

export function CatalogProvider({
  data,
  children,
}: {
  data: CatalogData;
  children: ReactNode;
}) {
  const init = useCatalogStore((s) => s.init);

  useEffect(() => {
    init(data);
  }, [data, init]);

  return <>{children}</>;
}
