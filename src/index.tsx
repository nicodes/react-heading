import React, { useRef, useState, useEffect, HTMLAttributes, useCallback } from 'react'

/** Subset of `JSX.InstrinsecElements` for only heading elements */
type HeadingIntrinsicElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/** Numeric degrees for headings */
type HeadingDegrees = 1 | 2 | 3 | 4 | 5 | 6;

type Props = { min?: HeadingDegrees, max?: HeadingDegrees } & HTMLAttributes<HTMLHeadingElement>

/** Smart headings for React */
export default function H({ min = 1, max = 6, children, ...props }: Props): JSX.Element {
  if (max < min) console.error('`react-heading` invalid props: must meet requirement `min` <= `max`')
  const ref = useRef<HTMLHeadingElement>(null)
  const [E, setE] = useState<HeadingIntrinsicElements>(`h${min}`)

  /** Find the number of `<h1>, ..., <h6>` elements in the DOM above by recursing through all parents and grandparent's children "uncles" */
  const findH = useCallback((parentElement: HTMLElement | null | undefined, n: HeadingDegrees): HeadingDegrees => {
    const grandparentElement = parentElement?.parentElement
    if (!grandparentElement || n === max) return n

    for (const e of Array(grandparentElement.children))
      if (e[0] instanceof HTMLHeadingElement) return findH(grandparentElement, ++n as HeadingDegrees)

    return findH(grandparentElement, n)
  }, [max])

  useEffect(() => setE(`h${findH(ref.current?.parentElement, min)}`), [min, max])

  return <E ref={ref} {...props}>{children}</E>
}
