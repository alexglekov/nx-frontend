import { FC } from 'react'
import { Flex, IconButton, Separator, Text, Tooltip } from '@radix-ui/themes'
import { UpDownPredict } from '__generated__/graphql'
import cn from 'classnames'
import { useControlMobileTooltip } from 'shared/hooks/use-control-mobile-tooltip'
import { useResponsive } from 'shared/hooks/use-responsive'
import { InfoCircleIcon, SwapXyroToken, TetherRoundedIcon } from 'shared/icons'
import styles from '../mode-up-down.module.scss'

interface Props {
  predict: UpDownPredict
  isXyroToken?: boolean
}

/* eslint-disable-next-line max-statements, complexity */
export const UpDownInfoTooltip: FC<Props> = ({ predict, isXyroToken }) => {
  const [isMobile] = useResponsive(['xs'])

  const totalAmount =
    (predict.game?.upPool.poolAmount ?? 0) +
    (predict.game?.downPool.poolAmount ?? 0)
  const startingBtcPrice = predict.game?.startPrice?.toFixed(2) ?? '0'
  const finishingBtcPrice = predict.game?.endPrice?.toFixed(2) ?? '0'
  const upPoolSize = predict.game?.upPool?.predictsCount ?? '0'
  const downPoolSize = predict.game?.downPool?.predictsCount ?? '0'
  const pnl = predict.pnl ? (predict.pnl + predict.amount).toFixed(2) : '0'
  const fee = (
    (predict.amount * (predict.game?.commission ?? 0)) /
    totalAmount
  ).toFixed(2)

  const { open, handleTooltipState } = useControlMobileTooltip()

  const content = (
    <Flex
      direction={'column'}
      className={styles.infoContent}
    >
      <Flex
        justify={'between'}
        gap={'3'}
        className={cn(styles.upDownInfoTooltipField, 'color-white')}
      >
        <Text>YOUR GUESS:</Text>
        <Flex gap={'1'}>
          {isXyroToken ?
            <SwapXyroToken
              width={'2rem'}
              height={'2rem'}
            />
          : <TetherRoundedIcon
              className='color-yellow'
              width={'2rem'}
              height={'2rem'}
            />
          }
          <Text>{predict.amount}</Text>
        </Flex>
      </Flex>

      <Separator className={styles.upDownInfoTooltipSeparator} />

      <Flex
        justify={'between'}
        gap={'3'}
        align={'center'}
        className={cn(styles.upDownInfoTooltipField, 'color-white')}
      >
        <Text>STARTING BTC PRICE:</Text>
        <Flex
          gap={'1'}
          align={'center'}
        >
          <Text
            className={'color-yellow'}
            size={'3'}
          >
            $
          </Text>

          <Text>{startingBtcPrice}</Text>
        </Flex>
      </Flex>

      <Flex
        justify={'between'}
        gap={'3'}
        align={'center'}
        className={cn(styles.upDownInfoTooltipField, 'color-white')}
      >
        <Text>FINISHING BTC PRICE:</Text>
        <Flex
          gap={'1'}
          align={'center'}
        >
          <Text
            className={'color-yellow'}
            size={'3'}
          >
            $
          </Text>

          <Text>{finishingBtcPrice}</Text>
        </Flex>
      </Flex>

      <Separator className={styles.upDownInfoTooltipSeparator} />

      <Flex
        justify={'between'}
        gap={'3'}
        className={cn(styles.upDownInfoTooltipField, 'color-white')}
      >
        <Text>UP POOL SIZE:</Text>
        <Text>{upPoolSize}</Text>
      </Flex>

      <Flex
        justify={'between'}
        gap={'3'}
        className={cn(styles.upDownInfoTooltipField, 'color-white')}
      >
        <Text>DOWN POOL SIZE:</Text>
        <Text>{downPoolSize}</Text>
      </Flex>

      <Separator className={styles.upDownInfoTooltipSeparator} />

      <Flex
        justify={'between'}
        gap={'3'}
        className={cn(styles.upDownInfoTooltipField, 'color-white')}
      >
        <Text>FEE:</Text>

        <Flex gap={'1'}>
          {isXyroToken ?
            <SwapXyroToken
              width={'2rem'}
              height={'2rem'}
            />
          : <TetherRoundedIcon
              className='color-yellow'
              width={'2rem'}
              height={'2rem'}
            />
          }
          <Text>{fee}</Text>
        </Flex>
      </Flex>

      <Flex
        justify={'between'}
        gap={'3'}
        className={cn(styles.upDownInfoTooltipField, 'color-white')}
      >
        <Text>PAYOUT:</Text>

        <Flex gap={'1'}>
          {isXyroToken ?
            <SwapXyroToken
              width={'2rem'}
              height={'2rem'}
            />
          : <TetherRoundedIcon
              className='color-yellow'
              width={'2rem'}
              height={'2rem'}
            />
          }
          <Text>{pnl}</Text>
        </Flex>
      </Flex>
    </Flex>
  )

  if (isMobile) {
    return (
      <Tooltip
        open={open}
        content={content}
        delayDuration={200}
        className={styles.upDownInfoTooltip}
      >
        <IconButton
          variant='ghost'
          onClick={handleTooltipState}
        >
          <Flex align={'center'}>
            <InfoCircleIcon color={`var(--gray)`} />
          </Flex>
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Tooltip
      content={content}
      className={styles.upDownInfoTooltip}
      delayDuration={200}
    >
      <Flex align={'center'}>
        <InfoCircleIcon color={`var(--gray)`} />
      </Flex>
    </Tooltip>
  )
}
