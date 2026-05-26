type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  centered?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  lead,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`section-header ${centered ? "section-header--centered" : ""}`}>
      <div className={`eyebrow ${centered ? "eyebrow--centered" : ""}`}>{eyebrow}</div>
      <h2>{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  );
}
