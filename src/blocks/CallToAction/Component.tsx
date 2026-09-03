import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container">
      <div className="relative isolate flex flex-col gap-10 overflow-hidden rounded-[1.75rem] bg-[#ff5c35] px-7 py-10 text-black md:flex-row md:items-end md:justify-between md:px-12 md:py-14">
        <div
          aria-hidden
          className="absolute -top-24 -right-16 -z-10 h-72 w-72 rounded-full border-[52px] border-black/10"
        />
        <div className="flex max-w-[52rem] items-center">
          {richText && (
            <RichText
              className="mb-0 [&_h2]:text-4xl [&_h2]:leading-[0.98] [&_h2]:tracking-[-0.05em] [&_h3]:text-4xl [&_h3]:leading-[0.98] [&_h3]:tracking-[-0.05em] [&_p]:mt-5 [&_p]:max-w-2xl [&_p]:leading-7 [&_p]:text-black/70 [&_a]:text-black md:[&_h2]:text-6xl md:[&_h3]:text-6xl"
              data={richText}
              enableGutter={false}
              enableProse={false}
            />
          )}
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          {(links || []).map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                size="lg"
                {...link}
                className="rounded-full border-black bg-black text-white hover:bg-black/85 hover:text-white"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
