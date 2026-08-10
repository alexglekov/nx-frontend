import { useEffect, useRef, useState } from 'react'
import { useResponsive } from 'shared/hooks/use-responsive'

interface Props {
  withTimeout?: boolean
  withTransform?: boolean
  canRepeat?: boolean
}

export const useFadeInSection = ({
  withTimeout = false,
  withTransform = false,
  canRepeat = true
}: Props) => {
  const isMobile = useResponsive(['sm'])
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)
  const [isExecuted, setIsExecuted] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const observerOptions: IntersectionObserverInit = {
    threshold:
      withTransform ? 0
      : isMobile ? 0.2
      : 0.4
  }

  useEffect(() => {
    if (domRef.current) {
      const observer = new IntersectionObserver(entries => {
        if (!canRepeat && isExecuted) return
        if (withTimeout) {
          timeoutRef.current = setTimeout(() => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting))

            if (!canRepeat) {
              setIsExecuted(true)
            }
          }, 500)

          return
        }

        entries.forEach(entry => setIsVisible(entry.isIntersecting))
        if (!canRepeat) {
          setIsExecuted(true)
        }
      }, observerOptions)

      observer.observe(domRef.current)

      return () => {
        observer.disconnect()
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [canRepeat, withTimeout])

  return {
    domRef,
    isVisible,
    isExecuted
  }
}
