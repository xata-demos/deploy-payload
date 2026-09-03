import type { Metadata } from 'next/types'

import { BlogArchive } from '@/components/BlogArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  return (
    <>
      <PageClient />
      <BlogArchive
        currentPage={posts.page}
        posts={posts.docs}
        totalDocs={posts.totalDocs}
        totalPages={posts.totalPages}
      />
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    description: 'Field notes on technology, culture, and the ideas shaping what comes next.',
    title: 'The Journal | Payload Website Template',
  }
}
