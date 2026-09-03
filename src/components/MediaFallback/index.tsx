import { cn } from '@/utilities/ui'
import React from 'react'

type Props = {
  className?: string
  label?: string | null
  tone?: 'accent' | 'dark' | 'light'
}

const toneClasses = {
  accent: 'bg-[#ff5c35] text-black',
  dark: 'bg-[#171717] text-white',
  light: 'bg-[#f2eadf] text-black',
}

export const MediaFallback: React.FC<Props> = ({
  className,
  label = 'The journal',
  tone = 'accent',
}) => {
  return (
    <div
      aria-hidden
      className={cn(
        'relative isolate min-h-56 overflow-hidden rounded-[inherit]',
        toneClasses[tone],
        className,
      )}
    >
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:2.5rem_2.5rem]" />
      <div className="absolute -right-[14%] -bottom-[42%] aspect-square w-[78%] rounded-full border-[clamp(2.5rem,7vw,6rem)] border-current opacity-15" />
      <div className="absolute top-[16%] right-[12%] h-[18%] w-[18%] rounded-full bg-current opacity-90" />
      {label && (
        <div className="absolute right-[9%] bottom-[13%] left-[9%] flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.22em]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-current" />
          <span className="truncate">{label}</span>
        </div>
      )}
      <span className="absolute top-[9%] left-[8%] text-[clamp(3.5rem,10vw,8rem)] leading-none font-medium tracking-[-0.09em] opacity-90">
        /
      </span>
    </div>
  )
}
