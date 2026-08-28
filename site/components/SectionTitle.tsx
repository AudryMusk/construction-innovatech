type SectionTitleProps = {
  before?: string;
  highlight: string;
  align?: "center" | "left";
};

export function SectionTitle({ before, highlight, align = "center" }: SectionTitleProps) {
  return (
    <h2 className={`section-title section-title-${align}`}>
      {before && <span>{before}</span>}{" "}
      <mark>{highlight}</mark>
    </h2>
  );
}
