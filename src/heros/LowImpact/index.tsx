import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <section className="container mt-8 md:mt-16">
      <div className="grid gap-8 border-b border-foreground/15 pb-12 md:grid-cols-12 md:pb-16">
        <div className="md:col-span-2">
          <p className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-[#ff5c35]" />
            Page
          </p>
        </div>
        <div className="md:col-span-9 md:col-start-4">
          {children ||
            (richText && (
              <RichText
                className="[&_h1]:text-[clamp(3.25rem,7vw,6.5rem)] [&_h1]:leading-[0.9] [&_h1]:tracking-[-0.065em] [&_p]:mt-7 [&_p]:max-w-2xl [&_p]:text-lg [&_p]:leading-8 [&_p]:text-muted-foreground"
                data={richText}
                enableGutter={false}
                enableProse={false}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
