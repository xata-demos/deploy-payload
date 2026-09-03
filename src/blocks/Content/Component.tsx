import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <section className="container my-20 md:my-32">
      <div className="grid grid-cols-4 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-y-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(
                  `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  'relative border-t border-foreground/20 pt-5',
                  {
                    'md:col-span-2': size !== 'full',
                    'lg:mb-2 lg:grid lg:grid-cols-12 lg:gap-6': size === 'full',
                  },
                )}
                key={index}
              >
                <span className="mb-8 block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#e84a27] lg:mb-10">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {richText && (
                  <RichText
                    className={cn(
                      '[&_h2]:text-4xl [&_h2]:leading-none [&_h2]:tracking-[-0.045em] [&_h3]:text-2xl [&_h3]:leading-tight [&_h3]:tracking-[-0.035em] [&_p]:mt-4 [&_p]:leading-7 [&_p]:text-muted-foreground',
                      {
                        'lg:col-span-9 lg:col-start-4 lg:[&_h2]:text-6xl': size === 'full',
                      },
                    )}
                    data={richText}
                    enableGutter={false}
                    enableProse={false}
                  />
                )}

                {enableLink && (
                  <CMSLink
                    {...link}
                    className="mt-6 inline-flex border-b border-[#ff5c35] pb-1 text-sm font-medium"
                  />
                )}
              </div>
            )
          })}
      </div>
    </section>
  )
}
