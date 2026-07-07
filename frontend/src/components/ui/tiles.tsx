"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface TilesProps {
  className?: string
  rows?: number
  cols?: number
  tileClassName?: string
  tileSize?: 'sm' | 'md' | 'lg'
}

const tileSizes = {
  sm: 'size-8',
  md: 'size-9 md:size-12',
  lg: 'size-12 md:size-16',
}

export function Tiles({
  className,
  rows = 100,
  cols = 10,
  tileClassName,
  tileSize = 'md',
}: TilesProps) {
  const rowsArray = new Array(rows).fill(1)
  const colsArray = new Array(cols).fill(1)

  return (
    <div className={cn('relative z-0 flex h-full w-full justify-center', className)}>
      {rowsArray.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className={cn(
            tileSizes[tileSize],
            'relative border-l border-neutral-200 dark:border-neutral-900',
            tileClassName,
          )}
        >
          {colsArray.map((_, j) => (
            <motion.div
              key={`col-${j}`}
              whileHover={{
                backgroundColor: 'var(--tile)',
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              className={cn(
                tileSizes[tileSize],
                'relative border-r border-t border-neutral-200 dark:border-neutral-900',
                tileClassName,
              )}
            />
          ))}
        </motion.div>
      ))}
    </div>
  )
}
