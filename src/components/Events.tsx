// src/components/Events.tsx
import { useMemo } from "react";
import Section from "./Section";
import { events } from "../data/site";
import {
  dateParts,
  formatEventTime,
  kindStyles,
  partitionEvents,
} from "../lib/format";
import type { ClubEvent } from "../types";

function EventRow({ event, past = false }: { event: ClubEvent; past?: boolean }) {
  const { month, day } = dateParts(event.start);
  const kind = kindStyles[event.kind];

  return (
    <article
      className={[
        "flex gap-5 rounded-xl border border-edge bg-panel p-5 transition-colors sm:p-6",
        past ? "opacity-55" : "hover:border-mint/40",
      ].join(" ")}
    >
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg border border-edge bg-panel-2">
        <span className="font-mono text-[11px] tracking-widest text-mint">
          {month}
        </span>
        <span className="font-mono text-xl leading-tight font-bold text-white">
          {day}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-white sm:text-lg">
            {event.title}
          </h3>
          <span
            className={`rounded border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase ${kind.className}`}
          >
            {kind.label}
          </span>
        </div>

        <p className="mt-1 font-mono text-xs text-muted">
          {formatEventTime(event.start)} · {event.location}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          {event.blurb}
        </p>

        {event.link && !past && (
          <a
            href={event.link}
            className="mt-3 inline-block font-mono text-xs text-mint hover:underline"
          >
            Sign up →
          </a>
        )}
      </div>
    </article>
  );
}

export default function Events() {
  const { upcoming, past } = useMemo(() => partitionEvents(events), []);

  return (
    <Section
      id="events"
      eyebrow="events"
      title="Upcoming schedule"
      intro="Meetings are open to everyone — members, non-members, and people who just wandered in for the pizza."
      tinted
    >
      <p className="mb-6 rounded-xl border border-dashed border-edge bg-panel/60 px-4 py-3 font-mono text-xs leading-relaxed text-muted">
        <span className="text-gold">⚠ tentative —</span> we're still working
        out which security topics to cover and in what order. Dates and
        topics below will shift; confirmed sessions go out on Discord first.
      </p>

      {upcoming.length > 0 ? (
        <div className="grid gap-4">
          {upcoming.map((e) => (
            <EventRow key={e.id} event={e} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-edge bg-panel p-10 text-center">
          <p className="font-mono text-sm text-muted">
            No events scheduled right now — check Discord for the next
            announcement.
          </p>
        </div>
      )}

      {past.length > 0 && (
        <details className="mt-8 group">
          <summary className="cursor-pointer font-mono text-xs text-muted hover:text-mint">
            <span className="select-none">▸ </span>
            Past events ({past.length})
          </summary>
          <div className="mt-4 grid gap-4">
            {past.map((e) => (
              <EventRow key={e.id} event={e} past />
            ))}
          </div>
        </details>
      )}
    </Section>
  );
}
