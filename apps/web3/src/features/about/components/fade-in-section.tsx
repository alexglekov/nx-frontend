import { Flex } from '@radix-ui/themes'
import classNames from 'classnames'
import { useFadeInSection } from 'shared/hooks/use-fade-in-section'
import styles from '../about.module.scss'

interface FadeInSectionProps {
  withTimeout?: boolean
  withTransform?: boolean
  canRepeat?: boolean
  className?: string
}

const FadeInSection = ({
  children,
  withTransform = false,
  withTimeout = false,
  canRepeat = true,
  className
}: React.PropsWithChildren<FadeInSectionProps>) => {
  const { domRef, isVisible, isExecuted } = useFadeInSection({
    withTimeout,
    withTransform,
    canRepeat
  })

  const isFadeInSectionVisible = isVisible || (isExecuted && !canRepeat)

  return (
    <Flex
      align={'center'}
      justify={'center'}
      className={classNames(styles.fadeInSection, className, {
        [styles.fadeInSectionVisible]: isFadeInSectionVisible,
        [styles.fadeInSectionTransform]: withTransform
      })}
      ref={domRef}
    >
      {children}
    </Flex>
  )
}

export default FadeInSection
