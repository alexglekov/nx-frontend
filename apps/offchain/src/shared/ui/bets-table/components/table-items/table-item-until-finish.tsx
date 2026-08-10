import React, { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { MS_IN_SEC } from 'shared/constants'
import { formatTime } from 'shared/utils/format-time'
import { XyroNumeral } from '../../../xyro-numeral'

interface Props {
  time?: number
  isCentered?: boolean
  textSize?: '3' | '4'
}
export const TableItemUntilFinish: React.FC<Props> = ({
  time = 0,
  isCentered = true,
  textSize = '4'
}) => {
  const [timer, setTimer] = useState<number>(time)

  useEffect(() => {
    if (timer === 0) return

    const interval = setInterval(() => {
      // eslint-disable-next-line max-nested-callbacks
      setTimer(prevTimer => prevTimer - MS_IN_SEC)
    }, MS_IN_SEC)

    return () => clearInterval(interval)
  }, [])

  return (
    <Flex
      align={isCentered ? 'center' : 'start'}
      height={'100%'}
    >
      <XyroNumeral
        isWhite={true}
        size={textSize}
        weight={'medium'}
      >
        {formatTime(timer)}
      </XyroNumeral>
    </Flex>
  )
}
