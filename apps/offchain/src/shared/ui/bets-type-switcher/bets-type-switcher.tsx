/* eslint-disable complexity */
import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { XyroNumeral } from '../xyro-numeral'
import styles from './bets-type-switcher.module.scss'

interface Props {
  activeType: string
  setActiveType:
    | React.Dispatch<React.SetStateAction<string>>
    | ((value: string) => void)
  betsTypes?: Record<string, string>
  betsTypeDataTestIDs?: DataTestIDs[] | []
  betsCount?: Record<string, number | null>
  icons?: React.ReactNode[]
  wrapperClassname?: string
  buttonClassname?: string
  size?: '1' | '2' | '3' | '4'
  isCounterEnabled?: boolean
}
export const BetsTypeSwitcher: React.FC<Props> = ({
  betsTypes,
  betsTypeDataTestIDs = [],
  betsCount,
  activeType,
  setActiveType,
  icons,
  wrapperClassname,
  buttonClassname,
  size = '3',
  isCounterEnabled = true
}) => {
  const betsTypesArray = Object.entries(betsTypes || [])

  return (
    <Flex
      p={'1'}
      className={cn(
        styles.typeSwitcherWrapper,
        wrapperClassname ? wrapperClassname : ''
      )}
    >
      {betsTypesArray.map(([key, value], i) => {
        const isActiveType = value === activeType
        const textWeight = isActiveType ? 'bold' : 'medium'
        const buttonClassNames = cn(
          isActiveType ?
            styles.typeSwitcherActiveSection
          : styles.typeSwitcherSection,
          buttonClassname ? buttonClassname : ''
        )

        const dataTestID = betsTypeDataTestIDs?.[i] || ''

        return (
          <Button
            onClick={() => setActiveType(value)}
            type='button'
            key={key}
            size={size}
            className={buttonClassNames}
            data-testid={dataTestID}
          >
            <Flex
              gap={'2'}
              align='center'
            >
              {/* TODO: this icons doesn't work properly. Fix it. */}
              {icons && icons[i] ? icons[i] : null}

              <Text
                size={'2'}
                weight={textWeight}
              >
                {value}
              </Text>

              {isCounterEnabled && betsCount ?
                <XyroNumeral
                  isWhite={false}
                  isBlack={false}
                  size={'2'}
                  weight={textWeight}
                  className={styles.typeSwitcherCount}
                >
                  {(betsCount && betsCount[value]) ?? 0}
                </XyroNumeral>
              : null}
            </Flex>
          </Button>
        )
      })}
    </Flex>
  )
}
