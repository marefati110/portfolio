import { site, timelineStart, type YM } from "@/content/site";

const toMonths = ([y, m]: YM) => y * 12 + (m - 1);

/**
 * Career chart: one track per company (in its brand color), one segment per role,
 * on a shared time axis so the concurrent Gereft / Ahanonline roles read at a glance.
 */
export function CareerSpan({ now }: { now: YM }) {
  const start = toMonths(timelineStart);
  const total = toMonths(now) + 1 - start;
  const pos = (ym: YM) => ((toMonths(ym) - start) / total) * 100;
  const companies = [...site.experience].reverse();

  return (
    <figure className="span" aria-labelledby="span-caption">
      <div className="span-plot">
        {site.ticks.map((t) => (
          <span key={t.label} className="span-tick" style={{ left: `${pos(t.at)}%` }} aria-hidden="true">
            <span className="span-tick-label">{t.label}</span>
          </span>
        ))}

        {companies.map((c) => (
          <div className="span-track" key={c.id} style={{ "--c": c.color } as React.CSSProperties}>
            <span className="span-track-label" style={{ left: `${pos(c.roles[c.roles.length - 1].start)}%` }}>
              {c.name}
            </span>
            {[...c.roles].reverse().map((r, i) => {
              const from = pos(r.start);
              // End dates are inclusive: a role ending in Feb runs to the start of Mar.
              const to = r.end ? Math.min(pos(r.end) + 100 / total, 100) : 100;
              return (
                <a
                  key={r.title}
                  href={`#${c.id}`}
                  title={`${c.name}: ${r.title}, ${r.dates}`}
                  className={`span-bar${r.end === null ? " is-ongoing" : ""}${i === 0 && c.roles.length > 1 ? " is-earlier" : ""}`}
                  style={{ left: `${from}%`, width: `${to - from}%` }}
                >
                  <span className="span-bar-role">{r.short}</span>
                  <span className="visually-hidden">{` — ${c.name}, ${r.title}, ${r.dates}`}</span>
                </a>
              );
            })}
          </div>
        ))}
      </div>
      <figcaption id="span-caption" className="span-caption">
        {site.hero.spanCaption}
      </figcaption>
    </figure>
  );
}
