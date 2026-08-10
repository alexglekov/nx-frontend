import { FC } from 'react'
import { Flex, IconButton, Tooltip } from '@radix-ui/themes'
import { useControlMobileTooltip } from 'shared/hooks/use-control-mobile-tooltip'
import { useResponsive } from 'shared/hooks/use-responsive'
import { InfoCircleFill } from 'shared/icons'
import styles from '../buy-back.module.scss'

interface Props {
  title?: string
}

export const BuyBackTooltip: FC<Props> = ({ title }) => {
  const [isMobile] = useResponsive(['xs'])
  const { open, handleTooltipState } = useControlMobileTooltip()

  const tooltipContent = (
    <Flex
      direction={'column'}
      className={'color-white'}
    >
      {title}
    </Flex>
  )

  if (isMobile) {
    return (
      <Tooltip
        open={open}
        content={tooltipContent}
        delayDuration={200}
        className={styles.buyBackInfoTooltip}
      >
        <IconButton
          variant='ghost'
          onClick={handleTooltipState}
        >
          <Flex align={'center'}>
            <InfoCircleFill color={`var(--gray)`} />
          </Flex>
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Tooltip
      content={tooltipContent}
      className={styles.buyBackInfoTooltip}
      delayDuration={200}
    >
      <Flex align={'center'}>
        <InfoCircleFill color={`var(--gray)`} />
      </Flex>
    </Tooltip>
  )
}
