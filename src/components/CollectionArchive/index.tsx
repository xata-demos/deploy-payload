import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  if (!posts?.length) {
    return (
      <div className="container">
        <div className="rounded-[1.5rem] border border-dashed border-foreground/25 px-6 py-20 text-center">
          <p className="text-lg text-muted-foreground">
            The next story is being written. Check back soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-4 gap-x-5 gap-y-14 sm:grid-cols-8 lg:grid-cols-12 lg:gap-x-7 lg:gap-y-20">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="col-span-4" key={index}>
                <Card doc={result} relationTo="posts" showCategories />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
