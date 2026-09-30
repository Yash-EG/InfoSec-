// src/lib/format.ts
import type { ClubEvent, EventKind } from "../types";

const TZ = "America/New_York";

export function formatEventDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: TZ,
  });
}

export function formatEventTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TZ,
  });
}

/** Short stacked badge, e.g. { month: "SEP", day: "24" } */
export function dateParts(iso: string): { month: string; day: string } {
  const d = new Date(iso);
  return {
    month: d
      .toLocaleDateString("en-US", { month: "short", timeZone: TZ })
      .toUpperCase(),
    day: d.toLocaleDateString("en-US", { day: "numeric", timeZone: TZ }),
  };
}

export const kindStyles: Record<EventKind, { label: string; className: string }> =
  {
    meeting: {
      label: "meeting",
      className: "border-edge text-muted",
    },
    workshop: {
      label: "workshop",
      className: "border-mint/40 text-mint bg-mint/5",
    },
    ctf: {
      label: "ctf",
      className: "border-gold/40 text-gold bg-gold/5",
    },
    social: {
      label: "social",
      className: "border-cyan/40 text-cyan bg-cyan/5",
    },
    speaker: {
      label: "speaker",
      className: "border-violet-400/40 text-violet-300 bg-violet-400/5",
    },
  };

/** Splits events into upcoming (ascending) and past (descending). */
export function partitionEvents(events: ClubEvent[], now: Date = new Date()) {
  const upcoming: ClubEvent[] = [];
  const past: ClubEvent[] = [];

  for (const e of events) {
    (new Date(e.start) >= now ? upcoming : past).push(e);
  }

  upcoming.sort((a, b) => +new Date(a.start) - +new Date(b.start));
  past.sort((a, b) => +new Date(b.start) - +new Date(a.start));

  return { upcoming, past };
}
