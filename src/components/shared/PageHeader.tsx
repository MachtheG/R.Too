import { Container } from "./Container";

type Props = { eyebrow: string; title: string; intro?: string; children?: React.ReactNode };

export function PageHeader({ eyebrow, title, intro, children }: Props) {
  return (
    <Container className="flex flex-col gap-4 pt-10 md:pt-16">
      <p className="kicker">{eyebrow}</p>
      <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] text-ink dark:text-paper">{title}</h1>
      {intro && <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground dark:text-paper/85">{intro}</p>}
      {children}
      <hr className="mt-4 w-24 border-t-4 border-accent" />
    </Container>
  );
}
