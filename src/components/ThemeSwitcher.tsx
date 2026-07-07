export type PreviewTheme = "terracotta" | "indigo";

/** Home-only preview control to compare palette directions. Remove before final rollout. */
export default function ThemeSwitcher({ value, onChange }: { value: PreviewTheme; onChange: (t: PreviewTheme) => void }) {
  return (
    <div className="theme-switch" role="group" aria-label="Preview palette">
      <button type="button" className={`warm${value === "terracotta" ? " on" : ""}`} onClick={() => onChange("terracotta")}>
        <span className="dot" style={{ background: "#B5623C" }} />Warm
      </button>
      <button type="button" className={`indigo${value === "indigo" ? " on" : ""}`} onClick={() => onChange("indigo")}>
        <span className="dot" style={{ background: "#1C2740" }} />Indigo
      </button>
    </div>
  );
}
