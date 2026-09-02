import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { Pagination } from '@/components/Pagination'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export type BlogPostData = Pick<Post, 'categories' | 'meta' | 'publishedAt' | 'slug' | 'title'>

type Props = {
  currentPage?: number
  posts: BlogPostData[]
  totalDocs: number
  totalPages: number
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const getCategory = (post: BlogPostData) => {
  const category = post.categories?.find((item) => typeof item === 'object')

  return typeof category === 'object' ? category.title : 'Field notes'
}

const PostImage: React.FC<{
  className?: string
  post: BlogPostData
  priority?: boolean
  sizes: string
}> = ({ className, post, priority, sizes }) => {
  const image = post.meta?.image

  if (image && typeof image === 'object') {
    return (
      <Media
        className={className}
        fill
        imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        priority={priority}
        resource={image}
        size={sizes}
      />
    )
  }

  return (
    <div
      className={`${className ?? ''} flex items-end bg-[linear-gradient(135deg,#f6f0e7_0%,#f6f0e7_48%,#ff5c35_48%,#ff5c35_52%,#171717_52%,#171717_100%)] p-6`}
    >
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-white">The journal</span>
    </div>
  )
}

const PostMeta: React.FC<{ post: BlogPostData; inverted?: boolean }> = ({ post, inverted }) => (
  <div
    className={`flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] ${
      inverted ? 'text-white/60' : 'text-muted-foreground'
    }`}
  >
    <span>{getCategory(post)}</span>
    {post.publishedAt && (
      <>
        <span aria-hidden className={inverted ? 'text-[#ff6b46]' : 'text-[#e84a27]'}>
          /
        </span>
        <time dateTime={post.publishedAt}>{dateFormatter.format(new Date(post.publishedAt))}</time>
      </>
    )}
  </div>
)

export const BlogArchive: React.FC<Props> = ({ currentPage = 1, posts, totalDocs, totalPages }) => {
  const featuredPost = currentPage === 1 ? posts[0] : undefined
  const latestPosts = featuredPost ? posts.slice(1) : posts

  return (
    <main className="relative isolate overflow-hidden pb-24 pt-10 md:pb-32 md:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_82%_10%,rgba(255,92,53,0.16),transparent_25%),linear-gradient(to_bottom,rgba(120,113,108,0.08),transparent_85%)]"
      />

      <section className="container" aria-labelledby="journal-heading">
        <div className="grid gap-8 border-b border-foreground/15 pb-12 md:grid-cols-12 md:items-end md:gap-6 md:pb-16">
          <div className="md:col-span-8">
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-[#ff5c35]" />
              Ideas in motion
            </p>
            <h1
              className="max-w-5xl text-[clamp(4rem,11vw,9rem)] leading-[0.78] font-medium tracking-[-0.075em]"
              id="journal-heading"
            >
              The
              <br />
              Journal<span className="text-[#ff5c35]">.</span>
            </h1>
          </div>

          <div className="md:col-span-4 md:pb-1">
            <p className="max-w-md text-lg leading-7 text-muted-foreground md:ml-auto">
              Field notes on technology, culture, and the ideas shaping what comes next.
            </p>
            <div className="mt-8 flex items-center justify-between border-t border-foreground/15 pt-4 font-mono text-xs uppercase tracking-[0.16em]">
              <span>Independent thinking</span>
              <span>{String(totalDocs).padStart(2, '0')} stories</span>
            </div>
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="container pt-8 md:pt-12" aria-labelledby="featured-story">
          <Link
            className="group grid min-h-[34rem] overflow-hidden rounded-[1.75rem] bg-[#171717] text-white shadow-[0_24px_70px_-35px_rgba(0,0,0,0.55)] lg:grid-cols-[minmax(0,1.45fr)_minmax(22rem,0.55fr)]"
            href={`/posts/${featuredPost.slug}`}
          >
            <div className="relative min-h-80 overflow-hidden lg:min-h-[38rem]">
              <PostImage
                className="absolute inset-0"
                post={featuredPost}
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-black/15" />
              <span className="absolute top-5 left-5 rounded-full bg-white px-4 py-2 font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-black md:top-7 md:left-7">
                Featured story
              </span>
            </div>

            <div className="flex flex-col justify-between gap-12 p-7 md:p-10 lg:p-12">
              <PostMeta inverted post={featuredPost} />
              <div>
                <h2
                  className="text-4xl leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[3.55rem]"
                  id="featured-story"
                >
                  {featuredPost.title}
                </h2>
                {featuredPost.meta?.description && (
                  <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
                    {featuredPost.meta.description}
                  </p>
                )}
                <span className="mt-10 inline-flex items-center gap-2 border-b border-[#ff6b46] pb-1 text-sm font-medium">
                  Read the story
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="container pt-20 md:pt-28" aria-labelledby="latest-stories">
        <div className="mb-9 flex items-end justify-between gap-6 border-b border-foreground/15 pb-5">
          <div>
            <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#e84a27]">
              Edition {String(currentPage).padStart(2, '0')}
            </p>
            <h2 className="text-3xl tracking-[-0.04em] md:text-5xl" id="latest-stories">
              {currentPage === 1 ? 'Latest stories' : 'More stories'}
            </h2>
          </div>
          <p className="hidden font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground sm:block">
            {totalDocs === 1 ? '1 published story' : `${totalDocs} published stories`}
          </p>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20">
            {latestPosts.map((post, index) => (
              <article className="group" key={post.slug}>
                <Link href={`/posts/${post.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                    <PostImage
                      className="absolute inset-0"
                      post={post}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-background/90 text-foreground backdrop-blur-sm transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight aria-hidden className="h-4 w-4" />
                      <span className="sr-only">Read {post.title}</span>
                    </span>
                    <span className="absolute bottom-4 left-4 font-mono text-xs text-white/80 drop-shadow-md">
                      {String(index + (featuredPost ? 2 : 1)).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="pt-5">
                    <PostMeta post={post} />
                    <h3 className="mt-4 text-2xl leading-[1.12] tracking-[-0.035em] md:text-3xl">
                      {post.title}
                    </h3>
                    {post.meta?.description && (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {post.meta.description}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-foreground/25 px-6 py-20 text-center">
            <p className="text-lg text-muted-foreground">
              The next story is being written. Check back soon.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            className="mt-16 border-t border-foreground/15 pt-8"
            page={currentPage}
            totalPages={totalPages}
          />
        )}
      </section>

      <section className="container pt-20 md:pt-32">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-[#ff5c35] px-7 py-10 text-black md:px-12 md:py-14">
          <div
            aria-hidden
            className="absolute -top-24 -right-16 h-72 w-72 rounded-full border-[52px] border-black/10"
          />
          <div className="relative grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em]">Your turn</p>
              <h2 className="max-w-3xl text-4xl leading-[0.98] tracking-[-0.05em] md:text-6xl">
                Have a story worth sharing?
              </h2>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                className="inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                href="/admin"
              >
                Open the CMS
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
