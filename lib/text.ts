/** Split "a, b (c, d), e" on top-level commas only. */
export function splitList(text: string) {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of text) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if ((ch === "," || ch === ";") && depth === 0) {
      out.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/** "Open source · Go, PostgreSQL" -> ["Open source", "Go", "PostgreSQL"] */
export const metaChips = (meta: string) => meta.split(" · ").flatMap(splitList);
