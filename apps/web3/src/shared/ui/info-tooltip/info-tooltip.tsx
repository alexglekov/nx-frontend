import { FC } from 'react'
import { Tooltip, Text, Flex, IconButton } from '@radix-ui/themes'
import { useControlMobileTooltip } from 'shared/hooks/use-control-mobile-tooltip'
import { useResponsive } from 'shared/hooks/use-responsive'
import { InfoCircleIcon } from 'shared/icons'
import { RadixColorType } from 'shared/types'
import styles from './info-tooltop.module.scss'

interface Props {
  content: string
  color?: RadixColorType
}
export const InfoTooltip: FC<Props> = ({ content, color }) => {
  const [isMobile] = useResponsive('xs')

  const { open, handleTooltipState } = useControlMobileTooltip()

  if (isMobile) {
    return (
      <Tooltip
        open={open}
        content={<Text size='1'>{content}</Text>}
        delayDuration={200}
        className='cursor-pointer'
      >
        <IconButton
          variant='ghost'
          onClick={handleTooltipState}
          className={styles.mobileWrapper}
        >
          <Flex align={'center'}>
            <InfoCircleIcon color={`var(--${color || 'white'})`} />
          </Flex>
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Tooltip
      content={<Text size='1'>{content}</Text>}
      delayDuration={200}
    >
      <Flex align={'center'}>
        <InfoCircleIcon color={`var(--${color || 'white'})`} />
      </Flex>
    </Tooltip>
  )
}
