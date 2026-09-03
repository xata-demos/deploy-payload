'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { MediaFallback } from '@/components/MediaFallback'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const hasMedia = media && typeof media === 'object' && Boolean(media.url)

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <section
      className="relative -mt-[10.4rem] overflow-hidden bg-[#141414] pt-[11.5rem] text-white"
      data-theme="dark"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_15%,rgba(255,92,53,0.24),transparent_25%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_55%)]"
      />

      <div className="container relative z-10 pb-10 md:pb-14">
        <div className="mb-8 flex items-center justify-between border-b border-white/15 pb-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/55">
          <span className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#ff5c35]" />
            Independent publishing
          </span>
          <span className="hidden sm:block">Ideas in motion</span>
        </div>

        <div className="grid gap-9 lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.88fr)] lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-between py-2 lg:py-7">
            {richText && (
              <RichText
                className="[&_h1]:mb-7 [&_h1]:max-w-5xl [&_h1]:text-[clamp(3.8rem,8vw,7.75rem)] [&_h1]:leading-[0.84] [&_h1]:font-medium [&_h1]:tracking-[-0.075em] [&_h1]:text-white [&_p]:max-w-2xl [&_p]:text-base [&_p]:leading-7 [&_p]:text-white/65 [&_a]:text-white [&_a]:decoration-[#ff5c35] [&_a]:underline-offset-4 md:[&_p]:text-lg"
                data={richText}
                enableGutter={false}
                enableProse={false}
              />
            )}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-3">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink
                        {...link}
                        className="h-12 rounded-full px-6 transition-transform duration-300 hover:-translate-y-0.5"
                      />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div className="relative aspect-[4/3] min-h-80 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.85)] lg:aspect-[4/5] lg:min-h-[35rem]">
            {hasMedia ? (
              <Media
                fill
                imgClassName="object-cover transition-transform duration-1000 ease-out hover:scale-[1.025]"
                priority
                resource={media}
                size="(max-width: 1024px) 100vw, 42vw"
              />
            ) : (
              <MediaFallback className="absolute inset-0" label={null} />
            )}

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-black/70 to-transparent p-6 pt-24 font-mono text-[0.65rem] uppercase tracking-[0.18em] md:p-8">
              <span>{hasMedia ? 'Featured perspective' : 'No image required'}</span>
              <span className="text-[#ff8a6d]">01 / Home</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container grid gap-px bg-white/15 sm:grid-cols-3">
          {['Stories with substance', 'Built with Payload', 'Designed to evolve'].map(
            (item, index) => (
              <div
                className="flex items-center gap-4 bg-[#141414] py-5 font-mono text-[0.65rem] uppercase tracking-[0.17em] text-white/60 sm:px-5"
                key={item}
              >
                <span className="text-[#ff6b46]">0{index + 1}</span>
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
