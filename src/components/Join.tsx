// src/components/Join.tsx
import Section from "./Section";
import { club } from "../data/site";

const steps = [
  {
    cmd: "join --discord",
    out: "Primary channel. Announcements, writeups, and help when you're stuck at 2am.",
  },
  {
    cmd: "register --spartan-connect",
    out: "Makes you an official member for university purposes. Takes about 30 seconds.",
  },
  {
    cmd: "attend --next-meeting",
    out: `${club.meeting.cadence}, ${club.meeting.time}, ${club.meeting.room}. Just show up.`,
  },
];

export default function Join() {
  return (
    <Section
      id="join"
      eyebrow="join"
      title="Three steps, no dues"
      intro="Membership is free and open to every UNCG student regardless of major or experience level."
    >
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* terminal window */}
        <div className="overflow-hidden rounded-xl border border-edge bg-panel-2">
          <div className="flex items-center gap-2 border-b border-edge bg-panel px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
            <span className="ml-2 font-mono text-xs text-muted">
              onboarding.sh
            </span>
          </div>

          <div className="space-y-5 p-5 font-mono text-sm sm:p-6">
            {steps.map((s) => (
              <div key={s.cmd}>
                <p className="text-neutral-100">
                  <span className="text-mint select-none">$ </span>
                  {s.cmd}
                </p>
                <p className="mt-1.5 pl-4 text-xs leading-relaxed text-neutral-400">
                  {s.out}
                </p>
              </div>
            ))}
            <p className="text-neutral-100">
              <span className="text-mint select-none">$ </span>
              <span className="caret" />
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-4">
          <a
            href={club.discord}
            target="_blank"
            rel="noreferrer noopener"
            className="glow-mint rounded-xl bg-mint px-6 py-5 text-center font-mono text-sm font-semibold text-ink transition-colors hover:bg-mint-dim"
          >
            Join the Discord
          </a>
          <a
            href={club.spartanConnect}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-xl border border-edge bg-panel px-6 py-5 text-center font-mono text-sm font-semibold text-neutral-200 transition-colors hover:border-mint/50 hover:text-mint"
          >
            Register on Spartan Connect
          </a>
          <a
            href={`mailto:${club.email}`}
            className="rounded-xl border border-edge bg-panel px-6 py-5 text-center font-mono text-sm font-semibold text-neutral-200 transition-colors hover:border-mint/50 hover:text-mint"
          >
            {club.email}
          </a>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Everything we teach is for authorized, legal testing only. Members
            agree to the club code of conduct and UNCG's acceptable use policy.
          </p>
        </div>
      </div>
    </Section>
  );
}
