import Fuse from "fuse.js";
import type { CloudService } from "@/types";

export function buildFuseIndex(services: CloudService[]) {
  return new Fuse(services, {
    keys: [
      { name: "name", weight: 0.35 },
      { name: "description", weight: 0.25 },
      { name: "tags", weight: 0.2 },
      { name: "vendor", weight: 0.2 },
    ],
    threshold: 0.4,
    includeScore: true,
    ignoreLocation: true,
  });
}
