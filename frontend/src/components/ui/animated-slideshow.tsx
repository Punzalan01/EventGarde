'use client'

import * as React from 'react'
import { type HTMLMotionProps, MotionConfig, motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface TextStaggerHoverProps {
  text: string
  index: number
}

interface HoverSliderImageProps {
  index: number
  imageUrl: string
}

interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}

function splitText(text: string) {
  const words = text.split(' ').map((word) => word.concat(' '))
  const characters = words.map((word) => word.split('')).flat(1)

  return {
    words,
    characters,
  }
}

const HoverSliderContext = React.createContext<
  HoverSliderContextValue | undefined
>(undefined)

function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)

  if (context === undefined) {
    throw new Error(
      'useHoverSliderContext must be used within a HoverSliderProvider',
    )
  }

  return context
}

export const HoverSlider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0)
  const changeSlide = React.useCallback((index: number) => {
    setActiveSlide(index)
  }, [])

  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </HoverSliderContext.Provider>
  )
})
HoverSlider.displayName = 'HoverSlider'

export const HoverSliderTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { index: number }
>(
  (
    {
      children,
      className,
      disabled,
      index,
      onClick,
      onFocus,
      onMouseEnter,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const { activeSlide, changeSlide } = useHoverSliderContext()
    const isActive = activeSlide === index
    const activateSlide = React.useCallback(() => {
      if (!disabled) {
        changeSlide(index)
      }
    }, [changeSlide, disabled, index])

    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={isActive}
        data-active={isActive}
        disabled={disabled}
        className={cn('text-left', className)}
        onClick={(event) => {
          onClick?.(event)
          activateSlide()
        }}
        onFocus={(event) => {
          onFocus?.(event)
          activateSlide()
        }}
        onMouseEnter={(event) => {
          onMouseEnter?.(event)
          activateSlide()
        }}
        {...props}
      >
        {children}
      </button>
    )
  },
)
HoverSliderTrigger.displayName = 'HoverSliderTrigger'

const WordStaggerHover = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'relative inline-block origin-bottom overflow-hidden',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
})
WordStaggerHover.displayName = 'WordStaggerHover'

export const TextStaggerHover = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & TextStaggerHoverProps
>(
  (
    {
      text,
      index,
      className,
      onFocus,
      onMouseEnter,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const { activeSlide, changeSlide } = useHoverSliderContext()
    const { characters } = React.useMemo(() => splitText(text), [text])
    const isActive = activeSlide === index
    const activateSlide = React.useCallback(() => {
      changeSlide(index)
    }, [changeSlide, index])

    return (
      <span
        ref={ref}
        aria-label={ariaLabel ?? text}
        aria-current={isActive ? 'true' : undefined}
        className={cn(
          'relative inline-block origin-bottom overflow-hidden',
          className,
        )}
        onFocus={(event) => {
          onFocus?.(event)
          activateSlide()
        }}
        onMouseEnter={(event) => {
          onMouseEnter?.(event)
          activateSlide()
        }}
        {...props}
      >
        {characters.map((char, characterIndex) => (
          <WordStaggerHover
            key={`${char}-${characterIndex}`}
            aria-hidden="true"
          >
            <MotionConfig
              transition={{
                delay: characterIndex * 0.025,
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.span
                className="inline-block opacity-20"
                initial={{ y: '0%' }}
                animate={isActive ? { y: '-110%' } : { y: '0%' }}
              >
                {char}
                {char === ' ' && characterIndex < characters.length - 1 && (
                  <>&nbsp;</>
                )}
              </motion.span>

              <motion.span
                className="absolute left-0 top-0 inline-block opacity-100"
                initial={{ y: '110%' }}
                animate={isActive ? { y: '0%' } : { y: '110%' }}
              >
                {char}
              </motion.span>
            </MotionConfig>
          </WordStaggerHover>
        ))}
      </span>
    )
  },
)
TextStaggerHover.displayName = 'TextStaggerHover'

export const clipPathVariants = {
  visible: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  },
  hidden: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
  },
}

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full',
        className,
      )}
      {...props}
    />
  )
})
HoverSliderImageWrap.displayName = 'HoverSliderImageWrap'

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<'img'> & HoverSliderImageProps
>(({ index, imageUrl, className, alt = '', src, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext()

  return (
    <motion.img
      ref={ref}
      src={src ?? imageUrl}
      alt={alt}
      className={cn('inline-block align-middle', className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      initial={activeSlide === index ? 'visible' : 'hidden'}
      animate={activeSlide === index ? 'visible' : 'hidden'}
      {...props}
    />
  )
})
HoverSliderImage.displayName = 'HoverSliderImage'
