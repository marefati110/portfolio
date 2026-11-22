/** Gereft's call-to-supplier AI pipeline, drawn as a flow of steps. */
const steps = [
  { title: "Phone call", detail: "Every call on the company line" },
  { title: "Speech to text", detail: "ElevenLabs" },
  { title: "Search index", detail: "Elasticsearch" },
  { title: "Extract & classify", detail: "OpenAI GPT" },
  { title: "Route to suppliers", detail: "plus automated follow-up" },
];

export function CallPipeline() {
  return (
    <figure className="pipeline" aria-label="AI pipeline from phone call to supplier">
      <ol className="pipeline-steps">
        {steps.map((s, i) => (
          <li key={s.title}>
            <span className="pipeline-num" aria-hidden="true">
              {i + 1}
            </span>
            <strong>{s.title}</strong>
            <span>{s.detail}</span>
          </li>
        ))}
      </ol>
      <figcaption className="pipeline-base">Orchestrated end to end on n8n</figcaption>
    </figure>
  );
}
