import type { ReactNode } from 'react'

export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  tone = 'plain',
  children,
}: {
  id: string
  index: string
  eyebrow: string
  title: string
  intro?: string
  tone?: 'plain' | 'tint'
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 sm:py-24 ${
        tone === 'tint' ? 'bg-bg-2' : 'bg-bg'
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm font-medium text-blue-bright">
            {index}
          </span>
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
            {eyebrow}
          </p>
        </div>
        <h2 className="mt-3 max-w-3xl text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {intro ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {intro}
          </p>
        ) : null}
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  )
}
