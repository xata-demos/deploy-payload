import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'
import { MediaFallback } from '@/components/MediaFallback'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  const hasMedia = media && typeof media === 'object' && Boolean(media.url)
  const caption = hasMedia && typeof media === 'object' ? media.caption : undefined

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {hasMedia || staticImage ? (
        <Media
          className="overflow-hidden rounded-[1.5rem]"
          imgClassName={cn('w-full', imgClassName)}
          resource={media}
          src={staticImage}
        />
      ) : (
        <MediaFallback
          className="aspect-[16/7] w-full rounded-[1.5rem]"
          label="Your next image can live here"
          tone="light"
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
