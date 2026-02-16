"use client"

import { AnimatedText } from "./animated-text"

interface HeroHeadingProps {
  children: string
  className?: string
  id?: string
  splitBy?: "chars" | "words"
  delay?: number
}

export function HeroHeading({
  children,
  className = "text-5xl md:text-6xl font-bold",
  id,
  splitBy = "words",
  delay = 0,
}: HeroHeadingProps) {
  return (
    <div id={id}>
      <AnimatedText
        as="h1"
        splitBy={splitBy}
        delay={delay}
        className={className}
      >
        {children}
      </AnimatedText>
    </div>
  )
}
