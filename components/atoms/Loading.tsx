import clsx from 'clsx'
import Image from 'next/image'
import React, { ReactNode } from 'react'
export interface LoadingProps {
  title?: ReactNode
  className?: string
  mode?: 'default' | 'success' | 'error' | 'mail'
}
const Loading: React.FC<LoadingProps> = ({ title = 'Loading...', mode = 'default', className }) => {
  return (
    <div aria-label="Loading..." role="status" className="flex items-center space-x-2 flex-col">
      {mode === 'default' && (
        <svg
          className={clsx('h-8 w-8 animate-spin', {
            'stroke-[#4BBC91]': 'auto',
            [className as string]: !!className
          })}
          viewBox="0 0 256 256"
        >
          <line
            x1={128}
            y1={32}
            x2={128}
            y2={64}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1="195.9"
            y1="60.1"
            x2="173.3"
            y2="82.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1={224}
            y1={128}
            x2={192}
            y2={128}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1="195.9"
            y1="195.9"
            x2="173.3"
            y2="173.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1={128}
            y1={224}
            x2={128}
            y2={192}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1="60.1"
            y1="195.9"
            x2="82.7"
            y2="173.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1={32}
            y1={128}
            x2={64}
            y2={128}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1="60.1"
            y1="60.1"
            x2="82.7"
            y2="82.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
        </svg>
      )}

      {mode === 'success' && <Image src="/success.gif" alt="success" width={100} height={100} />}
      {mode === 'mail' && <Image src="/send-mail.gif" alt="success" width={100} height={100} />}
      {mode === 'error' && <Image src="/error.gif" alt="success" width={100} height={100} />}

      <div className="text-xs font-semibold  text-black">{title}</div>
    </div>
  )
}

export default Loading
