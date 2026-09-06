import type { ReactNode } from 'react'

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-[2.1rem]">
          {title}
        </h2>
        {intro ? (
          <p className="mt-4 max-w-2xl text-ink-soft">{intro}</p>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
