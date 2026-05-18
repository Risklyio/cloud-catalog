"use client";

import { create } from "zustand";
import {
  extractFilterOptions,
  type ServiceFilters,
} from "@/lib/search/filter-services";
import type {
  CatalogData,
  CloudService,
  ServiceCategory,
  ServiceGroup,
} from "@/types";

interface CatalogState {
  services: CloudService[];
  groups: ServiceGroup[];
  allTags: string[];
  allVendors: string[];
  query: string;
  filters: ServiceFilters;
  activeGroupSlug: string | null;
  hydrated: boolean;
  init: (data: CatalogData) => void;
  setQuery: (query: string) => void;
  toggleCategory: (category: ServiceCategory) => void;
  toggleTag: (tag: string) => void;
  toggleVendor: (vendor: string) => void;
  clearFilters: () => void;
  setActiveGroup: (slug: string | null) => void;
}

const emptyFilters: ServiceFilters = {
  categories: [],
  tags: [],
  vendors: [],
};

function toggleInList<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export const useCatalogStore = create<CatalogState>((set) => ({
  services: [],
  groups: [],
  allTags: [],
  allVendors: [],
  query: "",
  filters: emptyFilters,
  activeGroupSlug: null,
  hydrated: false,

  init: (data) => {
    const { tags, vendors } = extractFilterOptions(data.services);
    set({
      services: data.services,
      groups: data.groups,
      allTags: tags,
      allVendors: vendors,
      hydrated: true,
    });
  },

  setQuery: (query) => set({ query }),

  toggleCategory: (category) =>
    set((state) => ({
      filters: {
        ...state.filters,
        categories: toggleInList(state.filters.categories, category),
      },
    })),

  toggleTag: (tag) =>
    set((state) => ({
      filters: {
        ...state.filters,
        tags: toggleInList(state.filters.tags, tag),
      },
    })),

  toggleVendor: (vendor) =>
    set((state) => ({
      filters: {
        ...state.filters,
        vendors: toggleInList(state.filters.vendors, vendor),
      },
    })),

  clearFilters: () =>
    set({
      filters: emptyFilters,
      activeGroupSlug: null,
      query: "",
    }),

  setActiveGroup: (slug) =>
    set({
      activeGroupSlug: slug,
      query: "",
      filters: emptyFilters,
    }),

}));
