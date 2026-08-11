'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Drives a `.pr-ladder` / `.pr-row` scroll-snap carousel.
 *
 * Below `md` these rows scroll sideways; above it they are a grid and every
 * hook here goes quiet. Two things it guarantees:
 *
 * 1. The row *opens* on the tier the page recommends, not on the cheapest
 *    one. A phone that lands on Launchpad reads the page as a cheap-website
 *    page.
 * 2. It moves the ROW's own scroll offset only — never `scrollIntoView`,
 *    which would drag the whole page down to the carousel on mount.
 */
export function useSnapRow(defaultIndex: number) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(defaultIndex)
  const [isCarousel, setIsCarousel] = useState(false)

  const setItemRef = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      itemRefs.current[index] = node
    },
    []
  )

  const scrollToIndex = useCallback((index: number, smooth: boolean) => {
    const scroller = scrollerRef.current
    const item = itemRefs.current[index]
    if (!scroller || !item) return false
    // Nothing to scroll once the row is a grid.
    if (scroller.scrollWidth <= scroller.clientWidth + 1) return false

    const scrollerBox = scroller.getBoundingClientRect()
    const itemBox = item.getBoundingClientRect()
    const delta =
      itemBox.left - scrollerBox.left - (scrollerBox.width - itemBox.width) / 2

    scroller.scrollTo({
      left: scroller.scrollLeft + delta,
      behavior: smooth ? 'smooth' : 'auto',
    })
    return true
  }, [])

  useEffect(() => {
    setIsCarousel(scrollToIndex(defaultIndex, false))
  }, [scrollToIndex, defaultIndex])

  // Keep `active` truthful as the visitor swipes.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const box = scroller.getBoundingClientRect()
        const centre = box.left + box.width / 2
        let nearest = 0
        let best = Infinity
        itemRefs.current.forEach((item, index) => {
          if (!item) return
          const itemBox = item.getBoundingClientRect()
          const distance = Math.abs(itemBox.left + itemBox.width / 2 - centre)
          if (distance < best) {
            best = distance
            nearest = index
          }
        })
        setActive(nearest)
        setIsCarousel(scroller.scrollWidth > scroller.clientWidth + 1)
      })
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { scrollerRef, setItemRef, active, isCarousel, scrollToIndex }
}
