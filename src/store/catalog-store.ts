"use client";

import { create } from "zustand";
import type { SaasDepartment } from "@/lib/departments";
import type { PaasProvider } from "@/lib/paas-providers";
import type { SaasSegment } from "@/lib/saas-segments";
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
  toggleDepartment: (department: SaasDepartment) => void;
  togglePaasProvider: (provider: PaasProvider) => void;
  toggleSaasSegment: (segment: SaasSegment) => void;
  clearFilters: () => void;
  setActiveGroup: (slug: string | null) => void;
}

const emptyFilters: ServiceFilters = {
  categories: [],
  tags: [],
  vendors: [],
  departments: [],
  paasProviders: [],
  saasSegments: [],
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
    set((state) => {
      const categories = toggleInList(state.filters.categories, category);
      const saasSelected = categories.includes("SaaS");
      const paasSelected = categories.includes("PaaS");
      return {
        filters: {
          ...state.filters,
          categories,
          departments: saasSelected ? state.filters.departments : [],
          saasSegments: saasSelected ? state.filters.saasSegments : [],
          paasProviders: paasSelected ? state.filters.paasProviders : [],
        },
      };
    }),

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

  toggleDepartment: (department) =>
    set((state) => ({
      filters: {
        ...state.filters,
        departments: toggleInList(state.filters.departments, department),
      },
    })),

  togglePaasProvider: (provider) =>
    set((state) => ({
      filters: {
        ...state.filters,
        paasProviders: toggleInList(state.filters.paasProviders, provider),
      },
    })),

  toggleSaasSegment: (segment) =>
    set((state) => ({
      filters: {
        ...state.filters,
        saasSegments: toggleInList(state.filters.saasSegments, segment),
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
