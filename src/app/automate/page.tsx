import Link from "next/link";
import {
  ASSET_MANIFEST,
  COMPONENT_HANDOFFS,
  FIGMA_FILE,
  TOKEN_SOURCE,
  type HandoffStatus,
} from "@/lib/figma-handoff";

export const metadata = {
  title: "Figma Handoff — Portfolio | AI Handoff",
  description: "Design-to-code registry for the Portfolio | AI Handoff Figma file.",
};

const STATUS_LABEL: Record<HandoffStatus, string> = {
  implemented: "Implemented",
  stub: "Stub",
  pending: "Pending",
};

const STATUS_CLASS: Record<HandoffStatus, string> = {
  implemented: "text-blue-700",
  stub: "text-zinc-600",
  pending: "text-zinc-400",
};

export default function AutomatePage() {
  const implemented = COMPONENT_HANDOFFS.filter((c) => c.status === "implemented").length;
  const total = COMPONENT_HANDOFFS.length;

  return (
    <div className="canvas-pattern min-h-screen p-canvas">
      <div className="mx-auto flex w-full max-w-[var(--layout-content-width)] flex-col gap-gap-lg">
        <header className="flex flex-col gap-gap-sm border border-border-default bg-surface p-card rounded-3">
          <p className="font-display uppercase text-label-s tracking-caption text-text-muted">
            Figma handoff registry
          </p>
          <h1 className="font-display [font-stretch:expanded] uppercase text-heading-l text-text-primary">
            Portfolio | AI Handoff
          </h1>
          <p className="font-body text-body-m text-text-secondary max-w-prose">
            Maps Figma components from{" "}
            <a
              href={FIGMA_FILE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-link underline [text-underline-position:from-font]"
            >
              the design file
            </a>{" "}
            to their React implementations and Code Connect templates in this repo.
          </p>
          <div className="flex flex-wrap items-center gap-gap-md pt-sm">
            <Link
              href="/"
              className="font-display uppercase text-label-s tracking-caption text-text-link underline [text-underline-position:from-font]"
            >
              View live site →
            </Link>
            <span className="font-helvetica text-label-s text-text-muted">
              {implemented}/{total} components implemented
            </span>
          </div>
        </header>

        <section
          aria-label="Component mappings"
          className="border border-border-default bg-surface rounded-3 overflow-hidden"
        >
          <div className="border-b border-border-default px-card py-sm">
            <h2 className="font-display uppercase text-label-m tracking-caption text-text-primary">
              Components
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-default font-display uppercase text-label-s tracking-caption text-text-muted">
                  <th className="px-card py-sm">Figma</th>
                  <th className="px-card py-sm">Code</th>
                  <th className="px-card py-sm">Code Connect</th>
                  <th className="px-card py-sm">Status</th>
                  <th className="px-card py-sm">Preview</th>
                </tr>
              </thead>
              <tbody>
                {COMPONENT_HANDOFFS.map((row) => (
                  <tr key={row.figmaNodeId} className="border-b border-border-default last:border-0">
                    <td className="px-card py-sm align-top">
                      <p className="font-display uppercase text-label-s text-text-primary">{row.figmaName}</p>
                      <p className="font-helvetica text-caption text-text-muted mt-2xs">{row.figmaNodeId}</p>
                    </td>
                    <td className="px-card py-sm align-top">
                      <code className="font-helvetica text-caption text-text-secondary">{row.codePath}</code>
                    </td>
                    <td className="px-card py-sm align-top">
                      {row.codeConnectPath ? (
                        <code className="font-helvetica text-caption text-text-secondary">
                          {row.codeConnectPath}
                        </code>
                      ) : (
                        <span className="font-helvetica text-caption text-text-muted">—</span>
                      )}
                    </td>
                    <td className={`px-card py-sm align-top font-display uppercase text-label-s ${STATUS_CLASS[row.status]}`}>
                      {STATUS_LABEL[row.status]}
                    </td>
                    <td className="px-card py-sm align-top">
                      {row.localhostPath ? (
                        <Link
                          href={row.localhostPath}
                          className="font-display uppercase text-label-s tracking-caption text-text-link underline [text-underline-position:from-font]"
                        >
                          Open
                        </Link>
                      ) : (
                        <span className="font-helvetica text-caption text-text-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid gap-gap-md tablet:grid-cols-2">
          <section className="border border-border-default bg-surface rounded-3 p-card">
            <h2 className="font-display uppercase text-label-m tracking-caption text-text-primary mb-gap-sm">
              Design tokens
            </h2>
            <code className="font-helvetica text-caption text-text-secondary">{TOKEN_SOURCE}</code>
            <p className="font-body text-body-s text-text-muted mt-gap-sm">
              Typography, spacing, color, and layout modes compiled from Figma variable collections.
            </p>
          </section>

          <section className="border border-border-default bg-surface rounded-3 p-card">
            <h2 className="font-display uppercase text-label-m tracking-caption text-text-primary mb-gap-sm">
              Exported assets
            </h2>
            <ul className="flex flex-col gap-2xs">
              {ASSET_MANIFEST.map((asset) => (
                <li key={asset}>
                  <a
                    href={asset}
                    className="font-helvetica text-caption text-text-link underline [text-underline-position:from-font]"
                  >
                    {asset}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="font-helvetica text-caption text-text-muted pb-section">
          Code Connect publishing requires a Figma Organization or Enterprise plan. Local{" "}
          <code className="text-text-secondary">.figma.ts</code> templates are ready in{" "}
          <code className="text-text-secondary">src/figma/</code> for when publishing is available.
        </p>
      </div>
    </div>
  );
}
