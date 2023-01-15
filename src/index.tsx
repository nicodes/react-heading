import React, { useRef, useState, useEffect, HTMLAttributes, useCallback } from 'react'

/** Subset of `JSX.InstrinsecElements` for only heading elements */
export type HeadingIntrinsicElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/** Numeric degrees for headings */
export type HeadingDegrees = 1 | 2 | 3 | 4 | 5 | 6

/** React heading props */
export type ReactHeadingProps = { min?: HeadingDegrees, max?: HeadingDegrees } & HTMLAttributes<HTMLHeadingElement>

/** Smart Headings for React */
export default ({ min = 1, max = 6, children, ...props }: ReactHeadingProps): JSX.Element => {
  if (max < min) console.error('`react-heading` invalid props: must meet requirement `min` <= `max`')

  const ref = useRef<HTMLHeadingElement>(null)
  const [E, setE] = useState<HeadingIntrinsicElements>(`h${min}`)

  /** Returns heading degree by searching for the number of `<h1>, ..., <h6>` elements in the DOM above by recursing through all parents and grandparent's children "uncles" */
  const headingSearch = useCallback((parentElement: HTMLElement | null | undefined, n: HeadingDegrees): HeadingDegrees => {
    const grandparentElement = parentElement?.parentElement
    if (!grandparentElement || n === max)
      return n

    for (const e of Array(grandparentElement.children))
      if (e[0] instanceof HTMLHeadingElement)
        return headingSearch(grandparentElement, ++n as HeadingDegrees)

    return headingSearch(grandparentElement, n)
  }, [max])

  useEffect(() => setE(`h${headingSearch(ref.current?.parentElement, min)}`), [min, max])

  return <E ref={ref} {...props}>{children}</E>
}
