import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <section className="my-20 md:my-32" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-9">
          <div className="flex items-end justify-between gap-6 border-b border-foreground/15 pb-5">
            <RichText
              className="ms-0 max-w-[50rem] [&_h2]:text-3xl [&_h2]:tracking-[-0.04em] [&_h3]:text-3xl [&_h3]:tracking-[-0.04em] [&_p]:mt-3 [&_p]:max-w-2xl [&_p]:text-sm [&_p]:leading-6 [&_p]:text-muted-foreground md:[&_h2]:text-5xl md:[&_h3]:text-5xl"
              data={introContent}
              enableGutter={false}
              enableProse={false}
            />
            <Link
              className="group hidden shrink-0 items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] sm:flex"
              href="/posts"
            >
              View the journal
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      )}
      <CollectionArchive posts={posts} />
    </section>
  )
}
