'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { MediaFallback } from '@/components/MediaFallback'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'publishedAt' | 'title'>

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, publishedAt, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn('group flex h-full flex-col overflow-hidden hover:cursor-pointer', className)}
      ref={card.ref}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
        {metaImage && typeof metaImage !== 'string' ? (
          <Media
            className="absolute inset-0"
            fill
            imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            resource={metaImage}
            size="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <MediaFallback
            className="absolute inset-0 rounded-none transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            label={titleToUse}
            tone="dark"
          />
        )}
        <span className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-background/90 text-foreground backdrop-blur-sm transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight aria-hidden className="h-4 w-4" />
          <span className="sr-only">Read {titleToUse}</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        {showCategories && hasCategories && (
          <div className="mb-3 flex flex-wrap items-center gap-x-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category

                const categoryTitle = titleFromCategory || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <span className="text-[#e84a27]">/</span>}
                  </Fragment>
                )
              }

              return null
            })}
            {publishedAt && (
              <>
                <span className="text-[#e84a27]">/</span>
                <time dateTime={publishedAt}>{dateFormatter.format(new Date(publishedAt))}</time>
              </>
            )}
          </div>
        )}
        {titleToUse && (
          <div>
            <h3 className="text-2xl leading-[1.12] tracking-[-0.035em] md:text-3xl">
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="mt-3 text-sm leading-6 text-muted-foreground">
            <p className="line-clamp-2">{sanitizedDescription}</p>
          </div>
        )}
      </div>
    </article>
  )
}
