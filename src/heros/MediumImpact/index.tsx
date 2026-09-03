import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { MediaFallback } from '@/components/MediaFallback'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const hasMedia = media && typeof media === 'object' && Boolean(media.url)

  return (
    <section className="overflow-hidden pt-8 md:pt-16">
      <div className="container">
        <div className="grid gap-10 border-b border-foreground/15 pb-10 md:grid-cols-12 md:items-end md:pb-14">
          <div className="md:col-span-8">
            <p className="mb-5 flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-[#ff5c35]" />A considered point of view
            </p>
            {richText && (
              <RichText
                className="[&_h1]:text-[clamp(3.4rem,8vw,7rem)] [&_h1]:leading-[0.88] [&_h1]:tracking-[-0.07em] [&_p]:max-w-2xl [&_p]:text-lg [&_p]:leading-7 [&_p]:text-muted-foreground"
                data={richText}
                enableGutter={false}
                enableProse={false}
              />
            )}
          </div>

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} className="h-11 rounded-full px-5" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="container mt-8 md:mt-12">
        <div className="relative min-h-72 overflow-hidden rounded-[1.5rem] bg-muted md:min-h-[34rem]">
          {hasMedia ? (
            <Media
              className="absolute inset-0"
              fill
              imgClassName="object-cover"
              priority
              resource={media}
              size="100vw"
            />
          ) : (
            <MediaFallback
              className="absolute inset-0"
              label="A canvas for what comes next"
              tone="light"
            />
          )}
        </div>
        {hasMedia && media.caption && (
          <div className="mt-4 max-w-2xl font-mono text-xs text-muted-foreground">
            <RichText data={media.caption} enableGutter={false} />
          </div>
        )}
      </div>
    </section>
  )
}
