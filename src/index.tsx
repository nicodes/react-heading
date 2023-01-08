import React, { useRef, useState, useEffect, HTMLAttributes } from 'react'

/** Subset of `JSX.InstrinsecElements` for only heading elements */
type HeadingIntrinsicElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/** Find the number of `<h1>, ..., <h6>` elements in the DOM above by recursing through all parents and grandparent's children "uncles" */
function findH({ parentElement }: HTMLElement, n: number): number {
  if (!parentElement || n === 6)
    return n

  for (const e of Array(parentElement.children))
    if (e[0] instanceof HTMLHeadingElement)
      return findH(parentElement, ++n)

  return findH(parentElement, n)
}

/** Smart headings for React */
export default function H({ children, ...props }: HTMLAttributes<HTMLHeadingElement>): JSX.Element {
  const ref = useRef<HTMLHeadingElement>(null)
  const [E, setE] = useState<HeadingIntrinsicElements>('h1')

  useEffect(() => {
    const parentElement = ref.current?.parentElement
    const n = parentElement ? findH(parentElement, 1) : 1

    if (n === 2 || n === 3 || n === 4 || n === 5 || n === 6)
      setE(`h${n}`)
  }, [])

  return <E ref={ref} {...props}>{children}</E>
}
