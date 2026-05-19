"use client";

import { useState } from "react";

type ServiceModelId = "saas" | "paas" | "iaas" | "ai";

type FrameworkId =
  | "nist"
  | "csa"
  | "fedramp"
  | "iso"
  | "ncsc-caf"
  | "cyber-essentials"
  | "enisa"
  | "soc2";

const SERVICE_MODELS: {
  id: ServiceModelId;
  label: string;
  short: string;
  definition: string;
  ring: string;
  surface: string;
  text: string;
}[] = [
  {
    id: "saas",
    label: "Software as a Service (SaaS)",
    short: "SaaS",
    definition:
      "Applications delivered over the internet and consumed by users. The provider manages the application, runtime, middleware, operating system, virtualization, servers, storage, and networking. You typically configure settings and manage your data.",
    ring: "ring-violet-400/60",
    surface: "bg-violet-50/90 border-violet-200",
    text: "text-violet-900",
  },
  {
    id: "paas",
    label: "Platform as a Service (PaaS)",
    short: "PaaS",
    definition:
      "A platform for building, deploying, and running applications without managing the underlying infrastructure. The provider manages runtime, middleware, OS, virtualization, servers, storage, and networking; you manage applications and data.",
    ring: "ring-sky-400/60",
    surface: "bg-sky-50/90 border-sky-200",
    text: "text-sky-900",
  },
  {
    id: "iaas",
    label: "Infrastructure as a Service (IaaS)",
    short: "IaaS",
    definition:
      "Fundamental compute, storage, and network resources provisioned on demand. You manage operating systems, applications, middleware, and data; the provider manages physical infrastructure and virtualization.",
    ring: "ring-amber-400/60",
    surface: "bg-amber-50/90 border-amber-200",
    text: "text-amber-900",
  },
  {
    id: "ai",
    label: "Artificial Intelligence (AI) services",
    short: "AI",
    definition:
      "Cloud-hosted machine learning, generative AI, and model APIs—often built on PaaS or SaaS delivery models. Providers supply models, inference, training infrastructure, or AI-enabled applications; customers supply data, prompts, and integration logic.",
    ring: "ring-fuchsia-400/60",
    surface: "bg-fuchsia-50/90 border-fuchsia-200",
    text: "text-fuchsia-900",
  },
];

const FRAMEWORKS: {
  id: FrameworkId;
  label: string;
  source: string;
  definition: string;
  nistNote: string;
}[] = [
  {
    id: "nist",
    label: "NIST",
    source: "SP 800-145",
    definition:
      "Cloud computing is a model for enabling on-demand network access to a shared pool of configurable computing resources (e.g. servers, storage, applications) that can be rapidly provisioned and released with minimal management effort or service provider interaction.",
    nistNote:
      "NIST SP 800-145 is the reference definition used across industry and government. Most frameworks below echo or extend this model rather than replacing it.",
  },
  {
    id: "csa",
    label: "CSA",
    source: "Cloud Security Alliance",
    definition:
      "The Cloud Security Alliance defines cloud computing very closely aligned to NIST: a shared, provider-managed service delivered on demand, with clearly split security responsibilities between provider and customer.",
    nistNote: "Explicitly aligned with NIST; adds emphasis on shared responsibility for security.",
  },
  {
    id: "fedramp",
    label: "FedRAMP",
    source: "US Government",
    definition:
      "Any NIST-defined cloud offering used by US federal government systems, assessed and authorized for government use.",
    nistNote: "Adopts NIST cloud definitions as the baseline for authorization of government cloud services.",
  },
  {
    id: "iso",
    label: "ISO 27001 / ISO 27017 / ISO 17788",
    source: "International standards",
    definition:
      "ISO/IEC 27001 itself does not define cloud services explicitly. Related standards—such as ISO/IEC 17788 (cloud computing vocabulary and overview) and ISO/IEC 27017 (cloud security controls)—align closely with the NIST service and deployment models.",
    nistNote: "ISO/IEC 17788 vocabulary maps to NIST-style IaaS, PaaS, and SaaS concepts.",
  },
  {
    id: "ncsc-caf",
    label: "NCSC CAF",
    source: "Cyber Assessment Framework",
    definition:
      "The CAF does not formally define cloud services, but treats them as: (1) external or internally hosted services supporting essential functions, and (2) part of the supply chain and system architecture.",
    nistNote: "Operational and assurance framing rather than a technical definition; compatible with NIST when scoping cloud risk.",
  },
  {
    id: "cyber-essentials",
    label: "Cyber Essentials",
    source: "UK NCSC scheme",
    definition:
      "A cloud service is any on-demand, scalable service hosted on shared infrastructure and accessed via the internet, typically storing or processing organisational data.",
    nistNote: "Practical, organisation-focused wording consistent with NIST on-demand and shared-resource themes.",
  },
  {
    id: "enisa",
    label: "ENISA",
    source: "EU Agency for Cybersecurity",
    definition:
      "An outsourced, scalable computing service introducing shared risk and dependency between provider and customer.",
    nistNote: "Risk- and dependency-oriented summary that complements NIST’s resource-pool model.",
  },
  {
    id: "soc2",
    label: "SOC 2",
    source: "AICPA trust services",
    definition:
      "Any hosted service delivering systems or data to customers over the internet, evaluated against security, availability, and related trust criteria.",
    nistNote: "Assurance lens on hosted services; auditors often map scope to NIST-style cloud categories.",
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-stone-400 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CloudDefinitionsExplorer() {
  const [activeModel, setActiveModel] = useState<ServiceModelId | null>("saas");
  const [openFramework, setOpenFramework] = useState<FrameworkId | null>("nist");

  const toggleFramework = (id: FrameworkId) => {
    setOpenFramework((current) => (current === id ? null : id));
  };

  return (
    <div className="max-w-3xl space-y-12">
      <section aria-labelledby="service-models-heading">
        <h2
          id="service-models-heading"
          className="text-xl font-semibold tracking-tight text-stone-900"
        >
          Service models in this catalog
        </h2>
        <p className="mt-2 text-stone-600">
          Cloudiscover.io organises offerings by how much of the stack the provider
          manages. These models follow the same layering described in NIST SP 800-145
          and reflected across ISO, CSA, and government frameworks.
        </p>

        <ul className="mt-6 space-y-3">
          {SERVICE_MODELS.map((model) => {
            const isOpen = activeModel === model.id;
            return (
              <li key={model.id}>
                <button
                  type="button"
                  onClick={() =>
                    setActiveModel((current) =>
                      current === model.id ? null : model.id,
                    )
                  }
                  aria-expanded={isOpen}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
                    isOpen
                      ? `ring-2 ring-offset-2 ${model.ring} ${model.surface} ${model.text}`
                      : "border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  <span className="font-semibold">{model.short}</span>
                  <span className="hidden text-sm font-normal text-stone-500 sm:inline">
                    {model.label.replace(` (${model.short})`, "")}
                  </span>
                  <Chevron open={isOpen} />
                </button>
                {isOpen && (
                  <div
                    className={`mt-2 rounded-xl border px-4 py-4 text-sm leading-relaxed ${model.surface} ${model.text}`}
                  >
                    <p className="font-medium">{model.label}</p>
                    <p className="mt-2 opacity-90">{model.definition}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="nist-foundation-heading">
        <h2
          id="nist-foundation-heading"
          className="text-xl font-semibold tracking-tight text-stone-900"
        >
          How frameworks define cloud computing
        </h2>
        <p className="mt-2 text-stone-600">
          Most security and compliance frameworks do not invent a separate notion of
          “the cloud.” They adopt or map to{" "}
          <strong className="font-semibold text-stone-800">
            NIST SP 800-145
          </strong>{" "}
          as the underpinning definition—then add sector-specific controls, shared
          responsibility, or assurance requirements. Select a framework below to
          compare wording and how it relates to NIST.
        </p>

        <ul className="mt-6 space-y-3">
          {FRAMEWORKS.map((fw) => {
            const isOpen = openFramework === fw.id;
            const isNist = fw.id === "nist";

            const panel = (
              <div className="px-4 pb-4 pt-1 text-sm leading-relaxed text-stone-700">
                <p>{fw.definition}</p>
                <p className="mt-3 rounded-lg bg-stone-50 px-3 py-2.5 text-stone-600">
                  <span className="font-medium text-[#6557ff]">
                    {isNist ? "Foundation" : "NIST alignment"}:{" "}
                  </span>
                  {fw.nistNote}
                </p>
              </div>
            );

            if (isOpen) {
              return (
                <li
                  key={fw.id}
                  className="brand-gradient-border brand-gradient-border--active rounded-2xl"
                >
                  <button
                    type="button"
                    onClick={() => toggleFramework(fw.id)}
                    aria-expanded
                    className="flex w-full items-center justify-between gap-3 rounded-[calc(1rem-2px)] bg-white px-4 py-3.5 text-left"
                  >
                    <span>
                      <span className="font-semibold text-stone-900">
                        {fw.label}
                      </span>
                      <span className="mt-0.5 block text-xs font-medium text-[#6557ff]">
                        {fw.source}
                      </span>
                    </span>
                    <Chevron open />
                  </button>
                  {panel}
                </li>
              );
            }

            return (
              <li key={fw.id}>
                <button
                  type="button"
                  onClick={() => toggleFramework(fw.id)}
                  aria-expanded={false}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-left transition hover:border-stone-300 hover:bg-stone-50"
                >
                  <span>
                    <span className="font-semibold text-stone-900">{fw.label}</span>
                    <span className="mt-0.5 block text-xs font-medium text-stone-500">
                      {fw.source}
                    </span>
                  </span>
                  <Chevron open={false} />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
